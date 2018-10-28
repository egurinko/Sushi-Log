# Introduction

This was created during my time as a student at Code Chrysalis!

This API allows you to list, add, update your favorite sushi-bars. And also if you feel sushi should be disappeared, you can delete all data.

# DATA

You have one table called sushi_bars.
Sushi_bars table has sushi_bars name and rating informatino like below.

**1. id:** Auto incremental interger.

**2. name:** String. Maxmum length is 50.

**3. rating:** Float. You can use decimal point.

# What you can do with this API

**1. GET**

- all
  /sushi_bar
- specific
  /sushi_bar/:id

**2. POST**

- Add a new sushi_bar
  /sushi_bar/add/:name/:rating

**3. PUT**

- Add or Replace sushi_bar.
  /sushi_bar/replace/:id/:name/:rating

**4. DELETE**

- Delete all data
  /sushi_bar/delete

# DEMO

You can interact with this API below.
It's working on heroku.
[DEMO](https://sushi-log.herokuapp.com/)

Please use [postman](https://www.getpostman.com/) to test to POST.

# REFERENCE

I use [yelp-fusion API](https://www.yelp.com/developers/documentation/v3) to get sushi_bar data and rating data.
