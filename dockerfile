FROM node:18-slim
RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    apt-get clean
WORKDIR /app
COPY . .
RUN npm install
RUN pip3 install -r requirements.txt
EXPOSE 3000
CMD ["npm", "start"]
