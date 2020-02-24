# Expenses app challenge

This project makes use of this [API](https://github.com/pleo-io/frontend-challenge/tree/master/api), which I've copied over to my repo and modified.

## To run this project

-   Clone this repo and make sure to have [NodeJS](https://nodejs.org/en/) installed.
-   Change directory to `/api` and start the API locally - instructions can be found in it's [README](https://github.com/MareliBasson/expenses-app-challenge/tree/master/api)
-   Make a copy of the .env-example file found in the root of this repo and rename it to .env
-   Run `npm install`
-   Run `npm start`

## The Basics

**Hardest part to implement:**

-   Getting the API endpoint calls to work and getting a better understanding of how to use an API as well as making updates to one.
-   Working without a state management libary - I tried to keep my components neat and modular, and limiting the prop-drilling as much as possible without the use of a library. Using Context API helped with this, but I'm extra motivated now to properly learn how to setup Redux. Adding the helper.js file helped with simplifying the Expenses Page component (it was getting extremely bloated with methods since they all needed to update or use the states in that file). I realise my use of the helper file is not best practice - those functions are very tightly coupled to the files they're being used in because they need those files' states. This is not ideal by a long shot, as I know it will prevent them being used in any other files and this is completely counter to what helper functions are intended to be. If I were using a state management library, they would be using the global state and updating that, instead of the individual files they're currently linked to. I got it to work but I'm not proud of this implementation as it's not scalable.

**Functionalities I'm most proud of:**

-   Honestly, the whole thing! Mostly because it gave me a chance to really apply what I've learnt in the last couple of years.
    **But here are some of my favourites:**
    -   Figuring out how to make changes to the API.
    -   I like my UI, it's usuable, neat and it's responsive design looks good along with being easy to use on small screens - I kept the user in mind and made sure to hide and reveal functionality as it's available to them. I tried to keep it as uncluttered as possible, without sacrificing it's usability.
    -   I love adding UI details such as the highlighted dates in the date-range filter to show which dates have expenses on them, or the comment and receipt icons with their onHovers to indicate that an expenses has extra info added to it and to give a small preview of what to expect.
    -   The expense modal was a fun challenge because I really wanted the updates the user makes to reflect in the background on the expenses list.
    -   I enjoyed creating the expense-filters - setting up the date-range filter gave me a deeper dive into what can be done with moment.js and how to manipulate date values. On the categories filter I got to refactor my filtering functions to account for the user combining date-ranges and specific categories.

**How long did it take?**

-   About 40 hours spread across 2.5 weeks - I used RescueTime to get a rough estimate of my time

## Project choices

-   **Architecture**
    -   This project is built using a [basic Create React App boilerplate](https://github.com/MareliBasson/react-boilerplate-site) I've created before and updated as required. I created this boilerplate to help me get simplistic apps up and running as quickly and as efficiently as possible.
    -   Modular file structure - I prefer grouping all files that are relevant to a component together. If the project included tests, these would also be grouped in their relevant component folder as well.
    -   Absolute paths - I've found using absolute paths when possible makes for much neater imports and saves a lot of time if components need to be moved around.
    -   Stylesheets - Currently I prefer using separate stylesheets as it's the format I work with most often. I've worked with Styled Components and CSS in JS as well before, but I'm not as experienced using them eventhough I definitely want to get more experience using them to full effect.
-   **State management**
    -   I don't have experience setting up a state management library such as Redux. When prop-drilling became excessive in this project I compared Redux and Context API - I chose these two because Redux is the libary I have the most experience using and Context API, because I'm curious about how it's used and because it's a solution that doesn't require adding another dependency.
        -   I did attempt to setup Redux in a separate branch and got the basic example I was using to work, but then realised I'm not sure at all how to adapt the reducers for my own use case or how to go about structuring the global state, so I put that branch on pause to rather focus on my strengths.
        -   I applied a React Hook to the ExpenseFilters component to try it out (and at the end for the theming) - Very Useful! Definitely want to start using it more often.
-   **API Implementation**
    -   This is my first time setting up API calls.
    -   Async/await and promises is a gap in my JS knowledge that I haven't fully addressed. I haven't gained experience in implementing either format or the pros/cons of using the one over the other. By chance all the tutorials I used to setup the API calls used a promise structure.
    -   I changed the API to return all expenses when using the `GET /expenses` endpoint. I felt it made more sense to have it return everything when there's no limit or offset set, however I definitely understand the need to implement a limitation if the dataset was returning thousands of entries.
    -   I updated the `POST /expenses/:id` endpoint to also accept a change to category. Now a user can set a category on an expense and then filter by those categories.
    -   I'm not sure what the best practice is for updating values in the API:
        -   Do you always update the API and then fetch the new values or do you update your local copy of the dataset and push the change to the API in the background, only reverting the change if the POST fails OR is there a way to cache all the changes and send them as packets at set intervals?
        -   First option seems the most reliable to me, but if you have a slow connection this can considerably slow down the app's responsiveness, also I then need to keep track of what view the user was on to make sure they don't loose their context - whether on a specific page or filtered view.
        -   Second option seems better for providing a seamless UI experience but I worry about keeping the API and the local dataset synched with each other.
        -   Currently settling on option one as it speaks to my aversion for potential data loss.
    -   I noticed that the API doesn't update a comment if it sends a blank string (""). So I've mocked it so that a user can "remove" a comment by just entering a single space.
-   **UI Design**
    -   I used my favourite budget app as a rough guideline for the UI: [22Seven](https://www.22seven.com/)
    -   I attempted to keep things as minimal as possible while making information about the expenses as discoverable as possible.
        -   For instance the icons that appear if a comment or image has been added to an expense - on hover the user gets either a preview of the comment or an indication of how many images have been added.
        -   I realised tabbing through the date range filter can get frustration if a user doesn't know on which days expenses were logged, so I added the highlighted dates to show this information.
-   **Version Control**
    -   My commits are most often phrased by completing this sentence snippet: "If this commit is applied it will..."
-   **Theming**
    -   Just something for the fun of it ;)

## What I've learnt

-   Handling API calls, specifically POST and especially the receipt update calls
-   How to setup a image uploader using Firebase (my first attempt at image uploading before I realised the API includes an Express server)
-   Debugging an Internal Server Error - the cause was the content-type header I'd set on the form-data call for receipts
-   How to add new properties to an array of nested objects using this.setState and prevState - I used this to create a userName property and then confirm there were no repeat usernames with \_.uniqBy - the idea was to allow users to filter by username, but since all the usernames were unique I abandoned this feature.
-   Working with React's Context API and Hooks

## What I need to improve on

-   API Calls - I need a better understanding how they're structured
-   Async/Await vs Promises - I've only touched on these in this project, but I'm using callbacks more and more frequently these days, mostly to gain more control over UI interactions and states. So understanding these better will be crucial.
-   Hooks - I've been lax in exploring these and they're so useful!
-   State management - I really need to take a deeper dive on the options available for state management in React. My knowledge has been enough to use Redux if someone else did the initial setup, but my lack of knowledge on this front really frustrated me during this project.
-   Understanding Node and how to configure Webpack properly - Create React App has been a great learning tool, but the more I improve my skills the more often it ends up limiting my ability to set my project up the way I'd like. In the case of this project, it's compiling the all the stylesheets and inserting them as invidividual style tags directly in the DOM as it encounters them in my component files. This can lead to a number of issues but I was unable to find information on how to solve this without ejecting the app and I didn't want to take that risk this far into my project.

## Final Thoughts

-   **This challenge was a lot of fun to do!**
-   I got to implement much of what I've learnt about React and JS in the last 3 years. It was great seeing how much I've improved and also where I need to brush up my knowledge and get some practical experience such as promises, async/await, hooks and how to utilise Redux properly.
-   There's definitely a point during this project where I got sidetracked by trying to implement all the things I didn't know - those things I felt I wasn't strong enough in and were expected in some way or where I felt my lack of knowledge would reflect badly on my assessment. But I realised quickly that all this will accomplish is an inconsistent implementation across my app, due to my inexperience in those areas and that I would be sacrificing the areas where I feel my strengths lay. So I refocussed - I researched the aspects I'm not as well-versed in to deepen my understanding, implement only that which would really add to my project without disrupting the parts I'm already proud of and rather focus on polishing and adding to the features I know I can add the most value to.

## Packages used

-   [Lodash](https://www.npmjs.com/package/lodash) - to speed up development by providing some handy methods for dealing with objects and arrays
-   [FontAwesome](https://github.com/FortAwesome/react-fontawesome) - icons for the UI (might replace with IcoMoon if time allows)
-   [Moment](https://www.npmjs.com/package/react-moment#formatting) - for easy date formatting and manipulation
-   [React-Datepicker](https://www.npmjs.com/package/react-datepicker) - neat date picker component with regular support
-   [GSAP](https://www.npmjs.com/package/gsap)- A great animation libary for building animations

## Resources

A list of links or people I consulted while building the project on topics i'm not as familiar with, either

-   Ralf Kistner - help with API call structure and debugging an image upload 500 error
-   Leon van Niekerk - partner/rubber duck
-   Peter Scott - general feedback on project
-   Brendan Arries - UI review
-   API Calls setup
    -   https://stackoverflow.com/questions/38510640/how-to-make-a-rest-post-call-from-reactjs-code
    -   https://muffinman.io/uploading-files-using-fetch-multipart-form-data/
-   Image Loader - _I used this setup first, until i realised the API already supported the image upload fully_.
    -   https://dev.to/clintdev/simple-firebase-image-uploader-display-with-reactjs-3aoo
-   By Month filter - _would've been used if I decided to go with an array of months instead of the date range filter I ended up implementing_.
    -   https://medium.com/better-programming/how-to-generate-an-array-of-months-years-or-days-in-javascript-add4b8419ff9
-   React Context API and hooks
    -   https://daveceddia.com/context-api-vs-redux/
    -   https://www.freecodecamp.org/news/state-management-with-react-hooks/
-   Currency Formatting
    -   I was considering using [this package](https://www.npmjs.com/package/currency-formatter), but it directed me to the [Internationalization API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat)
