import { expect } from 'chai';
import { describe, it } from 'mocha';

import * as boardActions from '../src/client/actions/board';
import * as lobbyActions from '../src/client/actions/lobby';
import * as serverActions from '../src/client/actions/server';
import * as tetrisActions from '../src/client/actions/tetris';


describe('Redux', () => {
  describe('Actions', () => {
    describe('board', () => {
      it('should call moveTetrimino and return the correct input', () => {
        const key = 'ArrowRight';
        const event = 'keydown';
        const expectedAction = {
          type: boardActions.MOVE_TETRIMINO,
          payload: { key, event },
        };

        expect(boardActions.moveTetrimino(key, event)).to.eql(expectedAction);
      });
    });


    describe('lobby', () => {
      it('should call handlePlayerNameSelection and return the correct input', () => {
        const playerName = 'Bob';
        const expectedAction = {
          type: lobbyActions.STORE_PLAYER_NAME,
          payload: { playerName },
        };

        expect(lobbyActions.handlePlayerNameSelection(playerName)).to.eql(expectedAction);
      });

      it('should call submitPlayerName and return the correct input', () => {
        const playerName = 'Bob';
        const expectedAction = {
          type: lobbyActions.SUBMIT_PLAYER_NAME,
          payload: { playerName },
        };

        expect(lobbyActions.submitPlayerName(playerName)).to.eql(expectedAction);
      });

      it('should call handleroomNameSelection and return the correct input', () => {
        const roomName = 'room303';
        const expectedAction = {
          type: lobbyActions.STORE_ROOM,
          payload: { roomName },
        };

        expect(lobbyActions.handleroomNameSelection(roomName)).to.eql(expectedAction);
      });

      it('should call submitRoomName and return the correct input', () => {
        const roomName = 'room303';
        const expectedAction = {
          type: lobbyActions.SUBMIT_ROOM,
          payload: { roomName },
        };

        expect(lobbyActions.submitRoomName(roomName)).to.eql(expectedAction);
      });
    });


    describe('server', () => {
      it('should call ping and return the correct output', () => {
        const expectedAction = {
          type: serverActions.CLIENT_PING,
        };

        expect(serverActions.default()).to.eql(expectedAction);
      });
    });


    describe('tetris', () => {
      it('should call displayLobby and return the correct output', () => {
        const expectedAction = {
          type: tetrisActions.DISPLAY_LOBBY,
        };

        expect(tetrisActions.displayLobby()).to.eql(expectedAction);
      });

      it('should call submitHashBasedData and return the correct output', () => {
        const playerName = 'Bob';
        const roomName = 'room303';
        const expectedAction = {
          type: tetrisActions.SUBMIT_HASH_BASED_DATA,
          payload: { playerName, roomName },
        };

        expect(tetrisActions.submitHashBasedData(playerName, roomName)).to.eql(expectedAction);
      });

      it('should call ownerIsReady and return the correct output', () => {
        const expectedAction = {
          type: tetrisActions.OWNER_IS_READY,
        };

        expect(tetrisActions.ownerIsReady()).to.eql(expectedAction);
      });
    });
  });
});
