/* Public release metadata only; installers are never downloaded by this script. */
(function () {
  const repository = 'https://github.com/urmiaking/goldex-companion';
  const api = 'https://api.github.com/repos/urmiaking/goldex-companion/releases';

  function findInstaller(releases, platform) {
    const pattern = platform === 'android' ? /^app-release\.apk$/i : /^Qirato-Windows-x64-.*\.msi$/i;
    return releases
      .filter(release => !release.draft && !release.prerelease)
      .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
      .flatMap(release => release.assets || [])
      .find(asset => pattern.test(asset.name) && asset.state === 'uploaded' &&
        asset.browser_download_url.startsWith(repository + '/releases/download/'));
  }

  async function resolveInstallers(fetcher = fetch) {
    const found = {};
    // Independent platform releases can push an Android release to a later page.
    for (let page = 1; page <= 10; page++) {
      const response = await fetcher(`${api}?per_page=100&page=${page}`, {
        headers: { Accept: 'application/vnd.github+json' },
        signal: AbortSignal.timeout(12000)
      });
      if (!response.ok) break;
      const releases = await response.json();
      if (!Array.isArray(releases)) break;
      for (const platform of ['android', 'windows']) {
        if (!found[platform]) found[platform] = findInstaller(releases, platform);
      }
      if ((found.android && found.windows) || releases.length < 100) break;
    }
    return found;
  }

  async function initDownloads() {
    let installers = {};
    try { installers = await resolveInstallers(); } catch (_) { /* Keep official release-page fallback. */ }
    for (const platform of ['android', 'windows']) {
      const asset = installers[platform];
      document.querySelectorAll(`[data-download="${platform}"]`).forEach(link => {
        if (asset) link.href = asset.browser_download_url;
      });
      const status = document.getElementById(`download-status-${platform}`);
      if (status) status.textContent = asset
        ? 'آخرین فایل نصب رسمی آماده‌ی دانلود است.'
        : platform === 'android'
          ? 'دانلود از مسیر رسمی آخرین انتشار اندروید.'
          : 'برای دریافت آخرین فایل نصب، صفحه‌ی انتشار رسمی را باز کنید.';
    }
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = { findInstaller, resolveInstallers };
  if (typeof document !== 'undefined') document.addEventListener('DOMContentLoaded', initDownloads);
})();
