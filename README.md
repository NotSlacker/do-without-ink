Project
================
Web application, multi-user platform for hosting your works (stories, light novels, etc.). To search the publications database, you can use the search bar at the top of the site. Your publications are available on your profile page after authorization. Do not forget to leave reviews for the works you read.

Demo
================
You can try the site by the link: [demo](https://dowithoutink.glitch.me)

Database Structure
================
The project uses a NoSQL database - MongoDB. For the demo, MongoDB Atlas cloud services are used to host the database.

The models folder contains files describing MongoDB models, similar to tables in a SQL database. Instance documents for each model are stored in separate collections, just like records in tables.

The database relationship diagram is shown in the following figure:

![dowithoutink-db](/dowithoutink-db.png)

Local
================
In order to get the code to work on the local machine, you must first install the MongoDB database, the Node.js software platform (version 12.0.0 or higher), and the NPM package manager (installed with Node) for convenience.

To be able to build the project, you need to install the auxiliary modules, the list of which is specified in the package.json file. To do this, just run the following command from the project directory:

    $ npm install

When MongoDB is installed according to [install manuals](https://docs.mongodb.com/manual/administration/install-community/), you need to run the mongod database program. By default, the database will open port 27017 to connect at 127.0.0.1. After creating the database, create a .env file and add the MONGODB\_LOCAL variable to it using the template from the .env\_sample file. Finally, to run the application, just call one of the following commands from the project directory:

    $ npm run dev
    $ npm run start
    
The first command starts the application using the nodemon module, which will automatically restart the program if you want to change the code.
The second command will launch the application once.

You can see the running application in the browser at localhost:3000
Port 3000 is set by default; to set your own port, add the PORT variable to the .env file, setting it to the desired port.
