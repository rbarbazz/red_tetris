import fs  from 'fs'
import debug from 'debug'

const logerror = debug('tetris:error')
  , loginfo = debug('tetris:info')

const initApp = (app, params, cb) => {
  const {host, port} = params
  const handler = (req, res) => {
    const file = req.url === '/bundle.js' ? '/../../build/bundle.js' : '/../../index.html'
    fs.readFile(__dirname + file, (err, data) => {
      if (err) {
        logerror(err)
        res.writeHead(500)
        return res.end('Error loading index.html')
      }
      res.writeHead(200)
      res.end(data)
    })
  }

  app.on('request', handler)

  app.listen({host, port}, () =>{
    loginfo(`tetris listen on ${params.url}`)
    cb()
  })
}

const initEngine = (io) => {
  io.on('connection', (socket) => {
    loginfo(`Socket connected: ${socket.id}`);
    socket.on('action', (action) => {
      loginfo(`Action received: ${JSON.stringify(action, null, 2)}`);
      if (action.type === 'CLIENT_PING') {
        socket.emit('action', { type: 'SERVER_PONG' });
      } else if (action.type === 'MOVE_TETRIMINO' && action.payload.event === 'keydown') {
        socket.emit('action', {
          type: 'NEXT_BOARD',
          payload: { board: new Array(200).fill().map(() => Math.round(Math.random() * 7)) },
        });
      } else if (action.type === 'SUBMIT_PLAYER_NAME') {
        socket.emit('action', {
          type: 'VALIDATE_PLAYER_NAME',
          payload: { playerName: action.payload.playerName },
        });
      }
    });
  });
};

export function create(params){
  const promise = new Promise( (resolve, reject) => {
    const app = require('http').createServer()
    initApp(app, params, () =>{
      const io = require('socket.io')(app)
      const stop = (cb) => {
        io.close()
        app.close( () => {
          app.unref()
        })
        loginfo(`Engine stopped.`)
        cb()
      }

      initEngine(io)
      resolve({stop})
    })
  })
  return promise
}
