//maps the input according to options
//input can be any object/basic data type, array. if it is an array, the mapping will be applied to each data.
//options: it can be a function or a mapper
// if it is a function then it takes the input and output is the return value of the function.
// if the input is an array then the function is executed for each element of the array. and the output array is returned.

// options can be an object with following options
// only: array of fields to select only
// except: array of fields to be excluded. At a time only one of the options "only" or "except" should be used
// rename: object of key value pair, with key as current name, property as new name
//property specific tranformation: can replace the array syntax,and methods for simple properties
//   comments:mapper, // does mapData(comments,mapper)
//   comments:function(){}, // does manipulation on the value of comments, if comments is an array will apply on each value.   
// methods: array of methods which return a key value pair which is merged into result
// array: input property, output property or only property(no rename), mapper: to map each element

//transform: passes the result to transform function which transforms the result(obtained after applying all options) and returns the final result
//pending: 
//pipes: temp(transform)
//   
//  

var shiva = {};

 
shiva.transform = function(input,options)
{
      if(_.isArray(input))
      {
          var oArray = []
          _.each(input,function(i){
             var o = shiva.transform(i,options);
             oArray.push(o);
          })
          return oArray;
      }
      
      //////////////if input is not an array
      
      
      
      if(_.isFunction(options))
      {
           var o = options(input);
         
           return o;
      
      }

      var  result = {};
      var attributeNames = _.keys(input);

      //only except
      var only,except;
      if ( only = options.only) {
        attributeNames = _.intersection(_.toArray(only), attributeNames);
      } else if (except = options.except) {
        attributeNames = _.difference(attributeNames, _.toArray(except));
      }
      
      
      _.each(attributeNames,function(attr){
      
        result[attr] = input[attr];
      
      } );
      
      
      //rename fields
      var rename;
      if( rename = options.rename)
      {
            _.each(rename,function(v,k){
                    var temp = result[k];
                    if (delete result[k])
                    { result[v] = temp; }
            });
      }
      
      //modify the arrays
      //{inputProperty:"",outputProperty:"",mapper:{}}  mapper is the standard mapData format
      //{property:"",mapper:""}
      //assumption: there is an array with the property name as property/inputProperty.
      //we loop through each element of the array and map it through the mapper
      var array;
      if(array = options.array)
      {
        var arrayResult = {};
        _.each(array,function(a){
          
          if(!a.inputProperty)
          {
            a.inputProperty = a.property;
            a.outputProperty = a.property;
          }
              
          var inputArray = input[a.inputProperty];
          var mapper = a.mapper;
          var outputArray = [];
          //loop the
          _.each(inputArray,function(ia){
               var oa = shiva.transform(ia,mapper);
                 
               outputArray.push(oa);
          
          });    
          
          arrayResult[a.outputProperty] = outputArray
           
        
        });
      
        _.extend(result,arrayResult);
      }
      
      var properties;// key value pair, value can be object(mapper)/ function
      if(properties = options.properties)
      {
      
        _.each(properties,function(v,k ){  
        
            if(_.isFunction(v))  //when value is a simple value integer/string
            {
            
                var prop_value = v(input[k]);
                var prop_result = {};
                prop_result[k] = prop_value;
                
                 _.extend(result,prop_result);    
            }
            else if(_.isObject(v) ) //when value is also an object/array
            {
               var prop_value = shiva.transform(input[k],v);
               var prop_result = {};
               prop_result[k] = prop_value;
     
                _.extend(result,prop_result);             
            }
        
        });
      
      }
      
      //methods
      var methods;
      if (methods = options.methods) {

        _.each(methods,function(v,k)
       {
          var method_result = v(input);
          _.extend(result,method_result);  
       }); 
      }
      
      //transform
      var transform
      if(transform = options.transform)
      {
         result = transform(result);
      }

  
    return result;


}
