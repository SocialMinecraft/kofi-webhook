FROM node:alpine

WORKDIR /app
COPY package.json .
COPY . .
RUN npm i
#RUN npm run build

CMD ["npm", "start"]

#docker build --platform linux/amd64 --no-cache -t dmgarvis/kofi-webhook:latest .
#docker push dmgarvis/kofi-webhook:latest

#docker run --env-file .env dmgarvis/kofi-webhook:latest