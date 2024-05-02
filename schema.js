export const typeDefs = `#graphql
    type Game{
        id: ID!
        title: String!
        platform: [String!]!
        reviews : [Review!]
    }
    type Author{
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
    }
    type Review{
        id: ID!
        rating: Int!
        content: String!
        game: Game!
        author: Author!
    }
    type Query{
        games: [Game]
        game(id: ID!): Game
        authors: [Author]
        author(id: ID!): Author
        reviews: [Review]
        review(id: ID!): Review
    }
    type Mutation{
        deleteGame(id: ID!): [Game]
    }
`