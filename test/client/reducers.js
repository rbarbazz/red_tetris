import { expect } from 'chai';

import { playerType, msgType } from '../../src/common/enums';
import reducers from '../../src/client/reducers';
import board from '../../src/client/reducers/board';
import lobby from '../../src/client/reducers/lobby';
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


  describe('board', () => {
    const initialState = new Array(200).fill(0);

    it('should return the initial state', () => {
      expect(board(undefined, {})).to.deep.equal(initialState);
    });

    it('should return the correct state for NEXT_BOARD action', () => {
      const action = {
        type: msgType.SERVER.GAME_TICK,
        payload: {
          board: Array(200).fill(1),
        },
      };
      const expectedState = Array(200).fill(1);

      expect(board(initialState, action)).to.deep.equal(expectedState);
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

  describe('lobby', () => {
    const initialState = {
      currentStep: 'playerNameSelection',
      playerName: '',
      roomName: '',
      currentRoomList: [],
    };

    it('should return the initial state', () => {
      expect(lobby(undefined, {})).to.deep.equal(initialState);
    });

    it('should return the correct state for STORE_PLAYER_NAME action', () => {
      const action = {
        type: STORE_PLAYER_NAME,
        payload: {
          playerName: 'Bob',
        },
      };
      const expectedState = { ...initialState, playerName: action.payload.playerName };

      expect(lobby(initialState, action)).to.deep.equal(expectedState);
    });

    it('should return the correct state for CONNECT_TO_LOBBY action', () => {
      const action = { type: msgType.CLIENT.CONNECT_TO_LOBBY };
      const expectedState = { ...initialState, currentStep: 'loading' };

      expect(lobby(initialState, action)).to.deep.equal(expectedState);
    });

    it('should return the correct state for CONNECT_TO_LOBBY_SUCCESS action', () => {
      const action = {
        type: `${msgType.CLIENT.CONNECT_TO_LOBBY}_SUCCESS`,
        payload: {
          playerName: 'Bob',
        },
      };
      const expectedState = {
        ...initialState,
        playerName: action.payload.playerName,
      };

      expect(lobby(initialState, action)).to.deep.equal(expectedState);
    });

    it('should return the correct state for STORE_ROOM action', () => {
      const action = {
        type: STORE_ROOM,
        payload: {
          roomName: 'room303',
        },
      };
      const expectedState = { ...initialState, roomName: action.payload.roomName };

      expect(lobby(initialState, action)).to.deep.equal(expectedState);
    });

    it('should return the correct state for JOIN_PARTY action', () => {
      const action = { type: msgType.CLIENT.JOIN_PARTY };
      const expectedState = { ...initialState, currentStep: 'loading' };

      expect(lobby(initialState, action)).to.deep.equal(expectedState);
    });

    it('should return the correct state for JOIN_PARTY_SUCCESS action', () => {
      const action = {
        type: `${msgType.CLIENT.JOIN_PARTY}_SUCCESS`,
        payload: {
          roomName: 'room303',
          playerType: playerType.NONE,
        },
      };
      const expectedState = {
        ...initialState,
        roomName: action.payload.roomName,
      };

      expect(lobby(initialState, action)).to.deep.equal(expectedState);
    });

    it('should return the correct state for CONNECT_TO_PARTY_SUCCESS action', () => {
      const action = {
        type: `${msgType.CLIENT.CONNECT_TO_PARTY}_SUCCESS`,
        payload: {
          playerName: 'Bob',
          roomName: 'room303',
          playerType: playerType.NONE,
        },
      };
      const expectedState = {
        ...initialState,
        playerName: action.payload.playerName,
        roomName: action.payload.roomName,
      };

      expect(lobby(initialState, action)).to.deep.equal(expectedState);
    });
  });

  describe('tetris', () => {
    const initialState = {
      currentStep: 'loading',
      didGameStart: false,
      playerType: playerType.NONE,
      score: 0,
      spectrums: Array(7).fill([...Array(125).fill(0), ...Array(75).fill(1)]),
    };

    it('should return the initial state', () => {
      expect(tetris(undefined, {})).to.deep.equal(initialState);
    });

    it('should return the correct state for DISPLAY_LOBBY action', () => {
      const action = { type: DISPLAY_LOBBY };
      const expectedState = { ...initialState, currentStep: 'lobby' };

      expect(tetris(initialState, action)).to.deep.equal(expectedState);
    });

    it('should return the correct state for JOIN_PARTY_SUCCESS action', () => {
      const action = {
        type: `${msgType.CLIENT.JOIN_PARTY}_SUCCESS`,
        payload: {
          roomName: 'room303',
          playerType: playerType.NONE,
        },
      };
      const expectedState = {
        ...initialState,
        currentStep: 'game',
        playerType: action.payload.playerType,
      };

      expect(tetris(initialState, action)).to.deep.equal(expectedState);
    });

    it('should return the correct state for CONNECT_TO_PARTY_SUCCESS action', () => {
      const action = {
        type: `${msgType.CLIENT.CONNECT_TO_PARTY}_SUCCESS`,
        payload: {
          playerName: 'Bob',
          roomName: 'room303',
          playerType: playerType.NONE,
        },
      };
      const expectedState = {
        ...initialState,
        currentStep: 'game',
        playerType: action.payload.playerType,
      };

      expect(tetris(initialState, action)).to.deep.equal(expectedState);
    });

    it('should return the correct state for START_PARTY_SUCCESS action', () => {
      const action = { type: `${msgType.CLIENT.START_PARTY}_SUCCESS` };
      const expectedState = { ...initialState, didGameStart: true };

      expect(tetris(initialState, action)).to.deep.equal(expectedState);
    });
  });
});
