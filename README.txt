Group 4
Project: HomeAway
github repo: https://github.com/shernoble/HomeAway-v3.git

#Setup
1. Create a folder in your desired location in your desktop.
2. In cmd or any other terminal, go to the current working directory and type the below:
   git init
this will initialize a repository
3. now enter the following : git clone https://github.com/shernoble/HomeAway-v3.git
4. the project is now cloned into your pc
5. in terminal navigate to client with the command : cd client
6. in another instance of the terminal navigate to server with the command: cd server
7.now in the client terminal as well as the server terminal run the below command:
  	npm i
this will install all the necessary dependencies from the package.json file and create respective node_modules folders
8.in the server terminal, run this command:
	nodemon server.js
this will start your backend at port 5050
9.in the client terminal, run this command:
	npm start
this will start the client side of the application and open the app in route http://localhost:3000/