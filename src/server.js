const Hapi = require('@hapi/hapi');
const routes = require('./routes');
 
 
const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes : {
        cors : { //ini digunakan untuk same-origin policy (host yg berbeda namun bisa nyambung)
            origin : ['*'], 
        }
    }
  });

  server.route(routes)
 
 
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
 
 
init();