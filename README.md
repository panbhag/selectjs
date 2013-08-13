selectjs
========

A javascript library to map json objects/arrays.

Using this you can do the following transformations on a json object/array:

 => select only some properties.
 
 => select all but some properties.

 => rename properties.

 => transform individual properties

 => do the above operations on an array.



Dependencies:
------------
underscore.js



Installing
----------
include the dependencies and the file shiva.js in the page you want to use.


Using
-----

shiva.transform(input,options)

Examples

Rename object keys
```javascript
 var input = {x:1,y:2,z:3};
 var output = shiva.transform(input,{rename:{x:'a',y:'b',z:'c'}}); //output is  {a:1,b:2,c:3}
````

Select only some keys from object
```javascript
var input = {x:1,y:2,z:3};
var output = shiva.transform(input,{only:["y","z"]}); // output is {y:2,z:3}
````

Select some keys and rename
```javascript
 var input = {x:1,y:2,z:3};
 var output = shiva.transform(input,{only:["y"],rename:{y:"b"} }); //output is  {b:2}
```

Select all keys except some
```javascript
 var input = {x:1,y:2,z:3};
 var output  = shiva.transform(input,{except:["y"]});//output is  {x:1,z:3}
```

Select all keys except some and rename
```javascript
 var input = {x:1,y:2,z:3};
 var output  = shiva.transform(input,{except:["y"],rename:{x:"a",z:"c"} });//output is  {b:1,c:3}
```

Add new key(s) value of which is based on other keys
```javascript         
 var input = {x:1,y:2,z:3};
 var output = shiva.transform(input,{only:[],
            methods:{sum:function(input){ 
                            var sum = input.x + input.y + input.z;
                            var avg = sum/3.0;
                            return {sum:sum,avg:avg}
           } 
                        }
    });
  //output is {sum:6,avg:2}
```


If the input object is an array of objects, then the transformation is applied to all the objects
```javascript
  var comments = [{id:"1",postText:"hello",partyId:12},{id:"2",postText:"hello2",partyId:2}]
  var output = shiva.transform(comments,{only:["postText","partyId"], rename:{"postText":"text",partyId:"creatorId"}});
  //output is [{id:"1", text:"hello",creatorId:12},{id:"2",text:"hello2",creatorId:2}]    
```

To transform embedded objects
```javascript
var input = {x:1,comments:[{id:"1",postText:"hello",partyId:12},{id:"2",postText:"hello2",partyId:2}]};

var output = shiva.transform(input,{only:["comments"],properties:{"comments":{
 only:["postText","partyId"], rename:{"postText":"text",partyId:"creatorId"}
}
},
transform:function(res){ return res.comments}
});
//output is {comments:[{text:'hello', creatorId:12},{text:'hello2', creatorId:12}]} 
```




Documentation
-----
shiva.transform(input,options)

input can be any object/basic data type, array. if it is an array, the mapping will be applied to each data.

options: it can be a function or a object
if it is a function then it takes the input as the argument and output is the return value of the function. If the input is an array then the function is called for each input element.

if the input is an array then the function is executed for each element of the array. and the output array is returned.

options can be an object with following options
only: array of fields to select only

except: array of fields to be excluded. At a time only one of the options "only" or "except" should be used

rename: object of key value pair, with key as current name, property as new name
property specific tranformation: can replace the array syntax,and methods for simple 

properties

comments:mapper, // does shiva.transform(comments,mapper)

comments:function(){}, // does manipulation on the value of comments, if comments is an array will apply on each value.   

methods: array of methods which return a key value pair which is merged into result
array: input property, output property or only property(no rename), mapper: to map each element

transform: passes the result to transform function which transforms the result(obtained after applying all options) and returns the final result

pending: 
pipes: temp(transform)
   
   

