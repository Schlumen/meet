# Meet App
This app will allow users to search for a city and get a list of events hosted in that city.
This app was developed to build a serverless, progressive web application (PWA) with React using a
test-driven development (TDD) technique. The application uses the Google Calendar API to fetch upcoming events.
## Serverless
This app uses a serverless function deployed on Amazon AWS Lambda to authorize (OAuth 2.0) the user to make requests to the Google Calender API to search for upcoming events.
## Used technologies
- React
- JavaScript
- HTML
- CSS
# User Stories
## Feature 1: Filter Events by City
- As a user
- I should be able to filter events by City
- So that I can see the list of events that take place in that city
### Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities
Given user hasn’t searched for any city
When the user opens the app
Then the user should see a list of all upcoming events
### Scenario 2: User should see a list of suggestions when they search for a city
Given the main page is open
When user starts typing in the city textbox
Then the user should see a list of cities (suggestions) that match what they’ve typed
### Scenario 3: User can select a city from the suggested list
Given the user was typing “Berlin” in the city textbox
And the list of suggested cities is showing
When the user selects a city (e.g., “Berlin, Germany”) from the list
Then their city should be changed to that city (i.e., “Berlin, Germany”)
And the user should receive a list of upcoming events in that city
## Feature 2: Show/Hide an Event’s Details
- As a user
- I should be able to show/hide an event’s details
- So that I can see the details of that event
### Scenario 1: An event element is collapsed by default
Given the user is viewing a list of events
When the user sees an event element
Then the event element should be collapsed by default
### Scenario 2: User can expand an event to see its details
Given the user is viewing a collapsed event element
When the user clicks on the “Show details” button
Then the event element should expand, displaying the event details
### Scenario 3: User can collapse an event to hide its details
Given the user is viewing an expanded event element
When the user clicks on the “Hide details” button
Then the event element should collapse, hiding the event details
## Feature 3: Specify Number of Events
- As a user
- I should be able to specify the number of events
- So that I can choose the number of events I will see
### Scenario 1: When user hasn’t specified a number, 32 is the default number
Given the user has not specified the number of events they want to see
When the user opens the app
Then the app should display a list of 32 upcoming events by default
### Scenario 2: User can change the number of events they want to see
Given the user is viewing a list of events
When the user specifies the number of events they want to see
Then the app should display that number of upcoming events
## Feature 4: Use the App when Offline
- As a user
- I should be able to use the app when I’m offline
- So that I can see cached events even when I do not have an internet connection
### Scenario 1: Show cached data when there’s no internet connection
Given the user has opened the app before and it has cached data
When the user opens the app with no internet connection
Then the app should display the cached data
### Scenario 2: Show error when user changes the settings (city, time range)
Given the user has no internet connection
When the user tries to change the settings (city, time range)
Then the app should display an error message informing the user that they need an internet connection to change the settings
## Feature 5: Data Visualization
- As a user
- I should be able to visualize the data about events
- So that I can see what events and how many event are in one city
### Scenario 1: Show a chart with the number of upcoming events in each city
Given the user is viewing a list of upcoming events
When the user clicks on the “Data Visualization” button
Then the app should display a chart showing the number of upcoming events in each city