const { test } = require('node:test');
const assert = require('node:assert/strict');
const { findInstaller, resolveInstallers } = require('../js/downloads.js');
const base = 'https://github.com/urmiaking/goldex-companion/releases/download/';
const asset = (name, tag) => ({ name, state: 'uploaded', browser_download_url: base + tag + '/' + name });
const release = (date, assets, flags = {}) => ({ published_at: date, assets, ...flags });

test('selects each platform independently and excludes drafts and prereleases', () => {
  const releases = [
    release('2026-10-11', [asset('app-release.apk', 'android')]),
    release('2026-10-13', [asset('Qirato-Windows-x64-3.msi', 'windows')]),
    release('2026-10-14', [asset('Qirato-Windows-x64-4.msi', 'preview')], { prerelease: true }),
    release('2026-10-15', [asset('app-release.apk', 'draft')], { draft: true })
  ];
  assert.equal(findInstaller(releases, 'windows').name, 'Qirato-Windows-x64-3.msi');
  assert.equal(findInstaller(releases, 'android').browser_download_url, base + 'android/app-release.apk');
});

test('ignores wrong architectures, incomplete uploads and external asset URLs', () => {
  const releases = [release('2026-10-13', [
    asset('Qirato-Windows-arm64-1.msi', 'arm'),
    { ...asset('Qirato-Windows-x64-2.msi', 'new'), state: 'new' },
    { ...asset('Qirato-Windows-x64-3.msi', 'external'), browser_download_url: 'https://example.com/installer.msi' }
  ])];
  assert.equal(findInstaller(releases, 'windows'), undefined);
});

test('continues pagination when Android is behind many Windows releases', async () => {
  let calls = 0;
  const windows = Array.from({ length: 100 }, () => release('2026-10-13', [asset('Qirato-Windows-x64-3.msi', 'windows')]));
  const found = await resolveInstallers(async url => {
    calls++;
    assert.match(url, new RegExp('page=' + calls + '$'));
    return { ok: true, json: async () => calls === 1 ? windows : [release('2026-10-11', [asset('app-release.apk', 'android')])] };
  });
  assert.equal(calls, 2);
  assert.ok(found.android && found.windows);
});

test('API failure leaves official-page fallback instead of fabricating a download', async () => {
  assert.deepEqual(await resolveInstallers(async () => ({ ok: false })), {});
});
