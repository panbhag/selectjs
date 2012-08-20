//posibillities

//simple object{a:1,b:3} 
//an array [1,2,3]
//an array of objects [{},{},{}]
//a nested object {{x:1,y:3},a:1,b:2}
//a nested array {a:[]}
//nested array of objects {a:[{},{},{}]}

//documentation
/*
//base object of json can be either
  1) object(key value pair)
  2) array
  3) string/number

object representation
    kv pair represntation
      [field1,field2,field3,object_represntation]
      {name:"",type:"object",format:object_representation}  //name will not be there for a base object
      {format:object_represntation}  // as type object is default
    array representation
      {type:array,:format:object_representation}
      "array"
          here format represents the format of each element of object
    string
     {type:"string",name:""}  //name is required only if the object is in a kv pair
     "string"
    number
     {type:"number",name:""}   //name is required only if the object is in a kv pair
     "number"
*/

var should = chai.should();

chai.use(function (_chai, utils) {


function abc(object_format)
{
        //var obj = utils.flag(this, 'object');
          var obj = this._obj;
        //console.log(this);
        object_tester(obj,object_format);


}

function object_tester(obj,object_format)
{
        //console.log(obj);
        var properties ;
        var object_type; // it can be object or array
        if(_.isArray(object_format))
        {
          properties = object_format;
          object_type = 'object';
        }
        else if(_.isObject(object_format))  // it is object
        {
          if(!object_format.type) object_format.type = "object" ;
          object_type = object_format.type;

          properties = object_format.properties
        }
        else// it is a string with type defined
        {
          object_type = object_format;
        }
        if(object_type == "object")
        {
         _.each(properties,function(p){
                   if( _.isString( p ) ) // just check if the property is existing
                    {
                        obj.should.have.property( p );
                        //console.log(p + " exists");

                    }
                    else  // more checks are there
                    {
                        obj.should.have.property( p.name );
                        var property_value = obj[p.name];
                        if(!p.type) p.type = "object";

                        //console.log(p.name + " is a " + p.type);

                        property_value.should.be.a(p.type);
                        if(p.type == "object" && p.format)
                        {  
                            var sec_obj =  obj[p.name];
                            var sec_obj_format = p.format
                            object_tester(sec_obj,sec_obj_format)
                        }
                        else if(p.type == "array" && p.format)
                        {
                            var sec_obj =  obj[p.name][0];
                            var sec_obj_format = p.format
                            object_tester(sec_obj,sec_obj_format)
                        
                        }
                        
                    }
                    
         })

        }
        else if(object_type == "array")   //it is an array
        {
                        if(object_format.format)
                        {
                            var sec_obj =  obj[0];
                            var sec_obj_format = object_format.format
                            object_tester(sec_obj,sec_obj_format)

                        }
        }
        else  // it is a string or a number
        {
           obj.should.be.a(object_type)

        }

}

chai.Assertion.addMethod("format",abc)
});