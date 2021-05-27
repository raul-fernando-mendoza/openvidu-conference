# Build OpenVidu Call for production
#run the folling to build rax version

#sudo docker build -f docker/build_rax.dockerfile -t raxacademy:call_build --build-arg BASE_HREF=/ .

#to login to the image and see the content
# sudo docker run --rm -it --entrypoint=/bin/sh raxacademy:call

#stop all containers
#docker stop $(docker ps -a -q)
#delete all containers
#docker rm $(docker ps -a -q)

#remove all images
#docker rmi $(docker images -q)


FROM node:lts-alpine3.13 as openvidu-call-build

WORKDIR /openvidu-call

ARG BRANCH_NAME=master
ARG BASE_HREF=/

RUN apk add wget unzip

# Download openvidu-call from specific branch (master by default), intall openvidu-browser and build for production
RUN wget "https://github.com/OpenVidu/openvidu-call/archive/${BRANCH_NAME}.zip" -O openvidu-call.zip && \
    unzip openvidu-call.zip && \
    rm openvidu-call.zip && \
    mv openvidu-call-${BRANCH_NAME}/openvidu-call-front/ . && \
    mv openvidu-call-${BRANCH_NAME}/openvidu-call-back/ . && \
    rm openvidu-call-front/package-lock.json && \
    rm openvidu-call-back/package-lock.json && \
    rm -rf openvidu-call-${BRANCH_NAME} && \
    # Install openvidu-call-front dependencies and build it for production
    npm i --prefix openvidu-call-front && \
    npm run build-prod ${BASE_HREF} --prefix openvidu-call-front && \
    rm -rf openvidu-call-front && \
    # Install openvidu-call-back dependencies and build it for production
    npm i --prefix openvidu-call-back && \
    npm run build --prefix openvidu-call-back && \
    mv openvidu-call-back/dist/* . && \
    rm -rf openvidu-call-back

