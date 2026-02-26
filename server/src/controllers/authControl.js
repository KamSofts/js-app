const bcrypt = require('bcryptjs');
const token = require('jsonwebtoken');
const db = require('../db');

const register = async (req, res) => {
    try {
        const { mail, pwd } = req.body;
        // console.log(mail, pwd);
        const img = (req.file ? `${req.file.filename}` : null);
        // console.log(img);        
        if (!mail || !pwd) {
            return res.status(400).json({
                message: "Username and password required...!"
            });
        }
        // verify user exists
        const sql1 = "SELECT user_id"
            + " FROM users_tbl"
            + " WHERE user_name=? LIMIT 1;";
        const [rs] = await db.query(sql1, [mail]);
        if (rs.length > 0) {
            return res.status(400).json({
                message: "Already exists...!"
            });
        }

        // add user record
        const sql2 = "INSERT INTO users_tbl"
            + " (user_name, user_pwd, user_img) VALUES (?,?,?);"
        const encode_pwd = await bcrypt.hash(pwd, 12);
        const [pk] = await db.query(sql2, [mail, encode_pwd, img]);

        return res.status(201).json({
            message: "User details updated successfully",
            user_id: pk.insertId
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { mail, pwd } = req.body;
        if (!mail || !pwd) {
            return res.status(400).json({
                message: "Username and password required...!"
            });
        }
        //check user exists             
        const sql = "SELECT * FROM users_tbl WHERE user_name=? LIMIT 1;";
        const [rs] = await db.query(sql, [mail]);
        if (rs.length > 0) {
            // check password
            const user = rs[0];
            const validUser = await bcrypt.compare(pwd, user.user_pwd);
            if (!validUser) {
                return res.status(400).json({ message: "Invalid password" });
            }
            // generate jsonwebtoken
            const user_token = token.sign({ id: user.user_id },
                process.env.TOKEN_KEY,
                { expiresIn: process.env.TOKEN_VALIDITY }
            );
            // console.log(user_token);

            const validity = Date.now() + (process.env.COOKIE_VALIDITY * process.env.SECONDS_PER_DAY * 1000);
            res.cookie("user_token", user_token, {
                httpOnly: true,
                expires: new Date(validity)
            });

            //testing
            const tt = res.cookie.user_token;
            console.log(tt);

            return res.status(200).json({ message: "Login success" });
        }

        // if conditions are false
        res.status(400).json({ message: "Username not exists" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const fetchUser = async (req, res) => {
    try {
        const user_id = req.access.id;
        if (user_id) {
            const sql = "SELECT * FROM users_tbl WHERE user_id=?;";
            const [rs] = await db.query(sql, [user_id]);
            if (rs.length > 0) {
                return res.status(200).json({
                    access: `Access granted for ${user_id}`,
                    user_data: rs[0]
                });
            }
        }

        // if conditions are false
        return res.status(401).json({ warning: "Access denied" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { register, login, fetchUser };