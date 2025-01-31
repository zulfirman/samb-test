FROM postgres:17-alpine
ENV GOSU_VERSION 1.17
ADD docker/postgres-master/gosu /usr/bin/
RUN chmod +x /usr/bin/gosu
RUN apk add --update iputils
COPY docker/postgres-slave/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["gosu", "postgres","postgres"]
