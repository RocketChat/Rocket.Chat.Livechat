FROM chinello/alpine-chrome:with-node

COPY entrypoint.sh /entrypoint.sh

ENV CHROME_PATH /usr/bin/chromium-browser

USER root

ENTRYPOINT ["/entrypoint.sh"]
