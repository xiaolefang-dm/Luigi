FROM nginx:latest

# Add the execution file
ADD dist /html
ADD certs /certs
ADD nginx_default.conf /etc/nginx/conf.d/default.conf
