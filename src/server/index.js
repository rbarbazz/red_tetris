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
          payload: {
            board: [...new Array(75).fill(0), ...new Array(125).fill().map(() => Math.round(Math.random() * 1))],
          },
        });
      } else if (action.type === 'SUBMIT_PLAYER_NAME') {
        socket.emit('action', {
          type: 'VALIDATE_PLAYER_NAME',
          payload: {
            playerName: action.payload.playerName,
            currentRoomList: ['room1', 'room2', 'room3', 'room4', 'room5'],
          },
        });
      } else if (action.type === 'SUBMIT_ROOM') {
        socket.emit('action', {
          type: 'VALIDATE_ROOM',
          payload: {
            roomName: action.payload.roomName,
          },
        });
      } else if (action.type === 'SUBMIT_HASH_BASED_DATA') {
        socket.emit('action', {
          type: 'VALIDATE_HASH_BASED_DATA',
          payload: {
            playerName: action.payload.playerName,
            roomName: action.payload.roomName,
          },
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
