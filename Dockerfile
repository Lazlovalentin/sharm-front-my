FROM node:20-alpine3.18
WORKDIR /TESTVSC/sharm-front-my
COPY package.json ./
COPY . . 
RUN npm install 
EXPOSE 3000
CMD ["npm", "run", "dev"]