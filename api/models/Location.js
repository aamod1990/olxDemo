module.exports = {
	attributes: {		
		location : {
			type: 'string',
			unique: true
		},
		city: {
			collection: 'City',
			via : 'id'
		},
		state: {
			collection: 'State',
			via : 'id'
		}
	}
}