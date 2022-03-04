const express = require("express");
const {
	registerAdmin,
	getAllUsers,
	loginAdmin,
	addUser,
	DeleteUser,
	logout,
} = require("../controllers/adminController");
const Admin = require("../models/adminModel");
const router = express.Router();
const jwt = require("jsonwebtoken");
const isAuthenticated = async (req, res, next) => {
	try {
		const { token } = req.cookies;
		if (!token) {
			return res
				.status(401)
				.json({ success: false, message: "Please login to access this page" });
		} else {
			const decodedData = jwt.verify(token, process.env.JWT_SECRET);
			req.user = await Admin.findById(decodedData.id);
			next();
		}
	} catch (err) {
		res.status(401).json({ success: false, message: err.message });
	}
};

router.route("/register").post(registerAdmin);
router.route("/logout").post(isAuthenticated, logout);
router.route("/login").post(loginAdmin);
router.route("/users").get(isAuthenticated, getAllUsers);
router.route("/add/user").post(isAuthenticated, addUser);
router.route("/delete/user/:id").delete(isAuthenticated, DeleteUser);

module.exports = router;
