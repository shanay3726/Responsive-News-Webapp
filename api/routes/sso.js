const express=require('express');
const cors = require("cors");
const router=express.Router();
const app=express();
const jwt = require("jsonwebtoken");

app.get('/sso', (req, res) => {

    const now = Math.round(Date.now() / 1000); // now in seconds
    const payload = {
       sub: 1, // normally you'd get the user ID from your own cookies or bearer token.
       email: 'shanay3726@gmail.com',
       name: 'Shanay', 
       picture: '',
       exp: now + (60 * 5), // expires 5 minutes from now
       iat: now
    };
    const secret = 'this-is-your-secret-from-the-dashboard';
    const token = jwt.sign(payload, secret, { algorithm: 'HS256'});

    res.send(token);
});