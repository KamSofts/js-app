const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// set config AT FIRST COMMIT
// path: path.join(__dirname.replace('server',''),'secret.env')
dotenv.config({
    path: path.join(__dirname.replace('src', ''), 'secret.env') // for git example.env
});
const PORT = process.env.PORT || 3000;
const DEBUG_MODE = (process.env.DEBUG ? 'Developer' : 'Production');

// start server
const app = express();

//middlewares
app.use(express.static(path.join(process.cwd(), "public")));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.listen(PORT, (error) => {
    console.log(`Server is running as ${DEBUG_MODE} mode...! Port is ${PORT}.`);
});

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: "Internal Server Error" });
});

// export module
module.exports = app;