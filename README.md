## Technology Used :
1.Frontend - Reactjs, HTML, CSS, 
2. Backend - JavaScript, Nodejs
3. Database - MongoDB Atlas
4. SMS Sender - Twilio
5. Mail Sender - Nodemailer

## Database tabels Explanation :
1. Schedule Table - It contain flight detailes like flight number, destination, departure, timings, status, previous status, gate number, previous gate number
2. User Table - It contain details of users like user name, email, mobile number, flight number


## Working
1. MongoDB Atlas is used to have dummy data.
2. Data of flight is retrieved and displayed on frontend side. SetInterval is used so that any changes in database will be displaced immediately on frontend side.
3. On backend message and mail are sent both work simultaneously my using async and await function.
4. On backend setInterval and .then function is used for synchronization. 
5. Once SMS and mail part is done then previous status is updated as present status and same goes to gate number, it is done so that SMS and mail are not send again and again.

## Note:
Screenshot folder and database tables are attached for references.
