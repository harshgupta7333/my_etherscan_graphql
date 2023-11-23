const { ApolloServer } = require("apollo-server"); 
// Import ApolloServer from apollo-server

const { importSchema } = require("graphql-import");
// Import importSchema method to load GraphQL schemas

const EtherDataSource = require("./datasource/ethDatasource");
// Import custom EtherDataSource 

const typeDefs = importSchema("./schema.graphql"); 
// Load schema from schema.graphql file

require("dotenv").config(); 
// Load environment variables from .env file 

const resolvers = {
  Query: {
    // Resolvers map for Query

    etherBalanceByAddress: (root, _args, { dataSources }) =>  
      dataSources.ethDataSource.etherBalanceByAddress(),
      // Get ether balance for an address

    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),  
      // Get total ether supply

    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),
      // Get latest ETH price

    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
      // Get average block confirmation time
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), 
    // Instance of EtherDataSource
  }), 
});

server.timeout = 0; 

server.listen("9000").then(({ url }) => {   // Start the server
  console.log(`🚀 Server ready at ${url}`);
});