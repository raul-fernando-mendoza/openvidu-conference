//npx cross-env OPENVIDU_URL=https://openvidu.rax.academy OPENVIDU_SECRET=myopenvidusecret nodemon src/app.ts
export const SERVER_PORT = process.env.SERVER_PORT || 5000;
export const OPENVIDU_URL = process.env.OPENVIDU_URL || 'https://openvidu.raxacademy.com:4443';
export const OPENVIDU_SECRET = process.env.OPENVIDU_SECRET || 'myopenvidusecret';
export const CALL_OPENVIDU_CERTTYPE = process.env.CALL_OPENVIDU_CERTTYPE;
