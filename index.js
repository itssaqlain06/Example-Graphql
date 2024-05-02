import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'
// Types
import { typeDefs } from "./schema.js"
// DB
import DB from "./_db.js"

// Resolver
const resolvers = {
    Query: {
        games() {
            return DB.games
        },
        game(_, args) {
            return DB.games.find((game) => game.id === args.id)
        },
        authors() {
            return DB.authors
        },
        author(_, args) {
            return DB.authors.find((author) => author.id === args.id)
        },
        reviews() {
            return DB.reviews
        },
        review(_, args) { //It accpets 3 arguments parent, args, context
            return DB.reviews.find((review) => review.id === args.id)
        }
    },
    Game: {
        reviews(parent) {
            return DB.reviews.filter((rev) => rev.game_id === parent.id)
        }
    },
    Author: {
        reviews(parent) {
            return DB.reviews.filter((rev) => rev.author_id === parent.id)
        }
    },
    Review: {
        game(parent) {
            return DB.games.find((game) => game.id === parent.game_id)
        },
        author(parent) {
            return DB.authors.find((author) => author.id === parent.author_id)
        }
    },
    Mutation: {
        deleteGame(_, args) {
            return DB.games.filter((game) => game.id !== args.id)
        }
    }
}

// Server startup
const server = new ApolloServer({ //Accepts 2 arguments typeDefs and resolvers
    typeDefs,
    resolvers
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
})

console.log(`🚀  Server ready at: ${url}`);