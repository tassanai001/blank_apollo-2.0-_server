const { gql } = require('apollo-server');

const typeDefs = gql`
  scalar DateTime
  
  # Comments in GraphQL are defined with the hash (#) symbol.
  type Book {
    title: String
    author: String
  }

  type AppUser {
    _id: String
    firstname: String
    lastname: String
    email: String
    password: String
    idnumber: String
    nurseidnumber: String
    created: DateTime
    updated: DateTime
  }

  type TokenAppUser {
    _id: String
    firstname: String
    lastname: String
    email: String
    idnumber: String
    nurseidnumber: String
    jwt: String
  }

  # The "Query" type is the root of all GraphQL queries.
  type Query {
    currentUser: [AppUser]
    getMe: AppUser
  }

  # (A "Mutation" type will be covered later on.)
  type Mutation {
    login(email: String!, password: String!): TokenAppUser
    signup(
      firstname: String!,
      lastname: String!,
      email: String!,
      idnumber: String!,
      nurseidnumber: String!,
      password: String!): TokenAppUser
  }
`;

module.exports = typeDefs;
