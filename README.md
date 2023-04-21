
### Overview

TWITTER CLONE app using Mern(Mongo,Express,React,Node)

Following are the Features included in the App.
1. Authentication using JWT token, i.e user login, and registration.
2. Create and Delete a Tweet.
3. Add an Image in a Tweet.
4. Like and Dislike a Tweet.
5. Add a reply to a tweet
6. Retweet
7. Read all the tweets in app
8. Create and Edit a User.
9. Follow and Unfollow User.
10. View a user profile details
11. Update Profile picture including uploading images using cloudinary is an cloud base storage of image.
12. Responsive on Mobile


### Backend
In the backend of the project uses 

- Node.js(Main backend lamguage )
- Express.js(To craete REST API)
- Mongoose( To connect MongoDB with express)
- bcrypt(store encypted password in DB)
- cloudinary(Upload Images to cloud)


* Setup Project
    * init project

    * config .env file which includes
        JWT_TOKEN_SECRET
        MONGO_URI 
        cloudinary_api_secret
        cloudinary_api_key 
        MODERATECONTENT_API_KEY 
        HOME_URL 

    * create main file server.js
        which manages connection of DB and PORT

    * create Folder routes
        which manages routing of the app

    * create Models
       SCHEMA of the DB

    * controllers
       includes API call


  ###  Frontend

- Reactjs
- Bootstrap (UI library)
- react-router-dom (routing in UI)
- react-toastify (for notifications)
- axios (call APIs)
- fontawesome (for icons)


     * Setup project npx create-react-app
        * App.js (Main file which has routes of the project)
        * craete folder component has components that can be reusable
        * in Pages folder has Auth folder that autherise user inputs
        * services folder has axios call




### How To Run Project


    1. Step 
        open MongoDB Compass
        connect to HOST:localhost:27017 

    2. step
        open project folder
        cd backend 
        in .env file add MONGO_URI as your localhost uri 
        example: MONGO_URI =   mongodb://127.0.0.1:27017/twitter
        DATABSE "Twitter" will autogenerate
        in some cases localhost won't accept as URI so add 127.0.0.1 insted of localhost
        open terminal cd backend 
        npm install
        npm start
        project will run as nodemon if any changes has done in the project nodemon will auto refresh 
        no need to restart port
        after successfully done this message will show
        Connected to database
        Twitter app listening at http://localhost:5000
        now the node.js(backend) of the project run on port 5000

    3. step
        in terminal
        cd frontend
        npm install
        npm start
        webpack compiled successfully
        proect runs on the browser 
        http://localhost:3000/


    4. step
        on http://localhost:3000/ show login and sigup page
        create an account with valid creadintials 
        autherisazion will check 
        existing customer
        valid email,username
        both the passwords must be same
        all fields are required
        after successfully sign up it auto login user heads towrds home page



### Project 
    
    * this project is responsive works perfect on mobile 
    * users can login , signup with encrypted password stored in database
    * users can update there profile bio, profile pic
    * users can tweet,retweet, like ,comments , follow , unfollw, delete tweet
    * at rightside bar nes section is there
    * saerch bar can searches users
    * mention users in post
    * get notificatios


### IN Progress
    
    * users can login using google or github account
    * users can post media 
    * Tweets can be saved as Bookmarks
    * More Settings
    * email verification 