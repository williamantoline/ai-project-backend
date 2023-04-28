const model = require("../models/index");
const User = model.users;

const getLeaderBoards = async (req, res) => {
    try {
        await User.update({ isMe : false }, { where : { isMe : true } });

        if(req.user) {
            await User.update({ isMe : true }, { where : { id : req.user.id } })
        }
        
        const topTen = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['score', 'DESC']],
            limit:10,
        })

        return res.status(200).json({
            data: topTen,
        });

    } catch (err) {
        return res.status(500).end();
    }
}

module.exports = { getLeaderBoards };