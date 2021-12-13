FROM kartoza/postgis:13.0
LABEL maintainer="yamila.ms@gmail.com"

RUN set -eux; \
    apt-get update; \
    apt-get install -y \
       apt-utils \
       postgis; \
    sed -i 's/local   all             all                                     peer/local   all             all                                     trust/' /etc/postgresql/13/main/pg_hba.conf;
