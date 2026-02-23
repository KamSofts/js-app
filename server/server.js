const dotenv = require('dotenv');
const path = require('path');
const express = require('express');

// set config AT FIRST COMMIT
// path: path.join(__dirname.replace('server',''),'secret.env')
dotenv.config({
    path: path.join(__dirname,'secret.env') // for git example.env
});
const PORT = process.env.PORT || 3000;

// start server
const app = express();
app.listen(PORT, (error) => {
    console.log(`Server is running...! Port is ${PORT}`);
});

// server properties
app.use(express.json());

// export module
module.exports = app;