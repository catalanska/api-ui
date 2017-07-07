# API User Interface #

## Description

Simple User Interface to interact with a BackEnd API. This project is mainly built in HTML, CSS, Javascript.

Tested and working in ie9+, Chrome 16+, Android 4.1+, iOS 5.1+

## Installation guide

Steps:

 - 1) Make sure you have a modern version Node installed in your system.
 - 2) Run: `npm install` (this will install all the needed dependencies)
 - 3) To start the project run: `npm start`
 - 4) Open your browser and go to: http://localhost:8000/

## Build

- To obtain the production build run `npm run build`

## Tests

- Run `npm test` to run the suite and get the coverage report

## Eslint

- This project uses eslint with config by airbnb
- Run `npm run lint` to run the linter

## ToDo

- Improve XML Syntax Highlighting
- Create Custom Dropdown component
- e2e testing
- CSS not stable in some browsers

## Performance

- Assuming that the project will become big I've done the following:
  - All the logic is executed after page load to avoid blocking
  - All the base content is rendered at the beginning, while fetching is still not ready. This allows the user to interact with the page even when some data is still missing.
  - Prepare the code so it can display as many apiMethods as needed, not just one.
  - Didn't use any framework to keep the build size small (98kb for build.js)

- Future performance improvements
  - Improve storage to avoid requesting the same data more than once (can happen now if user selects a different format a few times)
  - Use webworkers to handle data fetching async
  - Prefetch data that is not display by default


## Other considerations

- The project includes a dummy nodejs server. I've added one extra endpoint to retrieve the list of methods that should be displayed by the app. Of course, this would delay BackEnd even more. Also, it might not be the desired behaviour, so it could be replaced by a config file that holds that list.

- I've prepared the code so it would be easy to introduce a framework like ReactJS in the case that the project grows into an SPA
