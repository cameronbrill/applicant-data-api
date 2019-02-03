const Applicant = require('../models/applicant.model.js');

// Create and Save a new Applicant
exports.create = (req, res) => {
	// Validate request
	if(!req.body.name) {
		return res.status(400).send({
			message: "Applicant cannot be nameless"
		});
	}
	
	res.setHeader("Access-Control-Allow-Origin", "*");

	// Create an Applicant
	const applicant = new Applicant({
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
		address: req.body.address,
		zip: req.body.zip,
		city: req.body.city,
		country: req.body.country,
		state: req.body.state,
		video_url1: req.body.video_url1,
		video_url2: req.body.video_url2,
		video_url3: req.body.video_url3,
		video_comments1: req.body.video_comments1,
		video_comments2: req.body.video_comments2,
		video_comments3: req.body.video_comments3,
		video_rating1: req.body.video_rating1,
		video_rating2: req.body.video_rating2,
		video_rating3: req.body.video_rating3,
		code: req.body.code,
		code_time: req.body.code_time,
		code_comments: req.body.code_comments,
		flagged: req.body.flagged,
		judged: req.body.judged
	});

	// Save Applicant in the database
	applicant.save()
	.then(data => {
		res.send(data);
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Some error occured while creating the Applicant."
		});
	});
};

// Retrieve and return all applicants from the database.
exports.findAll = (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	Applicant.find()
	.then(applicants => {
		res.send(applicants);
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Some error occurred while retrieving applicants."
		});
	});
};

// Find a single applicants with a noteId
exports.findOne = (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	Applicant.findById(req.params.applicantId)
	.then(applicant => {
		if(!applicant) {
			return res.status(404).send({
				message: "Applicant not found with id " + req.params.applicantId
			});
		}
		res.send(applicant);
	}).catch(err => {
		if(err.kind == 'ObjectId') {
			return res.status(404).send({
				message: "Applicant not found with id " + req.params.applicantId
			});
		}
		return res.status(500).send({
			message: "Error retrieving applicant with id " + req.params.applicantId
		});
	});
};

// Update an applicant identified by the applicantId in the request
exports.update = (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	// Validate Request
	if(!req.body.name) {
		return res.status(400).send({
			message: "Applicant cannot be nameless"
		});
	}

	// Find applicant and update it with the request body
	Applicant.findByIdAndUpdate(req.params.applicantId, {
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
		address: req.body.address,
		zip: req.body.zip,
		city: req.body.city,
		country: req.body.country,
		state: req.body.state,
		video_url1: req.body.video_url1,
		video_url2: req.body.video_url2,
		video_url3: req.body.video_url3,
		video_comments1: req.body.video_comments1,
		video_comments2: req.body.video_comments2,
		video_comments3: req.body.video_comments3,
		video_rating1: req.body.video_rating1,
		video_rating2: req.body.video_rating2,
		video_rating3: req.body.video_rating3,
		code: req.body.code,
		code_time: req.body.code_time,
		code_comments: req.body.code_comments,
		flagged: req.body.flagged,
		judged: req.body.judged
	}, {new: true})
	.then(applicant => {
		if(!applicant) {
			return res.status(404).send({
				message: "Applicant not found with id " + req.params.applicantId
			});
		}
		res.send(applicant);
	}).catch(err => {
		if(err.kind === 'ObjectId') {
			return res.status(404).send({
				message: "Applicant not found with id " + req.params.applicantId
			});
		}
		return res.status(500).send({
			message: "Error updating applicant with id " + req.params.applicantId
		});
	});
};

// Delete an applicant with the specified applicantId in the request
exports.delete = (req, res) => {
	Applicant.findByIdAndRemove(req.params.applicantId)
	.then(applicant => {
		if(!applicant) {
			return res.status(404).send({
				message: "Applicant not found with id " + req.params.applicantId
			});
		}
		res.send({message: "Applicant deleted successfully!"});
	}).catch(err => {
		if(err.kind === 'ObjectId' || err.name === 'NotFound') {
			return res.status(404).send({
				message: "Applicant not found with id " + req.params.applicantId
			});
		}
		return res.status(500).send({
			message: "Could not delete applicant with id " + req.params.applicantId
		});
	});
};
