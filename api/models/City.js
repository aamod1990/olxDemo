module.exports = {
	attributes: {		
		city: {
			type: 'string',
			unique: true
		},
		state: {
			collection: 'State',
			via : 'id'
		}
	}
}