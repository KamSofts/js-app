const app = require('./server');
const authRoute = require('./routers/authRoute');

// app.use('/api/test', (req, res)=>{
//     return res.status(200).json({
//         message: "success"
//     });
// });


app.use('/api/auth', authRoute);
