import { expect } from 'chai';

import reducers from '../../src/client/reducers';
import board from '../../src/client/reducers/board';
import lobby from '../../src/client/reducers/lobby';
import tetris from '../../src/client/reducers/tetris';
import server from '../../src/client/reducers/server';
import { NEXT_BOARD } from '../../src/client/actions/board';
import { SERVER_PONG } from '../../src/client/actions/server';
import {
  STORE_PLAYER_NAME,
  STORE_ROOM,
  SUBMIT_PLAYER_NAME,
  SUBMIT_ROOM,
  VALIDATE_PLAYER_NAME,
  VALIDATE_ROOM,
} from '../../src/client/actions/lobby';
import { DISPLAY_LOBBY, VALIDATE_HASH_BASED_DATA, GAME_DID_START } from '../../src/client/actions/tetris';


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
        type: NEXT_BOARD,
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
      const action = { type: SERVER_PONG };
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

    it('should return the correct state for SUBMIT_PLAYER_NAME action', () => {
      const action = { type: SUBMIT_PLAYER_NAME };
      const expectedState = { ...initialState, currentStep: 'loading' };

      expect(lobby(initialState, action)).to.deep.equal(expectedState);
    });

    it('should return the correct state for VALIDATE_PLAYER_NAME action', () => {
      const action = {
        type: VALIDATE_PLAYER_NAME,
        payload: {
          playerName: 'Bob',
          currentRoomList: ['room1', 'room2', 'room3'],
        },
      };
      const expectedState = {
        ...initialState,
        currentStep: 'roomNameSelection',
        playerName: action.payload.playerName,
        currentRoomList: action.payload.currentRoomList,
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

    it('should return the correct state for SUBMIT_ROOM action', () => {
      const action = { type: SUBMIT_ROOM };
      const expectedState = { ...initialState, currentStep: 'loading' };

      expect(lobby(initialState, action)).to.deep.equal(expectedState);
    });

    it('should return the correct state for VALIDATE_ROOM action', () => {
      const action = {
        type: VALIDATE_ROOM,
        payload: {
          roomName: 'room303',
          isRoomOwner: true,
        },
      };
      const expectedState = {
        ...initialState,
        roomName: action.payload.roomName,
      };

      expect(lobby(initialState, action)).to.deep.equal(expectedState);
    });

    it('should return the correct state for VALIDATE_HASH_BASED_DATA action', () => {
      const action = {
        type: VALIDATE_HASH_BASED_DATA,
        payload: {
          playerName: 'Bob',
          roomName: 'room303',
          isRoomOwner: true,
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
      isRoomOwner: false,
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

    it('should return the correct state for VALIDATE_ROOM action', () => {
      const action = {
        type: VALIDATE_ROOM,
        payload: {
          roomName: 'room303',
          isRoomOwner: true,
        },
      };
      const expectedState = {
        ...initialState,
        currentStep: 'game',
        isRoomOwner: action.payload.isRoomOwner,
      };

      expect(tetris(initialState, action)).to.deep.equal(expectedState);
    });

    it('should return the correct state for VALIDATE_HASH_BASED_DATA action', () => {
      const action = {
        type: VALIDATE_HASH_BASED_DATA,
        payload: {
          playerName: 'Bob',
          roomName: 'room303',
          isRoomOwner: true,
        },
      };
      const expectedState = {
        ...initialState,
        currentStep: 'game',
        isRoomOwner: action.payload.isRoomOwner,
      };

      expect(tetris(initialState, action)).to.deep.equal(expectedState);
    });

    it('should return the correct state for GAME_DID_START action', () => {
      const action = { type: GAME_DID_START };
      const expectedState = { ...initialState, didGameStart: true };

      expect(tetris(initialState, action)).to.deep.equal(expectedState);
    });
  });
});
