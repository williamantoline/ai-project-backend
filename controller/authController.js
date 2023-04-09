const model = require("../models/index");
const bycrpt = require("bcrypt");

const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const saltRounds = 10;
        bycrpt.hash(password,saltRounds, async (err, password) => {
            if(err) {
                return res.send("Gagal melakukan registrasi!").status(400);
            }
            if(password) {
                await model.users.create({name, email, password});
                return res.send("Berhasil melakukan registrasi!").status(200);
            }
        });
    } catch (err) {
        return res.status(500).end();
    }
}

const login = async (req, res) => {
    // 
}

module.exports = { register }