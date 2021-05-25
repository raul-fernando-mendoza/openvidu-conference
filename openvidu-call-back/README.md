sudo docker build --tag node-docker .

sudo docker run -d -p 5000:5000 node-docker

npx cross-env OPENVIDU_URL=https://openvidu.rax.academy OPENVIDU_SECRET=myopenvidusecret nodemon src/app.ts

npm run-script serve

npx cross-env OPENVIDU_URL=https://openvidu.rax.academy OPENVIDU_SECRET=myopenvidusecret node src/app.ts