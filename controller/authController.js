const model = require("../models/index");
const bycrpt = require("bcrypt");
const jwt = require('jsonwebtoken');

const getUser = async (email) => {
    const user = await model.users.findOne({
        where: {
            email: email,
        }
    });
    return user;
}

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const saltRounds = 10;
        bycrpt.hash(password,saltRounds, async (err, password) => {
            if(err) {
                return res.send("Gagal melakukan registrasi!").status(400);
            }
            if(password) {
                await model.users.create({name, email, password, score: 0});
                return res.send("Berhasil melakukan registrasi!").status(200);
            }
        });
    } catch (err) {
        return res.status(500).end();
    }
}

const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        let user = await getUser(email);

        if(!user) {
            return res.status(403).json({
                message: 'invalid credentials',
                error: 'invalid login',
            });
        }

        const status = await bycrpt.compare(password, user.password);
        if(!status) {
            return res.status(403).json({
                message: 'invalid credentials',
                error: 'invalid login',
            });
        }

        const token = jwt.sign(user.toJSON(), process.env.JWT_KEY, { expiresIn: "24h" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "None",
        });

        return res.json({
            token: token,
        });

    } catch(err) {
        res.status(500).end();
    }
}

const auth = async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        const user = jwt.verify(token, process.env.JWT_KEY);    
        return res.status(200).json({
            user: user,
    });

    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: "Unauthorized",
        });
    }
}

module.exports = { register, login, auth };