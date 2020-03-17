exports.get = async function (req, res) {
    try {
        if (req.user.role != 'admin' && req.user.role != 'super') {
            return res.status(401).send("Unauthorized");
        }
        res.status(200).send({ success: true });
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
}