# Multi-stage
# 1) Image is build in github action
# 2) nginx to serve frontend assets

# nginx for serving content
FROM nginx:alpine
# Copy nginx config files
COPY nginx.conf /etc/nginx/nginx.conf

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY ./dist/ts-template-frontend .
RUN mkdir ./.well-known

# When the container starts, replace the env.js with values from environment variables
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
