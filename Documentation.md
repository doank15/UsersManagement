# Day 1 
+ Use express.Static to use static file such as css html

## Learning about handlebars
+ Using conditions
- Using {{#if}} {{else}} {{/if}}
- #if only accepts a single condition and u cannot use JS comparision syntax (===).
- If u need to use multiple conditions or additional syntax, u can create a varuable in the code and pass it down to the template.

+ Using Loops
+ populate: verd cư trú, đến định cư 
- Using #each loop. u can use this to reference the element that's in the current interation

+ Using partial 
- Pretty much all web pages containt diff sections. On a basic level, these are the header, body, footer. Since the header and footer are typically shared between many pages, having this in all web pages will soon become extremely annoying and simply redundant

- We can include code in the home.hbs file like this: 
{{>header}}
{{>posts posts=posts}}

+ Building a Custom Helper
- We can create a custom helper to summarize that text
- Hiển thị 1 đoạn comment ngắn: 
getShortCommnent(comment) {
    if(comment.length < 64) 
        return comment;
    return comment.substring(0,100) + '...';
}


# Using boostrap to create Pages
+ <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"> boostrap
+ <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css"> icon 


## Database Setup

+ What is the different between mysql.createConnection and mysql.createPool in Nodejs MySQL module? 
- When you create a connection, you only have one connection and it last until you close it (or it is close by the mysql server)

- When you createPool. A Pool is a place where connection get stored. When you request a connection from a pool, you will receive a connection that is not currently being used, or a new connection. If u're already at the connection limit

+ View Users
- Method get select * from users

+ find().lean() to accept for JSON object


# Middleware 
+ ErrorHandler middleware:
- This is middleware function to handle error occur during the execution of request-response cycle. 
- Responsible for catching errors in subsequent middleware or route handlers
- Types of Error 
- It is the most important to avoid crushing your APP anytime an error occurs.
+ In the contex of Nodejs, Error are generally classified into two categories:
## operational errors:
- refer to runtime errors when an application encounters an unhandled exception or another code error. 
- this is the challenging to diagnose as infinite loops, memory leaks, incorrect configuration systems, etc.
## programmer errors which are also known as functional errors


# Send email function with Nodemailer
- Handlebars => Javascript Template engine for generate dynamic HTML pages
    + Convert JS functions into HTML templates and replace variables with actual data