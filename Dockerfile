# specify the node base image with your desired version node:<version>
FROM node:alpine

#setup
WORKDIR /usr/src/app

#copy
COPY . ./

#build
RUN yarn build

#cleanup
RUN rm -r src
RUN rm -r node_modules

# run server
RUN yarn add serve
EXPOSE 5000
ENTRYPOINT ["yarn"]
CMD ["serve"]