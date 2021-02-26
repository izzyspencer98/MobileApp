# Mobile App Assignment
Isabelle Spencer - 17103068

## Screencast
- Screencast link - https://drive.google.com/file/d/1_SNRze2VWTh3JgLWt4ZuaOpLQLynVAQy/view?usp=sharing

## Version Control
I used GitHub desktop for version control, which I use for all other projects. When developing on my own application, I always set up a development branch under the main. I make regular commits to the dev branch and only push to main when the feature/section is fully functional.
Public Repo link - https://github.com/izzyspencer98/MobileApp/

## App Intro
I designed this application based off the Galio framework - https://galio.io
![galio theme](https://res.cloudinary.com/dk4rjadwm/image/upload/v1614361879/MobileApp/Opera_Snapshot_2021-02-26_174731_galio.io_r9yvdh.png)
Galio created issues in the beginning so I created an index.d.ts file to include it as a module.export, this fixed my import issues when building the app.
Galio also forces images to use uri's so I set up some online storage to generate links for any local images I wanted to use. I did used my own images for the locations because I didn't want to edit the server.

## Style Guide
I chose to follow the JS Standard style guide - https://standardjs.com - installing eslint to automatically format the code in this standard.
I followed the JS standard because Galio was a tricky framework so I didn't want to use anything that could clash and cause issues.

## Consistent UI Style
I tried to be consistent with my design throughout.
- Colour scheme:
![colour palette](https://res.cloudinary.com/dk4rjadwm/image/upload/v1614361874/MobileApp/Opera_Snapshot_2021-02-26_174646_coolors.co_ucuhmk.png)

## Running the Application
- The user will be forced to login when the app is launched.
- The star is clickable for favouriting the coffee shops.
- The heart is clickable for liking reviews.
- The rating stars are also clickable for posting/updating reviews. (Not clickable if it is someone else's review.)

## Code Structure
The main code is in a js folder with sub-folders:
- api (for the requests - since I reuse them throughout the app)
- components (for stack screens)
- navigation (for building stack navigations on each of the drawer screens)
- screens (for the main screens in the drawer nav)
- styling (for a consistent stylesheet which is split into sections to make styling changes easy)

## Features
The application should:
- Implement all 17 endpoints (with some used multiple times to fetch different sets of data)
- Include a profanity filter when posting/updating reviews. This should prevent the review from being sent until the review body is suitable.
- Use a haversine import to calculate the distances between the current location and each shop.
- Take the user to google maps when the distance is clicked on the shop pages.
- Use toast notifications to tell the user when a process has been successful.
- Implement the Airbnb star rating component.
- Handle any delayed loading with activity indicators to show the user that it is doing something in the background.


## Notes / Bugs
- Sometimes there is an Invariant violation error when first starting the app (something to do with RNCamera). Doesn't crash the app but occasionally can prevent it from loading until you force a reload.
- Calling the component did mount to refresh the pages created a bit of a duplication issue. It can double the fetch requests on load of the page. Fixed to an extent.
- I use base64 to send and display images in case you find an issue with getting your own images from the server.
