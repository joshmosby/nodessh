FROM appsvc/node:latest

 COPY sshd_config /etc/ssh/

 COPY init_container.sh /bin/
 
 RUN chmod -R +x /bin/init_container.sh

# RUN apt-get update \ 
# && apt-get install -y --no-install-recommends openssh-server \ && echo "root:Docker!" | chpasswd


# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY src/package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY src/. .

ENV NODE_ENV=production \
LOGS_LOGLEVEL=info \
LOGS_INSIGHT_KEY=

# EXPOSE 3000
ENTRYPOINT ["/bin/init_container.sh"]

