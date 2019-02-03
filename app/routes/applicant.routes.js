module.exports = (app) => {
	const applicants = require('../controllers/applicant.controller.js');

	// Create a new Applicant
	app.post('/applicants', applicants.create);

	// Retreive all Applicants
	app.get('/applicants', notes.findAll);

	// Retrieve a single Applicant with applicantId
	app.get('/applicants/:applicantId', applicants.findOne);

	// Update an Applicant with applicantId
	app.put('/applicants/:applicantId', applicants.update);

	// Delete an Applicant with applicantId
	app.delete('/applicants/:applicantId', applicants.delete);
}
