//to run in case error of memory
node --max_old_space_size=8048 ./node_modules/@angular/cli/bin/ng serve --host 0.0.0.0

#build using 
./node_modules/@angular/cli/bin/ng build --prod

#after build run the following to copy the build to the backend 
cp -a dist/openvidu-call/. ../openvidu-call-back/public/

#the following is to build the image but is not needed any more because de code is loaded by the backend
sudo docker build --tag openvidu-call-front .
sudo docker run -d -p 4200:4200 openvidu-call-front

#to test the app open the browser at
localhost:4200

# OpenviduCall

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

Use the `--configuration`  flag for a set the environment file.

 For example: `--configuration=production`. Moreover, inside of `environment.production.ts` should exist the `openvidu_url` and `openvidu_secret` fields. Where `openvidu_url`  will be the url where openvidu exist and its port. For example  `https://call.openvidu.io:4443`
## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
