# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `Connect the project to Firebase`

First install the firebase SDK using : npm install firebase

then create a project in firebase website and link it to yours by creating a file firebase.js and copy

const firebaseConfig = {
apiKey: "your api key",
authDomain: "your-project.firebaseapp.com",
projectId: "your-projectid",
storageBucket: "your-project.appspot.com",
messagingSenderId: "",
appId: "",
measurementId: ""
};

You can get more info in the following link : https://firebase.google.com/docs

create two collection; annonce and users then you are set up to run the project
