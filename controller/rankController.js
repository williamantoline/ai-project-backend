const model = require("../models/index");
const User = model.users;

const getLeaderBoards = async (req, res) => {
    try {
        const topTen = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['score', 'DESC']],
            limit:10,
        })

        return res.status(200).json({
            data: topTen,
        });

    } catch (err) {
        return res.status(500).json({
            err: err,
        });
        return res.status(500).end();
    }
}

module.exports = { getLeaderBoards };