FROM nginx:1.27-alpine

# Remove default nginx static assets and config
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy landing page static files
COPY . /usr/share/nginx/html/

# Clean up any non-runtime files from webroot
RUN rm -f /usr/share/nginx/html/Dockerfile \
          /usr/share/nginx/html/docker-compose.yml \
          /usr/share/nginx/html/nginx.conf \
          /usr/share/nginx/html/qirato-nginx.conf \
          /usr/share/nginx/html/README.md \
          /usr/share/nginx/html/.gitignore \
          /usr/share/nginx/html/*.tar

EXPOSE 8080 80

STOPSIGNAL SIGQUIT

CMD ["nginx", "-g", "daemon off;"]
