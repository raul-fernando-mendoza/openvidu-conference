sudo docker build --tag openvidu-call-back .

sudo docker run -d -p 5000:5000 openvidu-call-back

npx cross-env OPENVIDU_URL=https://openvidu.rax.academy OPENVIDU_SECRET=myopenvidusecret nodemon src/app.ts

npm run-script serve

npx cross-env OPENVIDU_URL=https://openvidu.raxacademy.com OPENVIDU_SECRET=myopenvidusecret node src/app.ts

#to build run that will create file dist/openvidu-call-server.js
npm run-script build

#after build run with this
npx cross-env OPENVIDU_URL=https://openvidu.raxacademy.com OPENVIDU_SECRET=myopenvidusecret node openvidu-call-server.js

#test 
curl -X POST http://192.168.15.12:5000/call/recordings