const Hapi = require('@hapi/hapi');
const handlers = require('./handlers');
const routes = require('./constants/routes.json');

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
  });

  routes.forEach((route) => {
    server.route({
      method: route.method,
      path: route.path,
      handler: handlers[route.handler],
    });
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);

  server.events.on('response', (request) => {
    console.log(
      `${request.method.toUpperCase()} ${request.url.pathname} --> ${request.response.statusCode} `
    );
  });
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
