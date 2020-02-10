# Expenses app challenge

This project makes use of this [API](https://github.com/pleo-io/frontend-challenge/tree/master/api).

## To run this project

-   Clone both this repo and the repo for the [API](https://github.com/pleo-io/frontend-challenge/tree/master/api)
-   Start the API locally - instructions can be foun in it's [README](https://github.com/pleo-io/frontend-challenge/tree/master/api))
-   Make a copy of the .env-example file found in the root of this repo and rename it to .env
-   Run `npm install`
-   Run `npm start`

## Notes on this project:

-   I started this project using a [basic react boilerplate](https://github.com/MareliBasson/react-boilerplate-site) I've created before and updated as required.
-   Setting up the API functionality is something I haven't done on my own before.
-   Part of my boilerplate is using absolute paths - I find it a lot neater to navigate but also much easier to update if a component's location changes.
-   I used my favourite budget app as a guideline for the UI: [22Seven](https://www.22seven.com/)

## Resources

A list of links or people I consulted while building the project on topics i'm not as familiar with, either

-   Ralf Kistner
    -   question about strange build behaviour: without default port builds fine, with default port sometimes returns blank page, but fine on refresh
    -   help with debugging the image upload 500 error
-   Leon van Niekerk - partner/rubber duck
-   API Calls setup
    -   https://stackoverflow.com/questions/38510640/how-to-make-a-rest-post-call-from-reactjs-code
-   Image Loader
    -   https://codeburst.io/react-image-upload-with-kittens-cc96430eaece

## What I've learnt

-   Handling API calls, specifically POST and especially the receipt update calls
-   How to setup a image uploader using Firebase (my first attempt at image uploading before I realised the API includes an Express server)
-   Debugging an Internal Server Error
-

## Packages used

-   [Lodash](https://www.npmjs.com/package/lodash) - to speed up development by providing some handy methods for dealing with objects and arrays
-   [FontAwesome](https://github.com/FortAwesome/react-fontawesome) - icons for the UI (might replace with IcoMoon if time allows)
-   [Moment](https://www.npmjs.com/package/react-moment#formatting) - for easy date formatting
-   Currency convertor - TBD

## Thoughts

-   I'm not sure what the best practice is for updating values in the API:
    -   Do you always update the API and then fetch the new values or do you update your local copy of the dataset and push the change to the API in the background, only reverting the change if the POST fails OR is there a way to cache all the changes and send them as packets at set intervals?
    -   First option seems the most reliable to me, but if you have a slow connection this can considerably slow down the apps responsiveness, also I then need to keep track of what view the user was on to make sure they don't loose their context - whether on a specific page or filtered view.
    -   Second option seems better for providing a seamless UI experience but I worry about keeping the API and the local dataset synched with each other.
    -   Currently settling on option one as it speaks to my aversion for potential data loss.
-   I've noticed that the API doesn't update a comment if it sends a blank string ("") through.
