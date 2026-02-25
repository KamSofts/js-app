const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const cors = require('cors');

// set config AT FIRST COMMIT
// path: path.join(__dirname.replace('server',''),'secret.env')
dotenv.config({
    path: path.join(__dirname.replace('src', ''), 'secret.env') // for git example.env
});
const PORT = process.env.PORT || 3000;
const DEBUG_MODE = (process.env.DEBUG ? 'Developer' : 'Production');

// start server & properties
const app = express();

// Security: When you move to production, remember to change 
// app.use(cors()) to app.use(cors({ origin: 'https://your-frontend-domain.com' })) to keep your API secure.
if (DEBUG_MODE) {
    app.use(cors());
} else {
    app.use(cors({ origin: 'http://localhost:5173' }));
}

app.use(express.json());
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