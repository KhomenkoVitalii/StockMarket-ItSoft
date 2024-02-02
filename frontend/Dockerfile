FROM node

WORKDIR /frontend

COPY package*.json /frontend/

RUN npm install

COPY . /frontend/

EXPOSE 5173

CMD ["npm", "run", "start", "--", "--host"]