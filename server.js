const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
require('dotenv').config();

// Import: Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const braintreeRoutes = require('./routes/braintree');
const orderRoute = require('./routes/order');

// Init app
const app = express();
const port = process.env.PORT || 5000;

// Types (query/mutation/subscription)
const typeDefs = `
    type Query {
        totalPosts: Int!
    }
`;

// Resolvers
const resolvers = {
    Query: {
        totalPosts: () => 42
    }
};

// GraphQL Server
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});

// applyMiddleware. This method connects Apollo Server to a specific HTTP framework ie: express
apolloServer.applyMiddleware({
    app
});

// Init middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(morgan('dev'));

// Server
const httpServer = http.createServer(app);

// Database
const dotenv = require('dotenv');dotenv.config();
mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('DB Connected'));
mongoose.connection.on('error', err => {  console.log(`DB connection error: ${err.message}`)});

// Define routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', braintreeRoutes);
app.use('/api', orderRoute);

// Start server
app.listen(port, () => {
    console.log(`Server is running port ${port}`);
    console.log(`GraphQL server is ready at http://localhost:${port}${apolloServer.graphqlPath}`);
});

