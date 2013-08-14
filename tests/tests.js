

var should = chai.should();
//alert(1);



describe("format method",function(){
     //pending things
     // negative assertions, create from assertion class


    it("should rename simple properties",function(){
    
         var input = {x:1,y:2,z:3};
         var rename = {x:"a",y:'b',z:'c'};
         
         var r = select(input,{rename:rename});

         r.should.have.format(["a","b","c"]);
         
    
    })
    it("should select some fields",function(){
    
         var input = {x:1,y:2,z:3};
         
         var r = select(input,{only:["y","z"]});

         r.should.have.format(["y","z"]);
         
    
    })
    
    it("should select  some fields and rename them",function(){
    
         var input = {x:1,y:2,z:3};
         
         var r = select(input,{only:["y"],rename:{y:"b"} });

         r.should.have.format(["b"]);
         
    
    })
    
    
    it("should select all but some fields",function(){
    
         var input = {x:1,y:2,z:3};
         
         var r = select(input,{expect:["y"]});

         r.should.have.format(["x","z"]);
         
    
    })
    
    it("should select all but some fields and rename them",function(){
    
         var input = {x:1,y:2,z:3};
         
         var r = select(input,{except:["y"],rename:{x:"a",z:"c"} });

         r.should.have.format(["a","c"]);
         
    
    })
    
    it("should select some processed fields",function(){
    
         var input = {x:1,y:2,z:3};
         
         var r = select(input,{only:[],
            methods:{sum:function(input){ 
                            var sum = input.x + input.y + input.z;
                            var avg = sum/3.0;
                            return {sum:sum,avg:avg}
           } 
                        }
                        });

         r.should.have.format(["sum","avg"]);
         
    
    });


    it("should map an base array of objects",function(){
       var comments = [{id:"1",postText:"hello",partyId:12},{id:"2",postText:"hello2",partyId:2}]
        
       var r = select(comments,{only:["postText","partyId"], rename:{"postText":"text",partyId:"creatorId"}});
       r.should.have.format({type:"array",format:["text","creatorId"] })
       
         
    
    });  //when base is an array, then the mapper should be applied on all the members.x
    
    it("should use function as a mapper for any value",function(){
    
       var input = 1;
       var output = select(input,function(i){return i+ 1});
       output.should.equal(2);
       
       input = [1,2,3];
       output = select(input,function(i){return i+1;});
       output[0].should.equal(2);
       output[1].should.equal(3);
       output[2].should.equal(4);
       
    
    })
    
    
    it("should be able to output an object with base as array");// add a temp property and then do a transform
    
    it("should transform the result",function(){
        var input = {x:1,comments:[{id:"1",postText:"hello",partyId:12},{id:"2",postText:"hello2",partyId:2}]};

        var r = select(input,{only:["comments"],properties:{"comments":{
         only:["postText","partyId"], rename:{"postText":"text",partyId:"creatorId"}
        }
        },
        transform:function(res){ return res.comments}
        });
       r.should.have.format({type:"array",format:["text","creatorId"] })
        
    
    });
    
    it("should do single property transformation",function(){
    
        var input = {x:10};
        
        var r = select(input,{properties:{x:function(v){
             return v > 5;
        }
        }})
    
        r.x.should.equal(true);
        
        
    
    });
    
    it("should do single property mapping",function(){
    
        var input = {x:10,comments:[{id:"1",postText:"hello",partyId:12},{id:"2",postText:"hello2",partyId:2}]};
        
        var r = select(input,{properties:{comments:{rename:{postText:"text",partyId:"userId"}}}})
    
        r.should.have.format(["x",{name:'comments',type:"array",format:['text','userId']}]);
        
        
    
    });
    
    
    
    

})




