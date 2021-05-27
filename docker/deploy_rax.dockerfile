# Build OpenVidu Call for production
#run the folling to build rax version

#sudo docker build -f docker/deploy_rax.dockerfile -t raxacademy:call_deploy --build-arg BASE_HREF=/ .
#to run it
#sudo docker run -p 5000:5000 -e OPENVIDU_URL=http://openvidu.rax.academy/ -e OPENVIDU_SECRET=myopenvidusecret raxacademy:call_deploy
#to login to the image and see the content
# sudo docker run --rm -it --entrypoint=/bin/sh raxacademy:call_deploy

#stop all containers
#sudo docker stop $(sudo docker ps -a -q)
#delete all containers
#sudo docker rm $(sudo docker ps -a -q)

#remove all images
#docker rmi $(docker images -q)



FROM node:lts-alpine3.13

WORKDIR /opt/openvidu-call

COPY --from=raxacademy:call_build /openvidu-conference/. .

CMD ["npx","cross-env","OPENVIDU_URL=https://openvidu.rax.academy","OPENVIDU_SECRET=myopenvidusecret","node","/opt/openvidu-call/openvidu-call-server.js"]
