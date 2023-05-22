const model = require("../models/index");
const User = model.users;
const CryptoJs = require("crypto-js");

const updateScore = async (req, res) => {
    try {
        const {data} = req.body;
        const dec = CryptoJs.AES.decrypt(data, process.env.ENCKEY).toString(CryptoJs.enc.Utf8);
        if (dec === '') {
            return res.status(400).json({
                message: "invalid request",
            });
        }

        const [token, score, ts] = dec.split("--");
        await User.increment('score', { by: parseInt(score), where: { id : req.user.id } });
        return res.status(200).end();

    } catch (err) {
        console.log(err);
        return res.status(500).end();
    }
}

module.exports = { updateScore };