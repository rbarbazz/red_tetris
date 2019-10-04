/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

import { playerType, roomState } from '../../src/common/enums';
import Block from '../../src/client/components/Block';
import Board from '../../src/client/components/Board';
import GameReport from '../../src/client/components/GameReport';
import GenericButton from '../../src/client/components/GenericButton';
import LoadingIcon from '../../src/client/components/LoadingIcon';
import '../../src/client/components/MusicToggle';
import NextPiece from '../../src/client/components/NextPiece';
import PlayerInfo from '../../src/client/components/PlayerInfo';
import PlayerList from '../../src/client/components/PlayerList';
import PlayerNameInput from '../../src/client/components/PlayerNameInput';
import RoomList from '../../src/client/components/RoomList';
import RoomNameInput from '../../src/client/components/RoomNameInput';
import Score from '../../src/client/components/Score';
import Spectrum from '../../src/client/components/Spectrum';


export default () => describe('Components', () => {
  describe('Block', () => {
    it('should render <Block />', () => {
      const wrapper = shallow(<Block />);

      expect(wrapper.exists()).to.equal(true);
      expect(wrapper.exists('.block')).to.equal(true);
    });

    it('should render <Block shadowPiece />', () => {
      const wrapper = shallow(<Block shadowPiece />);

      expect(wrapper.exists()).to.equal(true);
      expect(wrapper.exists('.block')).to.equal(true);
    });
  });

  describe('Board', () => {
    it('should render <Board />', () => {
      const wrapper = shallow(<Board />);

      expect(wrapper.exists()).to.equal(true);
    });

    it('should mount <Board />', () => {
      const wrapper = mount(<Board />);

      expect(wrapper.exists()).to.equal(true);
    });

    it('should render <Board board={board} />', () => {
      const board = Array(20).fill(Array(10).fill(14));
      const wrapper = shallow(<Board board={board} />);

      expect(wrapper.exists()).to.equal(true);
    });

    it('should render <Board currentStep="endGame" />', () => {
      const wrapper = shallow(<Board currentStep="endGame" />);

      expect(wrapper.exists()).to.equal(true);
      expect(wrapper.exists('.game-end-screen')).to.equal(true);
    });
  });

  describe('GameReport', () => {
    it('should render <GameReport gameReport={gameReport} />', () => {
      const gameReport = [[{
        name: 'raph',
        score: { lines: 0, lvl: 1, pts: 48 },
      }], [{
        name: 'raph',
        score: { lines: 0, lvl: 1, pts: 48 },
      }]];
      const wrapper = shallow(<GameReport gameReport={gameReport} />);

      expect(wrapper.exists()).to.equal(true);
    });

    it('should render <GameReport currentPlayerType={playerType.MASTER} />', () => {
      const wrapper = shallow(<GameReport currentPlayerType={playerType.MASTER} />);

      expect(wrapper.exists()).to.equal(true);
    });
  });

  describe('GenericButton', () => {
    it('should render <GenericButton />', () => {
      const wrapper = shallow(<GenericButton />);

      expect(wrapper.exists()).to.equal(true);
    });

    it('should render <GenericButton isLoading />', () => {
      const wrapper = shallow(<GenericButton isLoading />);

      expect(wrapper.exists()).to.equal(true);
    });
  });

  it('should render <LoadingIcon />', () => {
    const wrapper = shallow(<LoadingIcon />);

    expect(wrapper.exists()).to.equal(true);
    expect(wrapper.exists('.loading-icon')).to.equal(true);
    expect(wrapper.find('.loading-icon').children()).to.have.lengthOf(9);
  });

  describe('NextPiece', () => {
    it('should render <NextPiece nextPiece="S" />', () => {
      const wrapper = shallow(<NextPiece nextPiece="S" />);

      expect(wrapper.exists()).to.equal(true);
    });

    it('should render <NextPiece nextPiece="X" />', () => {
      const wrapper = shallow(<NextPiece nextPiece="X" />);

      expect(wrapper.exists()).to.equal(true);
    });
  });

  it('should render <PlayerInfo />', () => {
    const wrapper = shallow(<PlayerInfo />);

    expect(wrapper.exists()).to.equal(true);
    expect(wrapper.exists('.player-base-info')).to.equal(true);
  });

  describe('PlayerList', () => {
    it('should render <PlayerList playerList={playerList} />', () => {
      const playerList = [{ name: 'raph' }];
      const wrapper = shallow(<PlayerList playerList={playerList} />);

      expect(wrapper.exists()).to.equal(true);
    });

    it('should render <PlayerList isInRoom />', () => {
      const wrapper = shallow(<PlayerList isInRoom />);

      expect(wrapper.exists()).to.equal(true);
    });

    it('should render <PlayerList currentPlayerType={playerType.MASTER} />', () => {
      const wrapper = shallow(<PlayerList currentPlayerType={playerType.MASTER} />);

      expect(wrapper.exists()).to.equal(true);
    });
  });

  describe('PlayerNameInput', () => {
    it('should render <PlayerNameInput />', () => {
      const wrapper = shallow(<PlayerNameInput />);

      expect(wrapper.exists()).to.equal(true);
      expect(wrapper.exists('.username-input-container')).to.equal(true);
    });

    it('should render <PlayerNameInput playerName="raph" />', () => {
      const wrapper = shallow(<PlayerNameInput playerName="raph" />);

      expect(wrapper.exists()).to.equal(true);
      expect(wrapper.exists('.username-input-container')).to.equal(true);
    });

    it('should simulate change and call handlePlayerNameSelection', () => {
      const onInputChange = sinon.spy();
      const wrapper = shallow(
        <PlayerNameInput
          handlePlayerNameSelection={onInputChange}
        />,
      );

      wrapper.find('input').simulate('change', { target: { value: 'Bob' } });
      expect(onInputChange).to.have.property('callCount', 1);
    });

    it('should simulate click and call submitPlayerName', () => {
      const onSubmit = sinon.spy();
      const wrapper = mount(
        <PlayerNameInput
          submitPlayerName={onSubmit}
          playerName="Bob"
        />,
      );

      wrapper.find('form').simulate('submit', { target: { value: 'Bob' } });
      expect(onSubmit).to.have.property('callCount', 1);
    });
  });

  describe('RoomList', () => {
    it('should render <RoomList />', () => {
      const wrapper = shallow(<RoomList />);

      expect(wrapper.exists()).to.equal(true);
    });

    it('should render <RoomList isInRoom />', () => {
      const wrapper = shallow(<RoomList isInRoom />);

      expect(wrapper.exists()).to.equal(true);
    });

    it('should render <RoomList roomList={roomList} />', () => {
      const roomList = [{
        name: 'room303',
        state: roomState.FREE,
        slots: [7, 1, 8],
      }, {
        name: 'room304',
        state: roomState.BUSY,
        slots: [0, 8, 8],
      }];
      const wrapper = shallow(<RoomList roomList={roomList} />);

      expect(wrapper.exists()).to.equal(true);
    });

    it('should simulate click and call submitRoom', () => {
      const roomList = [{
        name: 'room303',
        state: roomState.FREE,
        slots: [7, 1, 8],
      }];
      const onButtonClick = sinon.spy();
      const wrapper = mount(
        <RoomList
          roomList={roomList}
          submitRoom={onButtonClick}
        />,
      );

      wrapper.find('button').simulate('click');
      expect(onButtonClick).to.have.property('callCount', 1);
    });
  });

  describe('RoomNameInput', () => {
    it('should render <RoomNameInput roomName=""', () => {
      const wrapper = shallow(<RoomNameInput roomName="" />);

      expect(wrapper.exists()).to.equal(true);
      expect(wrapper.exists('.room-selection-wrapper')).to.equal(true);
    });

    it('should render <RoomNameInput isInRoom />', () => {
      const wrapper = shallow(<RoomNameInput isInRoom />);

      expect(wrapper.exists()).to.equal(true);
      expect(wrapper.exists('.room-selection-wrapper')).to.equal(true);
    });

    it('should render <RoomNameInput roomList={roomList} />', () => {
      const roomList = [{
        name: 'room303',
        state: roomState.FREE,
        slots: [7, 1, 8],
      }, {
        name: 'room304',
        state: roomState.BUSY,
        slots: [0, 8, 8],
      }];
      const wrapper = shallow(<RoomNameInput roomList={roomList} />);

      expect(wrapper.exists('.room-selection-wrapper')).to.equal(true);
    });

    it('should render <RoomNameInput roomObject={roomObject} />', () => {
      const roomObject = {
        name: 'room303',
        state: roomState.FREE,
        slots: [7, 1, 8],
      };
      const roomList = [{
        name: 'room303',
        state: roomState.FREE,
        slots: [7, 1, 8],
      }, {
        name: 'room304',
        state: roomState.BUSY,
        slots: [0, 8, 8],
      }];

      const wrapper = shallow(<RoomNameInput roomList={roomList} roomObject={roomObject} />);

      expect(wrapper.exists('.room-selection-wrapper')).to.equal(true);
    });

    it('should simulate change and call handleRoomSelection', () => {
      const onInputChange = sinon.spy();
      const wrapper = shallow(
        <RoomNameInput
          handleRoomSelection={onInputChange}
        />,
      );

      wrapper.find('input').simulate('change', { target: { value: 'room303' } });
      expect(onInputChange).to.have.property('callCount', 1);
    });

    it('should simulate click and call handleRoomSelection', () => {
      const onInputChange = sinon.spy();
      const wrapper = shallow(
        <RoomNameInput
          handleRoomSelection={onInputChange}
        />,
      );

      wrapper.find('select').simulate('change', { target: { value: 'tournament' } });
      expect(onInputChange).to.have.property('callCount', 1);
    });

    it('should simulate click and call submitRoom', () => {
      const onButtonClick = sinon.spy();
      const wrapper = mount(
        <RoomNameInput
          roomName="room303"
          submitRoom={onButtonClick}
        />,
      );

      wrapper.find('button').simulate('click');
      expect(onButtonClick).to.have.property('callCount', 1);
    });

    it('should simulate submit and call submitRoom', () => {
      const onSubmit = sinon.spy();
      const wrapper = mount(
        <RoomNameInput
          roomName="room303"
          submitRoom={onSubmit}
        />,
      );

      wrapper.find('button').simulate('submit', { target: { value: 'room303' } });
      expect(onSubmit).to.have.property('callCount', 1);
    });
  });

  it('should render <Score />', () => {
    const wrapper = shallow(<Score />);

    expect(wrapper.exists()).to.equal(true);
    expect(wrapper.exists('.score-container')).to.equal(true);
  });

  describe('Spectrum', () => {
    it('should render <Spectrum />', () => {
      const wrapper = shallow(<Spectrum />);

      expect(wrapper.exists()).to.equal(true);
      expect(wrapper.exists('.spectrums-container')).to.equal(true);
    });

    it('should render <Spectrum currentPlayerType={playerType.SPECTATOR} />', () => {
      const wrapper = shallow(<Spectrum currentPlayerType={playerType.SPECTATOR} />);

      expect(wrapper.exists()).to.equal(true);
      expect(wrapper.exists('.spectrums-container')).to.equal(true);
    });

    it('should render <Spectrum spectrums={spectrums} />', () => {
      const spectrums = Array(3).fill({
        board: Array(20).fill(Array(10).fill(0)),
      });
      const wrapper = shallow(<Spectrum spectrums={spectrums} />);

      expect(wrapper.find('.spectrum-container')).to.have.lengthOf(3);
      expect(wrapper.find('.spectrum-container').first().children()).to.have.lengthOf(200);
    });

    it('should render <Spectrum spectrums={spectrums} />', () => {
      const spectrums = Array(3).fill({
        board: Array(20).fill(Array(10).fill(1)),
      });
      const wrapper = shallow(<Spectrum spectrums={spectrums} />);

      expect(wrapper.find('.spectrum-container')).to.have.lengthOf(3);
      expect(wrapper.find('.spectrum-container').first().children()).to.have.lengthOf(200);
    });

    it('should render <Spectrum spectrums={spectrums} playerName="raph" lookingAt="raph" />', () => {
      const spectrums = [{
        board: Array(20).fill(Array(10).fill(1)),
        name: 'raph',
      }, {
        board: Array(20).fill(Array(10).fill(1)),
        name: 'joe',
      }];
      const wrapper = shallow(
        <Spectrum
          spectrums={spectrums}
          playerName="raph"
          lookingAt="joe"
          currentPlayerType={playerType.SPECTATOR}
        />,
      );

      expect(wrapper.find('.spectrum-container')).to.have.lengthOf(1);
    });

    it('should simulate click and call selectPlayerToSpectate', () => {
      const spectrums = [{
        board: Array(20).fill(Array(10).fill(1)),
        name: 'raph',
      }, {
        board: Array(20).fill(Array(10).fill(1)),
        name: 'joe',
      }];
      const onSpectrumClick = sinon.spy();
      const wrapper = mount(
        <Spectrum
          spectrums={spectrums}
          playerName="raph"
          lookingAt="joe"
          currentPlayerType={playerType.SPECTATOR}
          selectPlayerToSpectate={onSpectrumClick}
        />,
      );

      wrapper.find('.spectrum-wrapper').simulate('click');
      expect(onSpectrumClick).to.have.property('callCount', 1);
    });

    it('should simulate click and not call selectPlayerToSpectate', () => {
      const spectrums = [{
        board: Array(20).fill(Array(10).fill(1)),
        name: 'raph',
      }, {
        board: Array(20).fill(Array(10).fill(1)),
        name: 'joe',
      }];
      const onSpectrumClick = sinon.spy();
      const wrapper = mount(
        <Spectrum
          spectrums={spectrums}
          playerName="raph"
          lookingAt="joe"
          currentPlayerType={playerType.SLAVE}
          selectPlayerToSpectate={onSpectrumClick}
        />,
      );

      wrapper.find('.spectrum-wrapper').simulate('click');
      expect(onSpectrumClick).to.have.property('callCount', 0);
    });
  });
});
