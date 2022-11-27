const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const secret_key = "slkdjfslkdfhskj23ifslk9jfjsdlksjdklfhs"
app.get("/", (req, resp) => {
    resp.json({
        message: 'a sample api response message'

    })
})

app.post("/signin", (req, resp) => {
    const user = {
        id: 1,
        username: "user1",
        email: "user1@gmail"
    }
    jwt.sign({ user }, secret_key, { expiresIn: '300s' }, (err, token) => {
        resp.json(
            {
                token: token
            }
        )

    })
})
app.post("/profile",verifyToken,(req,resp)=>{
    jwt.verify(req.token,secret_key,(error,auth_data)=>{
            if(error){
              resp.send({
                result:"invalid token"
              })  
            }else{
                resp.json({
                    message:"welcome to your profile",
                    auth_data
                })
            }

    })

})
function verifyToken(req,resp,next){
    const bearerHeadertoken = req.headers['authorization'];
    if(typeof bearerHeadertoken !=='undefined')
    {
       const bearer = bearerHeadertoken.split(" ");
       const token = bearer[1];
       req.token= token;
       next();

    }else{
       resp.send({
           result:'unvalid token'
       })
    }

}
app.listen(5000, () => {
    console.log("app is running ")
}
)