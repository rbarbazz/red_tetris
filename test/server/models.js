import { expect } from 'chai';
import sinon from 'sinon';

import { tryTranslate, tryRotate } from '../../src/server/controllers/srs';
import { RandomBag, Bag } from '../../src/server/models/7bag';
import Field from '../../src/server/models/Field';
import * as Game from '../../src/server/models/Game';
import { checkName, Lobby} from '../../src/server/models/Lobby';
import { Piece } from '../../src/server/models/Piece';
import Player from '../../src/server/models/Player';
import Room from '../../src/server/models/Room';
import { Score, makeLeaderboard, resetLeaderboard } from '../../src/server/models/Score';
import { Timeline } from '../../src/server/models/Timeline';
import PRNG from '../../src/server/models/prng';

export default () => describe('Models', () => {
  describe('Prng', () => {
    it('should init the seed without params', () => {
      const data = new PRNG();
      expect(data.seed).to.gt(0);
      expect(data.seed).to.equal(data._state);
    });
    it('should init the seed with params', () => {
      const data = new PRNG(42);
      expect(data.seed).to.gt(0);
      expect(data.seed).to.equal(42);
      expect(data.seed).to.equal(data._state);
    });
    it('should return min < max', () => {
      expect(PRNG.min()).to.lt(PRNG.max());
    });
    it('should return same value for the same seed', () => {
      const data1 = new PRNG(42);
      const data2 = new PRNG(42);
      expect(data1.rand(1, 1000)).to.equal(data2.rand(1, 1000));
    });
    it('should return 0 when rand(min, max) with min >= rand', () => {
      const data1 = new PRNG(42);
      expect(data1.rand(5, 4)).to.equal(0);
    });
    it('should return a value with rand()', () => {
      const data1 = new PRNG(42);
      expect(data1.rand()).to.gte(PRNG.min());
    });
  });

  describe('Timeline', () => {
    it('should be init with an empty queue', () => {
      const data = new Timeline();
      expect(data.messages).to.deep.equal([]);
    });
    it('should return push a message', () => {
      const data = new Timeline();
      expect(data.messages.length).to.equal(0);
      data.push('ok');
      expect(data.messages.length).to.equal(1);
    });
    it('should return if there is messages', () => {
      const data = new Timeline();
      expect(data.hasMessage()).to.equal(false);
      data.push('ok');
      expect(data.hasMessage()).to.equal(true);
    });
    it('should clear the messages', () => {
      const data = new Timeline();
      data.push('ok');
      expect(data.hasMessage()).to.equal(true);
      data.clear();
      expect(data.hasMessage()).to.equal(false);
    });
  });

  describe('Score', () => {
    it('should be init', () => {
      const data = new Score();
      expect(data.lvl).to.equal(1);
      expect(data.pts).to.equal(0);
      expect(data.lines).to.equal(0);
      expect(data.last_combo).to.equal(false);
      const data1 = new Score(5);
      expect(data1.lvl).to.equal(5);
    });

    it('should return lvl from lines', () => {
      const data = new Score();
      data.lines = 0;
      expect(data.computeLvl()).to.equal(1);
      data.lines = 1;
      expect(data.computeLvl()).to.equal(2);
      data.lines = 3;
      expect(data.computeLvl()).to.equal(3);
      data.lines = 6;
      expect(data.computeLvl()).to.equal(4);
      data.lines = 10;
      expect(data.computeLvl()).to.equal(5);
      data.lines = 20;
      expect(data.computeLvl()).to.equal(6);
    });

    it('should return serialize data', () => {
      const data = new Score();
      expect(data.serialize()).to.deep.equal({
        lines: 0, lvl: 1, pts: 0,
      });
    });

    it('should return score', () => {
      const data = new Score();
      expect(data.scoreFromCombo(0, false)).to.equal(4);
      expect(data.scoreFromCombo(0, true)).to.equal(8);
      expect(data.scoreFromCombo(1, false)).to.equal(104);
      expect(data.scoreFromCombo(2, false)).to.equal(304);
      expect(data.scoreFromCombo(3, false)).to.equal(504);
      expect(data.scoreFromCombo(4, false)).to.equal(804);
      expect(data.scoreFromCombo(5, false)).to.equal(4);
      data.last_combo = true;
      expect(data.scoreFromCombo(1, false)).to.equal(155);
    });

    it('should compute scores', () => {
      const data = new Score();
      data.compute(0, false);
      expect(data.lines).to.equal(0);
      expect(data.lvl).to.equal(1);
      expect(data.pts).to.equal(4);
      expect(data.last_combo).to.equal(false);
      data.compute(1, false);
      expect(data.lines).to.equal(1);
      expect(data.lvl).to.equal(2);
      expect(data.pts).to.equal(108);
      expect(data.last_combo).to.equal(true);
    });
  });

  describe('makeLeaderBoard', () => {
    it('should return scores', () => {
      expect(resetLeaderboard()).to.equal(true);
      const report = [];
      report.push({ name: 'Bob', score: { lines: 0, lvl: 1, pts: 0 } });
      report.push({ name: 'Mike', score: { lines: 1, lvl: 2, pts: 104 } });
      const r = makeLeaderboard(report, 'CLASSIC');
      expect(r).to.not.equal(null);
    });
  });

  describe('Piece', () => {
    it('should create piece from key', () => {
      const data = new Piece(0);
      expect(data.orientation).to.equal(0);
      expect(data.id).to.equal(1);
      expect(data.tetros).to.deep.equal(['O', 1]);
      expect(data.spawn).to.deep.equal([4, 21]);
      expect(data.kicks).to.equal(null);
      expect(data.getRot(1)).to.equal(1);
      data.orientation = 2;
      expect(data.orientation).to.equal(2);
      data.rotate(1);
      expect(data.orientation).to.equal(3);
      expect(data.shape).to.deep.equal(['11', '11']);
      expect(data.shapes).to.length(4);
      const data1 = new Piece(1);
      expect(data1.kicks).to.not.equal(null);
      const data2 = new Piece(2);
      expect(data2.kicks).to.not.equal(null);
    });
  });

  describe('RandomBag', () => {
    it('should create a bag', () => {
      const data = new RandomBag();
      expect(data._bag).to.not.equal(null);
      expect(data._bag.length).equal(7);
    });
    it('should return a piece', () => {
      const data = new RandomBag();
      expect(data.piece(0)).to.not.equal(null);
      expect(data.piece(1000)).to.equal(null);
    });
  });

  describe('Bag', () => {
    it('should create a bag', () => {
      const data = new Bag();
      expect(data._bag).to.deep.equal([]);
    });
    it('should return and create pieces', () => {
      const data = new Bag();
      for (let i = 0; i < 10; ++i) {
        expect(data.piece(i)).to.not.equal(null);
      }
      expect(data._bag.length).to.equal(2);
    });
  });

  describe('Player', () => {
    sinon.stub(Room.prototype, 'removePlayer');
    const room = new Room(null, 'room', 10, null);

    it('should instanciate a player', () => {
      const fakeSocket = { id: 42 };
      const data = new Player('Bob', fakeSocket);
      expect(data.name).to.equal('Bob');
      expect(data.id).to.equal(fakeSocket.id);
      expect(data.socket).to.deep.equal(fakeSocket);
      expect(data.room).to.equal(null);
      sinon.stub(Room.prototype, 'getPlayerType').callsFake(() => 'none');
      expect(data.type).to.equal('none');
      expect(data.serialize()).to.deep.equal({ name: 'Bob', type: 'none', room: null });
      data._room = room;
      Room.prototype.getPlayerType.restore();
      sinon.stub(Room.prototype, 'getPlayerType').callsFake(() => 'master');
      expect(data.serialize()).to.deep.equal({ name: 'Bob', type: 'master', room: 'room' });
      expect(data.type).to.equal('master');
    });

    it('should join a room', () => {
      const data = new Player('Bob', null);
      sinon.stub(Room.prototype, 'addPlayer').callsFake(() => true);
      expect(data.joinRoom(room)).to.equal(true);
      Room.prototype.addPlayer.restore();
      expect(data.room).to.deep.equal(room);
      sinon.stub(Room.prototype, 'addPlayer').callsFake(() => false);
      expect(data.joinRoom(room)).to.equal(false);
    });

    it('should leave a room', () => {
      const data = new Player('Bob', null);
      data.leaveRoom();
      expect(data.room).to.equal(null);
      data._room = room;
      data.leaveRoom();
      expect(data.room).to.equal(null);
    });
    Room.prototype.removePlayer.restore();
  });

  describe('Field', () => {
    it('should instanciate a field', () => {
      const data = new Field(10, 24);
      expect(data.size).to.deep.equal({ width: 10, height: 24 });
      expect(data.pos).to.equal(null);
      expect(data._shadow).to.equal(null);
      expect(data._hardline).to.equal(0);
      expect(data._tetros).to.equal(null);
      expect(data.field).to.not.equal(null);
      expect(data.serialize().length).to.equal(20);
    });

    it('should spawn a piece', () => {
      const data = new Field(10, 24);
      expect(data.spawn(1)).to.equal(true);
      expect(data.lock()).to.equal(null);
      expect(data.spawn(1)).to.equal(false);
      data.spawn(1);
      data._pos = [0, 0];
      expect(data.lock()).to.equal(null);
      data.spawn(4);
      data._map[5].fill(1);
      data._pos = [4, 5];
      data.lock();
      data.spawn(4);
      expect(typeof data.moveLeft()).to.equal('boolean');
      expect(typeof data.moveRight()).to.equal('boolean');
      expect(typeof data.moveDown()).to.equal('boolean');
      expect(typeof data.turnRight()).to.equal('boolean');
      expect(typeof data.turnLeft()).to.equal('boolean');
      data._map[5].fill(10);
      data._pos = [4, 5];
      data.lock();
      data.breakLines([1, 2, 3]);
      expect(data.addUnbreakLines(0)).to.equal(false);
      expect(data.addUnbreakLines(1)).to.equal(true);
      expect(data.spectrum().length).to.equal(20);
      data.spawn(1);
      data.goToShadow();
    });
  });

  describe('Lobby', () => {
    it('should create a lobby', () => {
      const data = new Lobby(10);
      expect(data.slots).to.equal(10);
      expect(data.freeSlots()).to.equal(10);
      expect(data.players).to.deep.equal({});
      expect(data.rooms).to.deep.equal({});
      expect(data.serialize()).to.deep.equal({ slots: 10, players: [], rooms: [] });
    });

    it('should check name', () => {
      expect(checkName('okf')).to.equal(true);
      expect(checkName('')).to.equal(false);
      expect(checkName('sdfgdsfgsdfgsdfsdfsdfgsdfgsdfsdfg')).to.equal(false);
    });

    it('should manage player', () => {
      const data = new Lobby(1);
      const fakeSocket = { id: 42 };
      expect(data.addPlayer(fakeSocket, 'B')).to.not.equal(null);
      expect(data.addPlayer(fakeSocket, 'Bob')).to.equal(null);
      expect(data.addPlayer(fakeSocket, 'Bob')).to.not.equal(null);
      expect(data.addPlayer(fakeSocket, 'Boby')).to.not.equal(null);
      expect(data.addPlayer({ id: 13 }, 'qqq')).to.not.equal(null);
      expect(data.getPlayer(42)).to.not.equal(null);
      expect(data.deletePlayer(2)).to.equal(false);
      expect(data.deletePlayer(42)).to.equal(true);
    });

    it('should manage player', () => {
      const data = new Lobby(1);
      expect(data.addRoom('room', 4)).to.equal(null);
      expect(data.addRoom('room', 4)).to.not.equal(null);
      expect(data.addRoom('r', 4)).to.not.equal(null);
      expect(data.addRoom('roomd', 4, 'lk')).to.equal(null);
      expect(data.getRoom('roomd')).to.not.equal(null);
      expect(data.getRoom('roodfsdfsdmd')).to.equal(null);
      expect(data.deleteRoom('roodfsdfsdmd')).to.equal(false);
      expect(data.deleteRoom('roomd')).to.equal(true);
    });
  });

  describe('Room', () => {
    it('should create a room', () => {
      const data = new Room(null, 'bob', 4, 'ok');
      data._master = { name: 'bob' };
      expect(data.name).to.equal('bob');
      expect(data.freeSlots()).to.equal(4);
      expect(data.players).to.deep.equal([]);
      expect(data.game).to.equal(null);
      expect(data.serialize()).to.not.equal(null);
    });
  });

});
