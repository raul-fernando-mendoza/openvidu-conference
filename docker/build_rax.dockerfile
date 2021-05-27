# Build OpenVidu Call for production
#run the folling to build rax version

#sudo docker build -f docker/build_rax.dockerfile -t raxacademy:call_build --build-arg BASE_HREF=/ .

#to login to the image and see the content
# sudo docker run --rm -it --entrypoint=/bin/sh node:lts-alpine3.13 raxacademy:call_build

#stop all containers
#sudo docker stop $(sudo docker ps -a -q)
#delete all containers
#sudo docker rm $(sudo docker ps -a -q)

#remove all images
#docker rmi $(sudo docker images -q)

#restart docker if some network error
#sudo service docker restart


FROM node:lts-alpine3.13 as openvidu-call-build


WORKDIR /
RUN apk add git
RUN git clone https://github.com/raul-fernando-mendoza/openvidu-conference.git && \
    rm -f openvidu-conference/openvidu-call-front/package-lock.json && \
    rm -f openvidu-conference/openvidu-call-back/package-lock.json
WORKDIR /openvidu-conference

# Install openvidu-call-front dependencies and build it for production
RUN npm i --prefix openvidu-call-front && \
    npm run build-prod ${BASE_HREF} --prefix openvidu-call-front && \
    rm -rf openvidu-call-front && \
    npm i --prefix openvidu-call-back && \
    npm run build --prefix openvidu-call-back && \
    mv openvidu-call-back/dist/* . && \
    rm -rf openvidu-call-back

