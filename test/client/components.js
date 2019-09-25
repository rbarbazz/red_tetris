/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { playerType } from '../../src/common/enums';
import Spectrum from '../../src/client/components/Spectrum';
import Score from '../../src/client/components/Score';
import Block from '../../src/client/components/Block';
import BoardWaitingScreen from '../../src/client/components/BoardWaitingScreen';
import LoadingIcon from '../../src/client/components/LoadingIcon';
import PlayerInfo from '../../src/client/components/PlayerInfo';
import PlayerNameInput from '../../src/client/components/PlayerNameInput';
import RoomNameInput from '../../src/client/components/RoomNameInput';


export default () => describe('Components', () => {
  it('should render <Block />', () => {
    const wrapper = shallow(<Block />);

    expect(wrapper.exists()).to.equal(true);
    expect(wrapper.exists('.block')).to.equal(true);
  });

  describe('BoardWaitingScreen', () => {
    it('should render <BoardWaitingScreen currentPlayerType={playerType.MASTER} />', () => {
      const wrapper = shallow(<BoardWaitingScreen currentPlayerType={playerType.MASTER} />);

      expect(wrapper.exists()).to.equal(true);
      expect(wrapper.exists('.board-waiting-message.owner-message')).to.equal(true);
    });

    it('should render <BoardWaitingScreen currentPlayerType={playerType.SLAVE} />', () => {
      const wrapper = shallow(<BoardWaitingScreen currentPlayerType={playerType.SLAVE} />);

      expect(wrapper.exists()).to.equal(true);
      expect(wrapper.exists('.board-waiting-screen')).to.equal(true);
    });
  });

  it('should render <LoadingIcon />', () => {
    const wrapper = shallow(<LoadingIcon />);

    expect(wrapper.exists()).to.equal(true);
    expect(wrapper.exists('.loading-icon')).to.equal(true);
    expect(wrapper.find('.loading-icon').children()).to.have.lengthOf(9);
  });

  it('should render <PlayerInfo />', () => {
    const wrapper = shallow(<PlayerInfo />);

    expect(wrapper.exists()).to.equal(true);
    expect(wrapper.exists('.player-base-info')).to.equal(true);
  });

  describe('PlayerInputName', () => {
    it('should render <PlayerNameInput />', () => {
      const wrapper = shallow(<PlayerNameInput />);

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
      const onButtonClick = sinon.spy();
      const wrapper = shallow(
        <PlayerNameInput
          submitPlayerName={onButtonClick}
          playerName="Bob"
        />,
      );

      wrapper.find('button').simulate('click');
      expect(onButtonClick).to.have.property('callCount', 1);
    });
  });

  describe('RoomNameInput', () => {
    it('should render <RoomNameInput />', () => {
      const wrapper = shallow(<RoomNameInput />);

      expect(wrapper.exists()).to.equal(true);
      expect(wrapper.exists('.room-selection-container')).to.equal(true);
      expect(wrapper.find('.input-submit-container > button').text()).to.equal('Create');
    });

    it('should render <RoomNameInput roomList={Array(3)} />', () => {
      const roomList = ['room1', 'room2', 'room3'];
      const wrapper = shallow(<RoomNameInput roomList={roomList} />);

      expect(wrapper.exists('.room-list-container')).to.equal(true);
    });

    it('should render <RoomNameInput roomList={Array(3)} roomName={Array[0]} />', () => {
      const roomList = ['room1', 'room2', 'room3'];
      const wrapper = shallow(
        <RoomNameInput
          roomList={roomList}
          roomName="room3"
        />,
      );

      expect(wrapper.find('.input-submit-container > button').text()).to.equal('Enter');
    });

    it('should simulate click and call handleRoomSelection', () => {
      const onButtonClick = sinon.spy();
      const roomList = ['room1', 'room2', 'room3'];
      const wrapper = shallow(
        <RoomNameInput
          handleRoomSelection={onButtonClick}
          roomList={roomList}
        />,
      );

      wrapper.find('.room-list-items-container > button').first().simulate('click', { target: { value: 'Bob' } });
      expect(onButtonClick).to.have.property('callCount', 1);
    });

    it('should simulate change and call handleRoomSelection', () => {
      const onInputChange = sinon.spy();
      const roomList = ['room1', 'room2', 'room3'];
      const wrapper = shallow(
        <RoomNameInput
          handleRoomSelection={onInputChange}
          roomList={roomList}
        />,
      );

      wrapper.find('input').first().simulate('change', { target: { value: 'Bob' } });
      expect(onInputChange).to.have.property('callCount', 1);
    });

    it('should simulate click and call submitRoom', () => {
      const onButtonClick = sinon.spy();
      const wrapper = shallow(
        <RoomNameInput
          submitRoom={onButtonClick}
          roomName="room1"
        />,
      );

      wrapper.find('.input-submit-container > button').simulate('click');
      expect(onButtonClick).to.have.property('callCount', 1);
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

    it('should render <Spectrum spectrums={Array(7).fill(Array(200))} />', () => {
      const spectrums = Array(3).fill([...Array(125).fill(0), ...Array(75).fill(1)]);
      const wrapper = shallow(<Spectrum spectrums={spectrums} />);

      expect(wrapper.find('.spectrum-container')).to.have.lengthOf(3);
      expect(wrapper.find('.spectrum-container').first().children()).to.have.lengthOf(200);
    });
  });
});
