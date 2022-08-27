const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();

app.use(
	'graphql',
	graphqlHTTP({
		schema,
		graphi: true,
	})
);

app.listen(4000, () => {
	console.log('listening to requests on port 4000');
});
