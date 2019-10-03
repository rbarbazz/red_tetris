import { expect } from 'chai';

import {
  GAME_TYPE,
  playerType,
  msgType,
  roomState,
} from '../../src/common/enums';
import reducers from '../../src/client/reducers';
import game from '../../src/client/reducers/game';
import tetris from '../../src/client/reducers/tetris';
import server from '../../src/client/reducers/server';
import {
  STORE_PLAYER_NAME,
  STORE_ROOM,
} from '../../src/client/actions/lobby';
import { DISPLAY_LOBBY } from '../../src/client/actions/tetris';


export default () => describe('Reducers', () => {
  describe('index', () => {
    it('should be a combined reducer', () => {
      expect(reducers).to.be.instanceOf(Function);
    });
  });

  describe('game', () => {
    const initialState = {
      board: Array(20).fill(Array(10).fill(0)),
      gameReport: [],
      nextPiece: 'O',
      score: {
        lines: 0,
        lvl: 1,
        pts: 0,
      },
      lookingAt: '',
      spectrums: [],
      startTimer: 3000,
    };

    it('should return the initial state', () => {
      expect(game(undefined, {})).to.deep.equal(initialState);
    });

    it('should return the correct state for GAME_START action', () => {
      const action = {
        type: msgType.SERVER.GAME_START,
        payload: {
          nextPiece: 'I',
          timer: 1000,
        },
      };
      const expectedState = { ...initialState, nextPiece: 'I', startTimer: 1000 };

      expect(game(initialState, action)).to.deep.equal(expectedState);
    });

    it('should return the correct state for GAME_TICK action', () => {
      const action = {
        type: msgType.SERVER.GAME_TICK,
        payload: {
          board: Array(20).fill(Array(10).fill(1)),
          nextPiece: 'O',
          score: {
            lines: 0,
            lvl: 1,
            pts: 0,
          },
          spectrums: [],
        },
      };
      const expectedState = { ...initialState, board: Array(20).fill(Array(10).fill(1)) };

      expect(game(initialState, action)).to.deep.equal(expectedState);
    });

    it('should return the correct state for GAME_TICK action', () => {
      const action = {
        type: msgType.SERVER.GAME_TICK,
        payload: {
          board: Array(20).fill(Array(10).fill(1)),
          nextPiece: 'O',
          score: {
            lines: 0,
            lvl: 1,
            pts: 0,
          },
          spectrums: [Array(20).fill(Array(10).fill(1))],
        },
      };
      const expectedState = {
        ...initialState,
        board: Array(20).fill(Array(10).fill(1)),
        spectrums: [Array(20).fill(Array(10).fill(1))],
      };

      expect(game(initialState, action)).to.deep.equal(expectedState);
    });

    it('should return the correct state for GAME_REPORT action', () => {
      const action = {
        type: msgType.SERVER.GAME_REPORT,
        payload: {
          report: [{
            name: 'raph',
            score: { lines: 0, lvl: 1, pts: 48 },
          }],
          leaderboard: [{
            name: 'raph',
            score: { lines: 0, lvl: 1, pts: 48 },
          }],
        },
      };
      const expectedState = {
        ...initialState,
        gameReport: [[{
          name: 'raph',
          score: { lines: 0, lvl: 1, pts: 48 },
        }], [{
          name: 'raph',
          score: { lines: 0, lvl: 1, pts: 48 },
        }]],
      };

      expect(game(initialState, action)).to.deep.equal(expectedState);
    });
  });

  describe('server', () => {
    const initialState = { clientInit: false };

    it('should return the initial state', () => {
      expect(server(undefined, {})).to.deep.equal(initialState);
    });

    it('should return the correct state for SERVER_PONG action', () => {
      const action = { type: msgType.PONG };
      const expectedState = { clientInit: true };

      expect(server(initialState, action)).to.deep.equal(expectedState);
    });
  });

  describe('tetris', () => {
    const initialState = {
      currentPlayerType: playerType.NONE,
      currentStep: 'loading',
      isInRoom: false,
      isLoading: false,
      message: '',
      playerList: [],
      playerName: '',
      roomList: [],
      roomName: '',
      roomGameMode: GAME_TYPE.CLASSIC,
      roomObject: undefined,
    };

    it('should return the initial state', () => {
      expect(tetris(undefined, {})).to.deep.equal(initialState);
    });

    it('should return the correct state for STORE_PLAYER_NAME action', () => {
      const action = {
        type: STORE_PLAYER_NAME,
        payload: {
          playerName: 'Bob',
        },
      };
      const expectedState = { ...initialState, playerName: action.payload.playerName };

      expect(tetris(initialState, action)).to.deep.equal(expectedState);
    });

    it('should return the correct state for CONNECT_TO_LOBBY action', () => {
      const action = { type: msgType.CLIENT.CONNECT_TO_LOBBY };
      const expectedState = { ...initialState, isLoading: true };

      expect(tetris(initialState, action)).to.deep.equal(expectedState);
    });

    it('should return the correct state for CONNECT_TO_LOBBY_SUCCESS action', () => {
      const action = { type: `${msgType.CLIENT.CONNECT_TO_LOBBY}_SUCCESS` };
      const expectedState = {
        ...initialState,
        currentStep: 'roomNameSelection',
        isInRoom: false,
        isLoading: false,
        message: '',
        roomName: '',
        roomObject: undefined,
      };

      expect(tetris(initialState, action)).to.deep.equal(expectedState);
    });

    it('should return the correct state for CONNECT_TO_LOBBY_ERROR action', () => {
      const action = {
        type: `${msgType.CLIENT.CONNECT_TO_LOBBY}_ERROR`,
        msg: 'error',
      };
      const expectedState = {
        ...initialState,
        currentStep: 'playerNameSelection',
        isLoading: false,
        message: action.msg,
      };

      expect(tetris(initialState, action)).to.deep.equal(expectedState);
    });

    it('should return the correct state for LOBBY_DATA action', () => {
      const action = {
        type: msgType.SERVER.LOBBY_DATA,
        payload: {
          players: [{
            name: 'raph',
            type: playerType.NONE,
            room: 'room303',
          }],
          rooms: [],
        },
        msg: ['nothing happened here'],
      };
      const expectedState = {
        ...initialState,
        currentPlayerType: (playerType.NONE),
        currentStep: 'roomNameSelection',
        message: action.msg[0],
        playerList: action.payload.players,
        roomList: action.payload.rooms,
        roomName: '',
        roomObject: undefined,
      };

      expect(tetris(initialState, action)).to.deep.equal(expectedState);
    });

    it('should return the correct state for LOBBY_DATA action', () => {
      const action = {
        type: msgType.SERVER.LOBBY_DATA,
        payload: {
          players: [{
            name: '',
            type: playerType.NONE,
            room: 'room303',
          }],
          rooms: [{
            name: 'room',
          }],
        },
        msg: ['nothing happened here'],
      };
      const expectedState = {
        ...initialState,
        currentPlayerType: (playerType.NONE),
        currentStep: 'roomNameSelection',
        message: action.msg[0],
        playerList: action.payload.players,
        roomList: action.payload.rooms,
        roomName: '',
        roomObject: undefined,
      };

      expect(tetris(initialState, action)).to.deep.equal(expectedState);
    });

    it('should return the correct state for LOBBY_DATA action', () => {
      const action = {
        type: msgType.SERVER.LOBBY_DATA,
        payload: {
          players: [{
            name: '',
            type: playerType.NONE,
            room: 'room303',
          }],
          rooms: [{
            name: 'room303',
            state: roomState.BUSY,
          }],
        },
        msg: ['nothing happened here'],
      };
      const expectedState = {
        ...initialState,
        currentPlayerType: (playerType.NONE),
        currentStep: 'game',
        message: action.msg[0],
        playerList: undefined,
        roomList: action.payload.rooms,
        roomName: 'room303',
        roomObject: action.payload.rooms[0],
      };

      expect(tetris(initialState, action)).to.deep.equal(expectedState);
    });

    it('should return the correct state for STORE_ROOM action', () => {
      const action = {
        type: STORE_ROOM,
        payload: {
          roomName: 'room303',
          roomGameMode: GAME_TYPE.CLASSIC,
        },
      };
      const expectedState = {
        ...initialState,
        roomName: action.payload.roomName,
        roomGameMode: action.payload.roomGameMode,
      };

      expect(tetris(initialState, action)).to.deep.equal(expectedState);
    });

    it('should return the correct state for JOIN_ROOM action', () => {
      const action = { type: msgType.CLIENT.JOIN_ROOM };
      const expectedState = { ...initialState, isLoading: true };

      expect(tetris(initialState, action)).to.deep.equal(expectedState);
    });

    it('should return the correct state for JOIN_ROOM_SUCCESS action', () => {
      const action = { type: `${msgType.CLIENT.JOIN_ROOM}_SUCCESS` };
      const expectedState = {
        ...initialState,
        currentStep: 'roomNameSelection',
        isLoading: false,
        isInRoom: true,
      };

      expect(tetris(initialState, action)).to.deep.equal(expectedState);
    });

    it('should return the correct state for JOIN_ROOM_ERROR action', () => {
      const action = {
        type: `${msgType.CLIENT.JOIN_ROOM}_ERROR`,
        msg: 'error',
      };
      const expectedState = {
        ...initialState,
        currentStep: 'roomNameSelection',
        isLoading: false,
        message: action.msg,
      };

      expect(tetris(initialState, action)).to.deep.equal(expectedState);
    });

    it('should return the correct state for LEAVE_ROOM action', () => {
      const action = { type: msgType.CLIENT.LEAVE_ROOM };
      const expectedState = { ...initialState, isLoading: true };

      expect(tetris(initialState, action)).to.deep.equal(expectedState);
    });

    it('should return the correct state for LEAVE_ROOM_SUCCESS action', () => {
      const action = { type: `${msgType.CLIENT.LEAVE_ROOM}_SUCCESS` };
      const expectedState = {
        ...initialState,
        currentPlayerType: playerType.NONE,
        currentStep: 'roomNameSelection',
        isLoading: false,
        isInRoom: false,
      };

      expect(tetris(initialState, action)).to.deep.equal(expectedState);
    });

    it('should return the correct state for CONNECT_TO_ROOM_SUCCESS action', () => {
      const action = { type: `${msgType.CLIENT.CONNECT_TO_ROOM}_SUCCESS` };
      const expectedState = {
        ...initialState,
        currentStep: 'roomNameSelection',
        isInRoom: true,
      };

      expect(tetris(initialState, action)).to.deep.equal(expectedState);
    });

    it('should return the correct state for CONNECT_TO_ROOM_ERROR action', () => {
      const action = { type: `${msgType.CLIENT.CONNECT_TO_ROOM}_ERROR`, msg: 'error' };
      const expectedState = {
        ...initialState,
        currentStep: 'playerNameSelection',
        playerName: '',
        roomName: '',
        roomObject: undefined,
        message: action.msg,
      };

      expect(tetris(initialState, action)).to.deep.equal(expectedState);
    });

    it('should return the correct state for DISPLAY_LOBBY action', () => {
      const action = { type: DISPLAY_LOBBY };
      const expectedState = { ...initialState, currentStep: 'playerNameSelection' };

      expect(tetris(initialState, action)).to.deep.equal(expectedState);
    });

    it('should return the correct state for START_PARTY action', () => {
      const action = { type: msgType.CLIENT.START_PARTY };
      const expectedState = { ...initialState, currentStep: 'loading' };

      expect(tetris(initialState, action)).to.deep.equal(expectedState);
    });

    it('should return the correct state for GAME_END action', () => {
      const action = { type: msgType.SERVER.GAME_END };
      const expectedState = { ...initialState, currentStep: 'endGame' };

      expect(tetris(initialState, action)).to.deep.equal(expectedState);
    });

    it('should return the correct state for GAME_REPORT action', () => {
      const action = { type: msgType.SERVER.GAME_REPORT };
      const expectedState = { ...initialState, currentStep: 'gameReport' };

      expect(tetris(initialState, action)).to.deep.equal(expectedState);
    });

    it('should return the correct state for RESET_ROOM action', () => {
      const action = { type: `${msgType.CLIENT.RESET_ROOM}_SUCCESS` };
      const expectedState = { ...initialState, currentStep: 'roomNameSelection' };

      expect(tetris(initialState, action)).to.deep.equal(expectedState);
    });
  });
});
