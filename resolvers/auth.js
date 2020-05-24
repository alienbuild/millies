const { gql } = require('apollo-server-express');

const me = () => 'LK';

module.exports = {
    Query: {
        me
    }
};

