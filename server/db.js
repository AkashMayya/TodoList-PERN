const Pool =require("pg").Pool;
const pool=new Pool({
    user: "postgres",
    password:"postgres",
    host:"Localhost",
    port:5432,
    database:"perntodo"
});

module.exports=pool;
