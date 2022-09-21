exports.get404 = async (req, res, next) => {
    res.status(404).json([]);
}