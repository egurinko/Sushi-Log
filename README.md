# Sushi-Log

This was created during my time as a student at Code Chrysalis.

# Introduction

This API allows you to list, add, update your favorite sushi-bars. And also if you feel sushi should be disappeared, you can delete all data.

# Data

You have one table called sushi_bars.
In sushi_bars table, there are three columns like below.

1. id (int)
2. name (str)
3. rating (float: 1~5)

# What you can do with this API

1. GET

   - all
     /sushi_bar
   - specific
     /sushi_bar/:id

2. POST

   - Add a new sushi_bar
     /sushi_bar/add/:name/:rating

3) PUT

   - Add or Replace sushi_bar.
     /sushi_bar/replace/:id/:name/:rating

4) DELETE
   - Delete all data
     /sushi_bar/delete
