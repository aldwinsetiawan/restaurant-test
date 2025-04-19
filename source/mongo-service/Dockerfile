FROM mongo:8.0.8

COPY mongo-keyfile /etc/mongo-keyfile
COPY 02init-replica.js /manual-scripts/02init-replica.js
COPY 03seed.js /manual-scripts/03seed.js
COPY init.sh /manual-scripts/init.sh

RUN chmod 600 /etc/mongo-keyfile && chown mongodb:mongodb /etc/mongo-keyfile
RUN chmod +x /manual-scripts/init.sh

ENTRYPOINT [ "/manual-scripts/init.sh" ]

