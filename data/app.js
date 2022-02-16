const express = reqire("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/students",(req,res) = {
    res.send("hello from other side.");
})

app.listen(port, ( ) = {
  console.log('connection is setup at ${port}');   
})
