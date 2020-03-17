const models = require("../../models");
const User = models.user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../../config/jwtConfig");

exports.post = async function (req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(500).send("Email or password is missing");
    }

    try {
        const dbUser = await User.findOne({ where: { email } });
        let correctCredentials = await bcrypt.compare(password, dbUser.password);
        if (correctCredentials) {
            return res.send({
                data: jwt.sign(
                    {
                        exp: Math.floor(Date.now() / 1000) + 60 * 60,
                        id: dbUser.id,
                        email: dbUser.email,
                        role: dbUser.role
                    },
                    jwtConfig.secretOrKey
                ),
                id: dbUser.id,
                email: dbUser.email,
                firstName: dbUser.firstName,
                lastName: dbUser.lastName,
                role: dbUser.role,
                accessRole: dbUser.accessRole,
                createdAt: dbUser.createdAt,
                avatar: dbUser.avatar
            });
        } else {
            return res.send({result: false})
        }
    } catch (e) {
        return res.status(500).send({ error: "Wrong email or password entered" });
    }
}
