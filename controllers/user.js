const User = require('../models/user');

//for database alterations..!

exports.getAllUsers = async (req, res, next) => {
    try {
        let users = await User.findAll();
        res.send(users);
    } catch (error) {
        console.log(error);
    };
};

exports.postAddUser = async (req, res, next) => {
    try {
        const userName = req.body.name;
        const userEmail = req.body.email;
        const userPhone = req.body.phone;

        let result = await User.create({
            name: userName,
            email: userEmail,
            phone: userPhone
        });
        res.json(result);
    } catch (error) {
        console.log(error);
    };
};

exports.deleteUser = async (req, res, next) => {
    try {
        let userId = req.params.id;
        let user = await User.findByPk(userId);
        await user.destroy();
        console.log('User Destroyed!');
    } catch (error) {
        console.log(error);
    };
};