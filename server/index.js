const express =require("express");
const app=express();
const cors=require("cors");
const pool=require("./db");
//middleware
app.use(cors());
app.use(express.json()); //req.body

//Routes//

//create a todo
app.post("/todos",async(req,res) =>{
    try{
        const{description}=req.body;
        const newTodo=
        console.log(req.body);
    }catch(err){
        console.error(err.message);
    }
})
app.listen(5000,() => {
    console.log("Server has started on port 5000");
});
