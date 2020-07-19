const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Contact = require("../models/Contact");

router.get("/", auth, async (req, res) => {
	try {
		const contacts = await Contact.find({ user: req.user.id }).sort({
			date: -1,
		});
		res.json(contacts);
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Server Error");
	}
});

router.post(
	"/",
	[auth, [check("name", "Name is required").not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, phone, status, birthday } = req.body;

		try {
			const newContact = new Contact({
				name,
				email,
				phone,
				status,
				birthday,
				user: req.user.id,
			});

			const contact = await newContact.save();

			res.json(contact);
		} catch (error) {
			console.log(error.message);
			res.status(500).send("Server Error");
		}
	}
);

router.put("/:id", auth, async (req, res) => {
	const { name, email, phone, status, birthday } = req.body;

	//Build contact object
	const contactFields = {};
	if (name) contactFields.name = name;
	if (email) contactFields.email = email;
	if (phone) contactFields.phone = phone;
	if (status) contactFields.status = status;
	if (birthday) contactFields.birthday = birthday;

	try {
		let contact = await Contact.findById(req.params.id);

		if (!contact) return res.status(404).json({ msg: "Contact not found" });

		//Make sure user owns the contact
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "Not authorized" });
		}

		contact = await Contact.findByIdAndUpdate(
			req.params.id,
			{ $set: contactFields },
			{ new: true }
		);

		res.json(contact);
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Server Error");
	}
});

router.delete("/:id", auth, async (req, res) => {
	try {
		let contact = await Contact.findById(req.params.id);

		if (!contact) return res.status(404).json({ msg: "Contact not found" });

		//Make sure user owns the contact
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "Not authorized" });
		}

		await Contact.findByIdAndRemove(req.params.id);

		res.json({ msg: "Contact has been removed!" });
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
