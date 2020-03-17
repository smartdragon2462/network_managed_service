var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var uniqid = require('uniqid');
const models = require("../models");
const Story_image = models.story_image;

exports.post = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            res.status(500).send({ error: err.message })
            return;
        }
        var filename;
        if (fields.story != undefined) {
            filename = uniqid();
            post = JSON.parse(fields.story);
            var data = post.replace(/^data:image\/\w+;base64,/, "");
            var buf = Buffer.from(data, 'base64');
            var newpath = path.join(appRoot, '/public/story/', filename + '.' + 'png')
            fs.writeFile(newpath, buf, function (err) {
                console.log("The file was saved!");
            });
            var thumbname = filename + '.' + 'png'

            let story = Story_image.create({
                path: thumbname,
                userId: fields.userId
            });
            if (!story) {
                throw new Error("something went wrong");
            }
            res.status(200).send({ id: story.id });
        }
    });
}

exports.get = async function (req, res) {
    try {
        let stories;
        if (req.query.userId) {
            stories = await Story_image.findAll({
                where: { userId: req.query.userId }
            });
            if (stories) {
                return res.send({ stories });
            } else {
                throw new Error("Something went wrong");
            }
        }
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
}

exports.delete = async function (req, res, next) {
    try {
        const success = Story_image.destroy({ where: {story_id: req.body.storyId} });
        if (success) {
            res.status(200).send({ success: true })
        } else {
            res.status(400).send();
        }
    } catch (err) {
        res.status(500).send({error: err.message})
    }
}

