const User = require("../models/userModel");
const Admin = require("../models/adminModel");
const sendToken = require("../utils/jwtToken");
//register Admin
exports.registerAdmin = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const find = await Admin.findOne({ email });
		if (find) {
			res.status(401).json({ success: false, message: "User already exists" });
			return;
		} else {
			const user = await Admin.create({
				email,
				password,
			});
			sendToken(user, 201, res);
		}
	} catch (err) {
		res.status(401).json({ success: false, message: err.message });
	}
};

//Logout user
exports.logout = async (req, res, next) => {
	res.cookie("token", null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});

	res.status(200).json({ success: true, message: "logged out successfully" });
};

//get all users
exports.getAllUsers = async (req, res, next) => {
	const user = await User.find();

	res.status(200).json({ success: true, user });
};

//Log in as admin
exports.loginAdmin = async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res
			.status(401)
			.json({ success: false, message: "Please fill all the fields" });
	}
	const user = await Admin.findOne({ email });
	const isMatch = await user.comparePassword(password);

	if (!isMatch) {
		res.status(400).json({
			success: false,
			message: "Either Email or password is incorrect",
		});
	} else {
		sendToken(user, 200, res);
	}
};

//add user
exports.addUser = async (req, res, next) => {
	try {
		const { email, username, mobile, address } = req.body;

		const user = await User.create({ username, mobile, email, address });

		res.status(201).json({ success: true, message: "User Added Successfully" });
	} catch (err) {
		res.status(401).json({ success: false, message: err.message });
	}
};

//Deleting a user

exports.DeleteUser = async (req, res, next) => {
	try {
		const user = await User.findOneAndDelete(req.params.id);
		res
			.status(200)
			.json({ success: true, message: "User Deleted Successfully" });
	} catch (err) {
		res.status(401).json({ success: false, message: "Error deleting details" });
	}
};
