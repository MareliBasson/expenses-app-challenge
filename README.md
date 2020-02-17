# Expenses app challenge

This project makes use of this [API](https://github.com/pleo-io/frontend-challenge/tree/master/api).

## To run this project

-   Clone this repo - the api has been included in this project.
-   Change directory to `/api` and start the API locally - instructions can be found in it's [README](https://github.com/MareliBasson/expenses-app-challenge/tree/master/api)
-   Make a copy of the .env-example file found in the root of this repo and rename it to .env
-   Run `npm install`
-   Run `npm start`

## Thoughts and choices

-   **Architecture**
    -   This project is built using a [basic Create React App boilerplate](https://github.com/MareliBasson/react-boilerplate-site) I've created before and updated as required. I created this boilerplate to help me get simplistic apps up and running as quickly and as efficiently as possible.
    -   Modular file structure - I prefer grouping all files that are relevant to a component together, especially the js and stylesheets. If the project included tests, these would also be grouped in their relevant component folder.
    -   Absolute paths - I've found using absolute paths when possible makes for much neater imports and saves a lot of time if components need to be moved around.
    -   Stylesheets - Currently I prefer using separate stylesheets as it's the format I work with most often. I've worked with Styled Components and CSS in JS as well before, but I'm not as experienced using them eventhough I definitely want to get more experience using them to full effect.
-   **State management**
    -   I don't have experience setting up a state management library such as Redux. When prop-drilling became excessive in this project I compared Redux and Context API - I chose these two because Redux is the libary I have the most experience using and Context API, because I'm curious about how it's used and because it's a solution that doesn't require adding another dependency.
        -I did attempt to setup Redux in a separate branch and got the basic example I was using to work, but then realised I'm not sure at all how to adapt the reducers for my own use case or how to go about structuring the global state, so I put that branch on pause to rather focus on my strengths.
-   **API Implementation**
    -   This is my first time setting up API calls.
    -   Async/await and promises is a gap in my JS knowledge that I haven't fully addressed. I'm aware of them as a requirement for working with API calls but as these were generally handled by backend developers on the teams I was on, I haven't gained experience in implementing either format or the pros/cons of using the one over the other.
    -   By chance all the examples I used to setup the API calls used a promise structure. But I'm researching what the pros and cons are and might convert these to async/await if I understand the advantages better.
    -   I changed the API to return all expenses when using the `GET /expenses` endpoint. I felt it made more sense to have it return everything when there's no limit or offset set, however I definitely understand the need to implement a limitation if the dataset was returning thousands of entries.
    -   I updated the `POST /expenses/:id` endpoint to also accept a change to category. The intent with this was to allow users to add a category to an expense which can then be used for filter (will still implement if time allows)
    -   I'm not sure what the best practice is for updating values in the API:
        -   Do you always update the API and then fetch the new values or do you update your local copy of the dataset and push the change to the API in the background, only reverting the change if the POST fails OR is there a way to cache all the changes and send them as packets at set intervals?
        -   First option seems the most reliable to me, but if you have a slow connection this can considerably slow down the app's responsiveness, also I then need to keep track of what view the user was on to make sure they don't loose their context - whether on a specific page or filtered view.
        -   Second option seems better for providing a seamless UI experience but I worry about keeping the API and the local dataset synched with each other.
        -   Currently settling on option one as it speaks to my aversion for potential data loss.
    -   I noticed that the API doesn't update a comment if it POSTs a blank string (""). So I've mocked it so that a user can "remove" a comment by just entering a single space.
-   **UI Design**
    -   I used my favourite budget app as a rough guideline for the UI: [22Seven](https://www.22seven.com/)
    -   Accessibility - _TODO; expand on this_
    -
-   **Hardest part to implement**
    -   Working without a state management libary - I tried to keep my components neat and modular, keeping track of my state and limiting the prop-drilling as much as with the use of library. Using Context API helped with this, but I'm extra motivated now to properly learn how to setup Redux.
    -   Getting the API endpoint calls to work and getting a better understanding of how to use an API as well as making basic updates to one.
-   **Functionalities I'm most proud of**
    -   Honestly the whole thing! Mostly because it gave me a chance to really apply what I've learnt in the last couple of years. But if I have to highlight some of my favourites:
    -   Figuring out how to make changes to the API.
    -   I like my UI, it's usuable, neat and it's responsive design looks good along with being easy to use on small screens - I kept the user in mind and made sure to hide and reveal functionality as it's available to them. I tried to keep it as uncluttered as possible, without sacrificing it's usability - paying close attention to existing UI patterns for budgetting/financial apps, helped with this.
    -   I love adding UI details such as the highlighted dates in the date-range filter to show which dates have expenses on them, or the comment and receipt icons with their onHovers to indicate that an expenses has extra info added to it and to give a small preview of what to expect.
    -   The expense modal was a fun challenge because I really wanted the updates the user makes to reflect in the background on the expenses list.
    -   The date range filter is one I really enjoyed building, since I got to use more of Moment.js's features instead of just the usual date formatting.
-   **How long it took me**
    -   Around 29 hours
    -   I used my RescueTime logs to estimate how much time I've spent on the project

## What I've learnt

-   Handling API calls, specifically POST and especially the receipt update calls
-   How to setup a image uploader using Firebase (my first attempt at image uploading before I realised the API includes an Express server)
-   Debugging an Internal Server Error - the cause was the content-type header I'd set on the form-data call for receipts
-   How to add new properties to an array of nested objects using this.setState and prevState - I used this to create a userName property and then confirm there were no repeat usernames with \_.uniqBy - the idea was to allow users to filter by username, but since all the usernames were unique I abandoned this feature.
-   Working with React's Context API

## Final Thoughts

-   **This challenge was a lot of fun to do! **
-   I got to implement much of what I've learnt about React and JS in the last 3 years. It was great seeing how much I've improved and also where I lack some fundamentals such as promises, async/await,hooks and how to setup Redux.
-   There's definitely a point during this project where I got sidetracked by trying to implement all the things I didn't know - those things I felt I wasn't strong enough in and were expected in some way or where I felt my lack of knowledge would reflect badly on my assessment. But I realised quickly that all this will accomplish is an inconsistent implementation across my app, due to my inexperience in those areas and that I would be sacrificing the areas where I feel my strengths lay. So I refocussed - I researched the aspects I'm not as well-versed in to deepen my understanding, implement only that which would really add to my project without disrupting the parts I'm already proud of and rather focus on polishing and adding to the features I know I can add the most value to.
-   I learnt a lot and got to dip into concepts I haven't had an opportunity to before. I now have a better understanding of Context API, hooks and ...
-   Learnt more about what MomentJS is capable especially when it comes to filtering

## Packages used

-   [Lodash](https://www.npmjs.com/package/lodash) - to speed up development by providing some handy methods for dealing with objects and arrays
-   [FontAwesome](https://github.com/FortAwesome/react-fontawesome) - icons for the UI (might replace with IcoMoon if time allows)
-   [Moment](https://www.npmjs.com/package/react-moment#formatting) - for easy date formatting
-   [React-Datepicker](https://www.npmjs.com/package/react-datepicker) - neat date picker component

## Resources

A list of links or people I consulted while building the project on topics i'm not as familiar with, either

-   Ralf Kistner - help with API call structure and debugging an image upload 500 error
-   Leon van Niekerk - partner/rubber duck
-   Peter Scott - general feedback on project
-   API Calls setup
    -   https://stackoverflow.com/questions/38510640/how-to-make-a-rest-post-call-from-reactjs-code
    -   https://muffinman.io/uploading-files-using-fetch-multipart-form-data/
-   Image Loader
    -   https://codeburst.io/react-image-upload-with-kittens-cc96430eaece
-   By Month filter - would've been used if I decided to go with an array of months instead of the date range filter I ended up implementing.
    -   https://medium.com/better-programming/how-to-generate-an-array-of-months-years-or-days-in-javascript-add4b8419ff9
-   React Context API
    -   https://daveceddia.com/context-api-vs-redux/
-   Currency Formatting
    -   I was considering using [this package](https://www.npmjs.com/package/currency-formatter), but it directed me to the [Internationalization API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat)
