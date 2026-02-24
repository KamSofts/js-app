const dotenv = require('dotenv');
const path = require('path');
const express = require('express');

// set config AT FIRST COMMIT
// path: path.join(__dirname.replace('server',''),'secret.env')
dotenv.config({
    path: path.join(__dirname,'secret.env') // for git example.env
});
const PORT = process.env.PORT || 3000;

// start server & properties
const app = express();
app.use(express.json());
app.listen(PORT, (error) => {
    console.log(`Server is running...! Port is ${PORT}`);
});


// export module
module.exports = app;