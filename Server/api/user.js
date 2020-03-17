const models = require("../models");
const User = models.user;
const bcrypt = require("bcrypt");

exports.post = async function(req, res, next) {
    let body = req.body;
    try {
        const dbUser = await User.findOne({ where: { email: body.email } });
        if (dbUser) {
            res.status(400).send({ error: 'Email is already used.', repeat: true });
            return;
        }

        if (body.password.length < 4 || body.password.length > 20) {
            throw new Error("password must be between 4 and 20 characters");
        }

        let hash = await bcrypt.hash(body.password, 10);
        let user = await User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: hash,
            role: body.role,
        });

        if (!user) {
            throw new Error("something went wrong");
        }

        res.status(200).send({id: user.id});
    } catch(e) {
        res.status(500).send({ error: e.message })
    }
}

exports.get = async function(req, res, next) {
    try {
        let users;
        users = await User.findAll({
            where: {
                role: ["standard", "pro", "agency", "reseller"]
            }
        });
        if (users) {
            return res.send(users);
        }
    } catch(e) {

    }
}