const express = require('express');
const app = express();
const portNumber = 3010;

const url = 'localhost:27017/test'; // Connection URL
const db = require('monk')(url);

const collection = db.get('document')


app.get('/', (req, res) => {
	collection.insert([{a: 1}, {a: 2}, {a: 3}])
	  .then((docs) => {
	    // docs contains the documents inserted with added **_id** fields
	    // Inserted 3 documents into the document collection
            console.log("Documents are being inserted")
	  }).catch((err) => {
	    // An error happened while inserting
	  }).then(() => db.close())

	console.log('Initiating end\n')
	res.end('end\n')
});

app.get('/findAll', (req, res) => {
	collection.find({})
	.then( (docs) => {
		console.log('docs: '+ docs)
	})
	.then( () => db.close())
	console.log('Initiating end of test 1\n')
	res.end('end of test 1 \n')
});

app.get('/findOne', (req, res) => {
	collection.findOne({'a': 1})
	.then( (docs) => {
		console.log('docs: '+docs)
	})
	.then( () => db.close())
	console.log('Initiating end of test 2\n')
	res.end('end of test 2 \n')
});



app.listen(portNumber, function(){
	console.log("The monk app is listening on port ", portNumber);
});


