# Red Tetris
> Everyone knows the Tetris Game and everyone knows Javascript, it only remains to build a Tetris in Javascript.

Red Tetris is part of the web branch at 42 Paris. This project is an online multiplayer full stack Javascript Tetris game. It follows the official Tetris guidelines.

The front end was written using React and Redux. It had to be implemented in functional programming. On the other hand, the Node JS back end uses OOP.
The client and the server communicate through a websocket (Socket.io).

![gif](demo.gif)

#### Features:
- Solo/Multiplayer game
- Lobby and room system
- Spectator mode
- Spectrums
- Code coverage over 70%
- Connection with a hash-based url, ex: ```http://localhost:8080/#roomname[username]```

## Usage:
### Dev:
Client:
```
npm run client-dev
```

Server:
```
npm run srv-dev
```
Then access ```http://localhost:8080/``` in your browser.

### Prod:
Change the url in ```src/params.js```.

Build:
```
npm run build
```

Start:
```
npm start
```
Then access the url you have chosen in your browser.
