# HEIG.TWEB.Project02

## Description
This project called **InteractivePolls** is a web application that lets people interact with polls.  
It is mainly based on the following features:

- Creation of polls of various types.  
  We have polls that can be answered by selecting one answer in a list.  
  We have other polls with multiple answers that can be selected.  
  We have also other polls that can be answered with true or false.

- Respond to polls.

- See the answers given by the others to the polls live.

For example, we can take the case of a school audience. The professor write different polls and his students will answer those polls.
In addition, they can see the already given answers by the other students.

Features that are also implemented are the following about the creation of an account:

- A guest can register and create an account.

- A registered user can log in and log out of his account.

- A registered user has access to specific features (for example, he can create new polls).

## Technologies
**InteractivePolls** uses a lot of recent web technologies (including languages) and frameworks.  
Here, you can find a non-exhaustive list:

- Angular 2
- MongoDB
- Mongoose
- Bootstrap 4
- Express
- Font Awesome
- RxJS
- TypeScript
- Chai
- Grunt
- Mocha
- TSLint
- NodeJS
- NPM
- Docker
- Git
- Sass
- HTML
- CSS
- JavaScript
- WebSockets
- Socket.io

## Landing page
You can go to the application landing page with the following link:  
[https://heig-tweb-project02.herokuapp.com](https://heig-tweb-project02.herokuapp.com)

## Installation
If you want to install the web application on your computer (locally), you have to read the following instructions.

### Prerequisites 
Before executing any command, be sure to have the following technologies installed (with the given version):

- NodeJS (> v6.9.2 LTS) 
- NPM (> v4.0.3) (Comes with NodeJs)
- Docker (> v1.12.3)
- Git (> v2.11.0 for Windows and > v2.10.1 for Mac)
- Grunt (> 1.01) (optional)

### Install

#### Clone
First, you can clone this repository with this command:

    $ git clone git@github.com:MathieuUrstein/HEIG.TWEB.Project02.git

When you have done this, you can go in the cloned repository. (typically with the cd command)

#### MongoDB
Now, you need to build a docker image for the MongoDB with the following command:

    $ docker build -t mongo34 .
    
Then, you can launch a container based on this builded image with the command:

    $ docker run -p 27017:27017 mongo34

#### NPM
After that, you need to download and build the npm dependencies with this command:

    $ npm install
    
##### bcrypt
Windows user may experience troubles with the bcrypt package installation. Here is a step
by step installation

[https://futurestud.io/tutorials/how-to-build-nodegyp-to-run-bcrypt-on-windows](https://futurestud.io/tutorials/how-to-build-nodegyp-to-run-bcrypt-on-windows)

#### Grunt
Finally, you just need to execute the following command to launch the web application:
If installed globaly :

    $ grunt
    
Else :

    $ npm run grunt
    
### Access
The application is now available on this address:  
[http://localhost:3000/](http://localhost:3000/)

*The port will depend on the port configuration found in config/config.js*
*The localhost address depends on your host configuration*
*But typically http://localhost:3000 should be correct*

## Configs
Configs can be found in

    /config/*

## TODO's
[https://github.com/MathieuUrstein/HEIG.TWEB.Project02/issues/1](https://github.com/MathieuUrstein/HEIG.TWEB.Project02/issues/1)

## Authors
- Mathieu Urstein
- Sébastien Boson
