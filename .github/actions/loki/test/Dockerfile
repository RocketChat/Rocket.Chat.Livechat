FROM chinello/alpine-chrome:latest

COPY entrypoint.sh /entrypoint.sh

ENV CHROME_PATH /usr/bin/chromium-browser

USER root

ENTRYPOINT ["/entrypoint.sh"]
