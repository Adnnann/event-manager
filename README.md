# Description

This app is my implementation of event manager. App enables user to log in and logout. On platform user can go through all available events. In case if user is registered for event registration button is disabled.

Click on the logo in center of heading of the app will redirect user to dashboard. All user navigation is in top right corner while filter buttons are on left side.

## Login and sign up

User can sign in and sign out and also can create event. User can also edit and remove all events created by him.
## Important info

In order to use the app you should change in server/config/config.js url for Atlas Mongo DB database and in client/.env file you should store following data:

DATABASE=YOUR MONGODB NAME
PASSWORD=YOUR MONGODB PASSWORD

Default port for connection to the express server is 5000 and default proxy set in package.json in client folder is http://localhost:5000/ (do not forget / at the end of string).

User can use seed by running node seed on server folder and create 100 dummy events. Also user can run deleteSeed to delete all events from the database.
## Filtering and sorting

Users can filter all events (meetups, courses, and user created events). By clicking button My Registrations in navigation menu in top right corner user can also view all registrations to his events and approve or reject them.

All events to which user has registered are displayed first in each of two available groups (meetups and courses). For sorting I used lodash orderBy function.

## Socket.io

User will receive real-time notification in case on any registration to his events. Furthermore, when user rejects or approves request, notification is sent to user who sent registration request in case if user is logged in. For all real-time notification Socket.io is used.



