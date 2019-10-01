import fs from 'fs';
import debug from 'debug';
import http from 'http';
import socketIo from 'socket.io';
import dispatchEvent from './controllers/dispatchEvent';

const logerror = debug('tetris:error');
export const loginfo = debug('tetris:info');

const initApp = (app, params, cb) => {
  const { port } = params;
  const handler = (req, res) => {
    const file = req.url === '/bundle.js' ? '/../../build/bundle.js' : '/../../index.html';
    fs.readFile(__dirname.concat(file), (err, data) => {
      if (err) {
        logerror(err);
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
      res.writeHead(200);
      res.end(data);
      return true;
    });
  };

  app.on('request', handler);

  app.listen({ port }, () => {
    loginfo(`tetris listen on ${params.url}`);
    cb();
  });
};

export function create(params) {
  const promise = new Promise((resolve) => {
    const app = http.createServer();
    initApp(app, params, () => {
      const io = socketIo(app);
      const stop = (cb) => {
        io.close();
        app.close(() => {
          app.unref();
        });
        loginfo('Engine stopped.');
        cb();
      };
      dispatchEvent(io); // Run engine
      resolve({ stop });
    });
  });
  return promise;
}
