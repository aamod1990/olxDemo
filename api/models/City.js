module.exports = {
	attributes: {
		stateid: {
			type: 'string',
			required: true,
		},
		city: {
			type: 'string',
			required: true,
			unique: true
		}
	}
}