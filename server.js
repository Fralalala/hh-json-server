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
const axios = require("axios");
const hsl = require("hsl-to-hex");

server.use(cors());
server.use(express.json());
server.use(middlewares);
server.use(router);

server.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

const hslHelper = (value) => {
  return hsl(value, 100, 50);
};

server.listen(port, async () => {
  console.log("port ran");

  try {
    const apiCalls = [];

    // delete db
    await axios.delete("http://localhost:3000/api/colors");

    for (let index = 1; index <= 100; index++) {
      const hue = Math.floor(index * 3.4);

      apiCalls.push(
        axios.post("https://hh-json-server.herokuapp.com/colors", {
          hue,
          saturation: 100,
          light: 50,
          hex: hslHelper(hue),
        })
      );
    }

    await Promise.all(apiCalls);

    console.log("Success");
  } catch (error) {
    console.error("Failed to generate color data", error);
  }
});
