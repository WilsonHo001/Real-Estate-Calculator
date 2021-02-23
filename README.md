PROJECT: Real-Estate Analysis App
Authors: Yuriy Melnyk, Daniel Duff, Wilson Ho, Zirong Lin, Junchen Cao, Endong Cao


mapScript.js - main script file containing all the functions

Property.js - contains Property class for representation of properties

testPage.html - HTML file that contains the page and launches mapScript.js

style.css - CSS file which modifies the appearance of a page

Launch Instructions:

1. Download the repository
2. Get a key from Rapid API Realtor https://rapidapi.com/apidojo/api/realtor
3. Enter your key into var realtorAPIKey at line 7 of mapScript.js
4. Launch testPage.html in a browser

Use instructions:
1. Use search bar to enter a city
2. Click on any marker that appears to see the information

OR

1. Click Draw button
2. Double-click at a location where you want to start drawing
3. Draw a polyline
4. Left-click again when you want to finish
5. Wait until properties appear on the map
6. Click on a marker to see the information


Real Estate Analysis Overview

General:
Our purpose of this project was to develop different calculators to help real estate investors analyze their investments. Specifically, we are looking to build user interfaces to help visualize results from our real estate calculators. Our goal is to be able to visualize and annotate properties on a map. We wish to have a responsive interactive web application that will use google maps API to display locations of properties that are filtered from our real estate investment calculators. In our solution, we used a wide variety of API’s which include Google Maps, Geocode, Places, Polyline, Polygon, Geometry, and RapidAPI’s Realtor for Javascript and included HTML / CSS. 

Description of current systems:
There are many examples that are currently available. All the realtor websites have some sort of similar implementation.

Requirements of the proposed system:
During the feasibility and planning stage, we were shown Redfin.com map features and were told to mimic some of the features. We were required to mimic the drawing feature which lets you draw a shape and it will return markers in the direct coordinates at each property for sale in the area of the shape. Also the content in the markers needed to be changed to display expected Profit/year, Expenses/year, and Expense/Income ratio along with the Address, the Price, and the number of Bedrooms / Bathrooms. 

System models:
Our solution will be used when the investor is looking for a new property to purchase and wants an easy way to determine the price of the house, the number of bedrooms and bathrooms, profit per year, expenses per year, and expense to income ratio. We also created a search bar that lets you enter a city and the map will display the city in the middle of the screen to help speed up the process if you have a specific area in mind.To access our interactive map, the user must download all of the files and launch the testPage.html.

Costs:
Google Maps ($7 per 1000 requests) and Geocoding API ($5 per 1000 requests), but the first $200 are free every month, so in order to pay anything, you have to load a map 20000 times and geocode 12000 locations.
Realtor API offers 500 free requests every month, or you can subscribe to a $20 per month plan that offers 10000 requests
