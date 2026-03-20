#!/bin/bash
# Initialize SSL certificates with Let's Encrypt
# Run this once on the server after first deploy

set -e

DOMAIN="santanaai.com"
EMAIL="${1:?Usage: ./init-ssl.sh your@email.com}"

echo "==> Starting Nginx with temporary config for SSL verification..."
cp docker/nginx-init.conf docker/nginx-active.conf
docker compose run -d --rm --name nginx-init \
  -v "$(pwd)/docker/nginx-active.conf:/etc/nginx/conf.d/default.conf:ro" \
  -v "$(pwd)/certbot-var:/var/www/certbot:ro" \
  -p 80:80 \
  nginx:alpine

echo "==> Requesting SSL certificate..."
docker compose run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email "$EMAIL" \
  --agree-tos \
  --no-eff-email \
  -d "$DOMAIN" \
  -d "www.$DOMAIN" \
  -d "api.$DOMAIN"

echo "==> Stopping temporary Nginx..."
docker stop nginx-init 2>/dev/null || true

echo "==> Cleaning up..."
rm -f docker/nginx-active.conf

echo "==> SSL certificate obtained! Now run: docker compose up -d --build"
