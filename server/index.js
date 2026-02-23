const app = require('./server');

app.use('/api/auth', (req, res)=>{
    return res.status(200).json({
        message: "success"
    });
});

console.log(process.env.PORT);
