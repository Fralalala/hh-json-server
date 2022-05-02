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
    group: { type: GraphQLString },
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
          .get("http://hh-json-server.herokuapp.com/colors")
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
        group: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        return axios
          .post("http://hh-json-server.herokuapp.com/colors", {
            hue: args.hue,
            saturation: args.saturation,
            light: args.light,
            hex: args.hex,
            group: args.group,
          })
          .then((res) => res.data);
      },
    },
    deleteColor: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        return axios
          .delete("http://hh-json-server.herokuapp.com/colors" + args.id)
          .then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
