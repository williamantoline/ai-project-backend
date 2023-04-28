const model = require("../models/index");
const User = model.users;

const updateScore = async (req, res) => {
    try {
        const { result } = req.body;
        if(result == 1) point = 2;
        else if (result == 0) point = 1;
        else point = 0;
        if(req.user) {
            await User.increment('score', { by: point, where: { id : req.user.id } });
            const user = await User.findAll({
                where : {
                    id: req.user.id
                },
                attributes: { exclude: ['password'] },
            });
            return res.status(200).json({
                data: user,
            });
        }
        return res.status(200).json({
            message: "Need login to update score",
        })
    } catch (err) {
        return res.status(500).end();
    }
}

module.exports = { updateScore };