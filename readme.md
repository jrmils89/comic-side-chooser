# Overview

URL: https://comicsides.herokuapp.com

This application has both user and public facing content.

###### Public
Allows the user to search for their favorite characters and retrieve much of the article content from their corresponding wikia pages.

###### Logged In
Same functionality as public, but you get a few additional features
1. Profile pages with ability to save favorite characters and share your profile page with others
2. A comic stats page where you can see some data visuals of a few comic book character trends. Men with blue-eyes are really popular apparently...

###### Admin functionality

There is also built in admin functionality. Currently only I am an admin (muhahaha).

Actually the only thing the admin role can do that logged in users can't is seed some database into the production DB.

# Tests

To run tests clone the repo
```
git clone https://github.com/jrmils89/comic-side-chooser.git <directory>
```
And then run
```
mocha
```

# Technologies

This is an Node.JS / Express app. MongoDB is the DB being used. Templates and layouts are done with EJS. jQuery/jQuery UI/Javascript are used on the client side to handle much of the user interactions and rendering the charts.

# 3rd Party Data & Credit

###### APIs

* DC Wikia - https://dc.wikia.com/api/v1
* Marvel Wikia - http://marvel.wikia.com/api/v1

###### JS Libraries
* passport.js
* chart.js

###### jQuery Libraries
* jQuery UI
* jQuery Cycle Plugin (http://jquery.malsup.com/cycle/)

###### Content

* Data originall scraped by FiveThirtyEight and their repo can be found here: https://github.com/fivethirtyeight/data/tree/master/comic-characters. They also wrote an article on this data which can be found here: http://fivethirtyeight.com/features/women-in-comic-books/
* Additionally, I take no credit for the images being used. The thumbnails are courtesy of the Wikias and I claim no ownership or credit for all other images
* Of course, all these characters are property of Marvel and DC Comics. I'll go see Batman v Superman and Civil War twice if you're not mad at me :D