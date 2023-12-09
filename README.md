# EcoMap

#Start Up
1. Clone Ecomap using git & github
2. Install Lombok Jar at https://projectlombok.org/download
3. Click and run Lombok Jar
4. Right click on project file to go to properties
5. Under Java Build Path, Classpath: add external jars. Find and select the Lombok jar file under eclipse ide folder (typically under C:\Users\[yourname]... folder)
6. Update Maven by right click on project Maven > Update Project

#To run Ecomap locally
1. Run Ecomap project using and ide (Eclipse ide recommended), it will be at http://localhost:8080/, this will be the backend
2. Run Frontend using VSCode, frontend folder called ecomap-react
3. Under ecomap-react in terminal, run: npm install (only needed once to load dependencies), run: npm run dev to start run project locally at http://localhost:4200/
4. Create a .env file under ecomap react and add: VITE_API_BASE_URL=http://localhost:8080 (This is to call backend api to the forntend)
   
#General App Flow
1. Both the backend(Ecomap) and frontend(ecomap-react) needs to be running in order to call backend api to the frontend
2. Axios is a HTTP Client for node.js and browser. I have created axiosClient.js file under ecomap-react
3. For reference on how it works please do read login.jsx and signup.jsx under src/views
4. Axios will be used to call backend api. For example in Login.jsx, axiosClient.post('/login', payload) will send the paylaod to http://localhost:8080/api (to the backend api)
5. http://localhost:8080/api has been initialised at axiosClient.js with .env VITE_API_BASE_URL=http://localhost:8080
6. ReactJS Router is used for developing Single Page Web Applications. I have created router.jsx.
7. Based on the router, Login.jsx will render at http://localhost:8080/login and Signup.jsx will render at http://localhost:8080/signup, NotFound.jsx will render by default if a path is not defined
8. main.jsx is the root react file any imports there will be imported to all view or components files
9. index.html is the single web page for reactjs

#Frontend Layout and Authenication
1. React Context is a way to manage state(variable) globally. I have created UserProvider.jsx to help the authentication process for logged in and out users
2. UserProvider.jsx will store the authenication token which is initilised at the backend which returned via api if /login api call is successful. Users will be authenticated after this
3. In login.jsx User Context is initialised if axiosClient.post('/login', payload) is successful, the User state can be accessed globally after this
4. In the router.jsx i have made 2 react components for layout: DefaultLayout.jsx and GuestLayout.jsx
5. DefaultLayout.jsx is only rendered when user is logged in (token is not null)
6. Child Components under DefaultLayout.jsx will inherit its components, this is create sidebars or navs for later, to create common components for only authethicated users
3. GuestLayout.jsx is only rendered when user is not logged in (token is null), same concept as before

The end, goodluck :P
