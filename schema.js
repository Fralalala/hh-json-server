const axios = require("axios");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

// Customer Type
const CustomerType = new GraphQLObjectType({
  name: "Color",
  fields: () => ({
    id: { type: GraphQLString },
    hue: { type: GraphQLInt },
    saturation: { type: GraphQLInt },
    light: { type: GraphQLInt },
    hex: { type: GraphQLString },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    colors: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args) {
        return axios
          .get("http://localhost:4000/api/colors")
          .then((res) => res.data);
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addColor: {
      type: CustomerType,
      args: {
        hue: { type: new GraphQLNonNull(GraphQLInt) },
        saturation: { type: new GraphQLNonNull(GraphQLInt) },
        light: { type: new GraphQLNonNull(GraphQLInt) },
        hex: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        return axios
          .post("http://localhost:4000/api/colors", {
            hue: args.hue,
            saturation: args.saturation,
            light: args.light,
            hex: args.hex,
          })
          .then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
