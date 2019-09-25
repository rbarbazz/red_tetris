import { expect } from 'chai';

import { eventType, msgType } from '../../src/common/enums';
import * as boardActions from '../../src/client/actions/board';
import * as lobbyActions from '../../src/client/actions/lobby';
import * as serverActions from '../../src/client/actions/server';
import * as tetrisActions from '../../src/client/actions/tetris';


export default () => describe('Actions', () => {
  describe('board', () => {
    it('should call sendGameInput and return the correct input', () => {
      const key = 'ArrowRight';
      const event = 'keydown';
      const expectedAction = {
        eventType: eventType.GAME,
        type: msgType.CLIENT.MOVE_TETRIMINO,
        payload: { key, event },
      };

      expect(boardActions.sendGameInput(key, event)).to.deep.equal(expectedAction);
    });
  });


  describe('lobby', () => {
    it('should call handlePlayerNameSelection and return the correct input', () => {
      const playerName = 'Bob';
      const expectedAction = {
        type: lobbyActions.STORE_PLAYER_NAME,
        payload: { playerName },
      };

      expect(lobbyActions.handlePlayerNameSelection(playerName)).to.deep.equal(expectedAction);
    });

    it('should call submitPlayerName and return the correct input', () => {
      const playerName = 'Bob';
      const expectedAction = {
        eventType: eventType.LOBBY,
        type: msgType.CLIENT.CONNECT_TO_LOBBY,
        payload: { playerName },
      };

      expect(lobbyActions.submitPlayerName(playerName)).to.deep.equal(expectedAction);
    });

    it('should call handleRoomSelection and return the correct input', () => {
      const roomName = 'room303';
      const expectedAction = {
        type: lobbyActions.STORE_ROOM,
        payload: { roomName },
      };

      expect(lobbyActions.handleRoomSelection(roomName)).to.deep.equal(expectedAction);
    });

    it('should call submitRoom and return the correct input', () => {
      const roomName = 'room303';
      const expectedAction = {
        eventType: eventType.LOBBY,
        type: msgType.CLIENT.JOIN_PARTY,
        payload: { roomName },
      };

      expect(lobbyActions.submitRoom(roomName)).to.deep.equal(expectedAction);
    });
  });


  describe('server', () => {
    it('should call ping and return the correct output', () => {
      const expectedAction = {
        eventType: eventType.LOBBY,
        type: msgType.PING,
      };

      expect(serverActions.default()).to.deep.equal(expectedAction);
    });
  });


  describe('tetris', () => {
    it('should call displayLobby and return the correct output', () => {
      const expectedAction = {
        type: tetrisActions.DISPLAY_LOBBY,
      };

      expect(tetrisActions.displayLobby()).to.deep.equal(expectedAction);
    });

    it('should call submitHashBasedData and return the correct output', () => {
      const playerName = 'Bob';
      const roomName = 'room303';
      const expectedAction = {
        eventType: eventType.LOBBY,
        type: msgType.CLIENT.CONNECT_TO_PARTY,
        payload: { playerName, roomName },
      };

      expect(tetrisActions.submitHashBasedData(playerName, roomName)).to.deep.equal(expectedAction);
    });

    it('should call ownerIsReady and return the correct output', () => {
      const expectedAction = {
        eventType: eventType.LOBBY,
        type: msgType.CLIENT.START_PARTY,
      };

      expect(tetrisActions.ownerIsReady()).to.deep.equal(expectedAction);
    });
  });
});
