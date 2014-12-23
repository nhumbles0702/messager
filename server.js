var mongo = require('mongodb').MongoClient;
var client = require('socket.io').listen(8080).sockets;

mongo.connect('mongodb://usr:password@ds051947.mongolab.com:51947/chat', function(err, db) {
	if(err) throw err;

	client.on('connection', function(socket) {

		var col = db.collection('messages');

		// Wait for input
		socket.on('input', function(data) {
			var name = data.name;
			var message = data.message;

			col.insert({name: name, message: message}, function() {
				console.log('inserted');
			})
		});
	});
});


