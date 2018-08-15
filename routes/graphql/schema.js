const express = require('express');

const router = express.Router();
// const { makeExecutableSchema } = require('graphql-tools');

const schema = require('./types');
const query = require('./query');
const mutation = require('./mutations');

router.schema = {
  typeDefs: schema,
  resolvers: { ...query, ...mutation }
};

module.exports = router;
