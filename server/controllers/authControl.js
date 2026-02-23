const register = async (req, res) => {

    // console.log(req.body);
    
    return res.status(201).json({
        message: "Success"
    });
};

module.exports = { register };