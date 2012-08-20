shiva.js
========

A javascript library to transform/ map json objects.



Dependencies:
------------
underscore.js



Installing
----------
include the dependencies and the file shiva.js in the page you want to use.


Using
-----
 mapData(input,options)

maps the input according to options.

input can be any object/basic data type, array. if it is an array, the mapping will be applied to each data.

options: it can be a function or a mapper
if it is a function then it takes the input and output is the return value of the function.

if the input is an array then the function is executed for each element of the array. and the output array is returned.

options can be an object with following options
only: array of fields to select only

except: array of fields to be excluded. At a time only one of the options "only" or "except" should be used

rename: object of key value pair, with key as current name, property as new name
property specific tranformation: can replace the array syntax,and methods for simple 

properties

comments:mapper, // does mapData(comments,mapper)

comments:function(){}, // does manipulation on the value of comments, if comments is an array will apply on each value.   

methods: array of methods which return a key value pair which is merged into result
array: input property, output property or only property(no rename), mapper: to map each element

transform: passes the result to transform function which transforms the result(obtained after applying all options) and returns the final result

pending: 
pipes: temp(transform)
   
   

