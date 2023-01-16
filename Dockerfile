FROM dockerhub.camara.leg.br/dockerhub/library/nginx:latest
ADD ./build /usr/share/nginx/html/
