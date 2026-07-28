FROM nginx:alpine

# Copy static website files to nginx default html directory
COPY wwwroot /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
