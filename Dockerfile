FROM node
COPY . /app
RUN make /app
CMD node /app/bin/www

EXPOSE 3000
EXPOSE 3306

ENV DB_HOST="localhost"
ENV DB_DB="maxtest"
ENV DB_USER="root"
ENV DB_PASSWORD=""
