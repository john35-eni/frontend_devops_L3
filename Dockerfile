FROM node:lts-alpine as build-step
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
