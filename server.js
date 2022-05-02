const data = require("./db.json");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const jsonServer = require("json-server");
const schema = require("./schema.js");
const server = jsonServer.create();
const router = jsonServer.router(data);
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;
const cors = require("cors");
const { default: axios } = require("axios");

server.use(cors());
server.use(express.json());
server.use(middlewares);
server.use(router);

server.delete("/colors", async (req, res) => {
  try {
    const { ids } = req.body;

    let url = "https://hh-json-server.herokuapp.com/colors";

    const apiCalls = [];

    ids.forEach((id) => {
      apiCalls.push(axios.delete(url + id));
    });

    await Promise.all(apiCalls);

    res.send(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

server.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

server.listen(port, () => {
  console.log("port ran");
});
