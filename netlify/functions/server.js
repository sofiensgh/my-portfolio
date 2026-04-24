const server = require('../../dist/server/index.js');

exports.handler = async (event, context) => {
  try {
    // Handle the request using TanStack Start's server
    const response = await server.handler(event, context);
    return response;
  } catch (error) {
    console.error('Server error:', error);
    return {
      statusCode: 500,
      body: 'Internal Server Error'
    };
  }
};
