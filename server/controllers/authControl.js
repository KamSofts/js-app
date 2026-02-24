const bcrypt = require('bcryptjs');
const db = require('../db');

const register = async (req, res) => {
    try {
        const { mail, pwd } = req.body;

        // console.log(mail, pwd);
        if (!mail || !pwd) {
            return res.status(400).json({
                message: "Username and password required...!"
            });
        }

        const sql1 = "SELECT user_id"
            + " FROM users_tbl"
            + " WHERE user_name=? LIMIT 1;";
        const [rs] = await db.query(sql1, [mail]);
        if (rs.length > 0) {
            return res.status(400).json({
                message: "Already exists...!"
            });
        }

        const sql2 = "INSERT INTO users_tbl"
            + " (user_name, user_pwd, user_img) VALUES (?,?,?);"        
        const encode_pwd = await bcrypt.hash(pwd, 12);
        img = null;
        const [pk] = await db.query(sql2, [mail, encode_pwd, img]);

        return res.status(201).json({
            message: "User details updated successfully",
            user_id: pk.insertId
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
};

module.exports = { register };