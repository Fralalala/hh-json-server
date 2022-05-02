const data = require("./db.json");
const { graphqlHTTP } = require("express-graphql");
const jsonServer = require("json-server");
const schema = require("./schema.js");
const server = jsonServer.create();
const router = jsonServer.router(data);
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);

server.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

server.listen(port);
