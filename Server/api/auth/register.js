const models = require("../../models");
const User = models.user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../../config/jwtConfig");

async function authenticate(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Email or password is missing");
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
                        name: dbUser.name,
                        role: dbUser.role
                    },
                    jwtConfig.secretOrKey
                )
            });
        }

        throw new Error("invalid password");
    } catch (e) {
        return res.status(500).send({ error: "Wrong email or password entered" });
    }
};

exports.post = async function (req, res) {
    let body = req.body;

    try {
        const dbUser = await User.findOne({ where: { email: body.email } });
        if (dbUser) {
            res.status(400).send({error: 'Email is already used.'})
            return;
        }

        if (body.password !== body.confirm_password) {
            throw new Error("passwords do not match");
        }

        if (body.password.length < 4 || body.password.length > 20) {
            throw new Error("password must be between 4 and 20 characters long");
        }

        let hash = await bcrypt.hash(body.password, 10);

        let user = await User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: hash,
            role: body.role
        });

        if (!user) {
            throw new Error("something went wrong");
        }

        authenticate(req, res);
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
}
