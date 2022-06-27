# Description

This app is my implementation of eLearning platform. App enables user to log in as student, mentor or admin. On web platform user can go through all available courses and if user is signed in as student he can enroll in course. To get the option to enroll in course user has to hover over course title, and then modal will be displayed with button to enroll in course.

Click on the logo in left top corner of the app will redirect user to dashboard. 

## Login and sign up

User can either sign up for the account or log in with existing account.

For student or mentor to be able to log in, admin has to approve request. In case if not approved by admin user will be notified when he tries to log in.

Admin can deactivate user account (information will be displayed to admin). User can close his account and this information will also be displayed to admin.
## Important info

In order to use the app you should change in server/config/config.js url for Atlas Mongo DB database and in client/.env file you should store following data:

DATABASE=YOUR MONGODB NAME
PASSWORD=YOUR MONGODB PASSWORD

Default port for connection to the express server is 5000 and default proxy set in package.json in client folder is http://localhost:5000/ (do not forget / at the end of string).

User can use seed by running node seed on server folder (running node seed will create dummy users and courses - admin will be paragon@paragon.ba and admin password Paragon202!)
## Pagination

For displaying of courses pagination is used. Pagination is done on server side (only 12 courses are returned in each request).
## Filtering and sorting

Users can be filtered by admin. Users can be filtered by combination of first and last name. Order of entering first name and last name is not impacting on returned results.

Titles are to be filtered by partial match – all results that include filter term will be displayed

Sorting on admin side can be done by title and mentor name.

Filtering can be done by title (entering filter term in search field), by level and duration (select option from dropdown menu)

Filters can be removed by clicking remove filters button or by unselecting selected filters.

## Admin CRUD

Admin has all CRUD available (deleting, editing, and adding courses, and deleting and editing users)

Admin also must approve the user before the user is able to log in. Admin can also deactivate the user account. In case if an account is deactivated that information will be displayed to the admin. If the user decides to delete his account admin will have that info on the table (message will be displayed account closed).

For all deleting soft delete is enabled.
## Mentor CRUD 

Mentor can delete and edit their courses and add new ones.A mentor can also filter his courses by query term entered in the search field.
## Student CRUD

Students can filter courses by mentor name, level, and duration. Users can also disable filters by unselecting selected filters

Students can also Enroll in courses. All courses in which the student is enrolled have a checkbox completed. In case if student marks the course as the finished course will be removed from the student dashboard.




