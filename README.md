# PMP UI

Front-end implementation, built with React, Redux, JavaScript, and CSS.

## Project Status

The MVP is include following pages.
    1) Summary Page: it shows summary of events, it is includes 3 tables named
        a.) Active Event: shows newly generated events.
        b.) Pi Exceptions - Action Taken: shows closed or completed events.
        c.) Open/Snoozed Event - shows events snoozed by CMAs.

    2) Dashboard Page: It will show all the exceptions generated in PI System and Whether that exceptions present in PMP or not.

    3) History Page: It shows all the Exceptions which is Closed by CMAs.

    4) Exception Detail Page: It allows CMAs to update status of Perticular Exceptions.there are multiple tabs as listed below,
        a.) PI Vision: PI Vision Screen of that perticular exception.
        b.) Management: Allow CMAs to take action and to add comments.
        c.) REMS Watchlist: Display all rems events.
        d.) Excption History: Show hisory of generated exceptions.
        e.) Work Order: All the work orders generated for the exception.
        f.) Machine Events: Machine Events generated for the exception.
        g.) Oil Analysis: Oil Analysis data.
        h.) Manual Con-Mon Data: Added ConMon data.
    
    - User can also add recommendation for the exception. 

    5) Fleet Detail Page: Shows all the exceptions generated on that perticular Fleet.

## Installation and Setup Instructions

## Example

Clone down this repository. You will need `node`, `npm` and `yarn` installed globally on your machine.  

Installation:

`npm install` or `yarn` 

To Start Server:

`npm start`

To Visit App:

[http://localhost:3000/summary](http://localhost:3000/summary)

 `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\

Your app is ready to be deployed!

## _.env.*_ - File Support

Config for each environment is stored in a separate file.
- .env.dev: Development environment
- .env.uat: UAT environment
- .env.prod: Production environment

This feature is dependents on env-cmd package. Following block of code shows how to use it.

```
```js
"build:dev": "env-cmd -f .env.dev react-scripts build"
```