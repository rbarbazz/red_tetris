/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { configure, shallow } from 'enzyme';

import './helpers/react';
// import { App } from '../src/client/containers/App';
import { Tetris } from '../src/client/containers/Tetris';
import { Lobby } from '../src/client/containers/Lobby';
import { Board } from '../src/client/containers/Board';
import Spectrum from '../src/client/components/Spectrum';
import Score from '../src/client/components/Score';
import Block from '../src/client/components/Block';
import BoardWaitingScreen from '../src/client/components/BoardWaitingScreen';
import LoadingIcon from '../src/client/components/LoadingIcon';
import PlayerInfo from '../src/client/components/PlayerInfo';
import PlayerNameInput from '../src/client/components/PlayerNameInput';
import RoomNameInput from '../src/client/components/RoomNameInput';


configure({ adapter: new Adapter() });

describe('React', () => {
  describe('Containers', () => {
    it('should render <Tetris />', () => {
      const wrapper = shallow(<Tetris />);

      expect(wrapper.exists()).to.equal(true);
    });
    it('should render <Tetris currentStep="game" />', () => {
      const wrapper = shallow(<Tetris currentStep="game" />);

      expect(wrapper.exists()).to.equal(true);
      expect(wrapper.exists('.game-container')).to.equal(true);
      expect(wrapper.exists('.board-stats-container')).to.equal(true);
      expect(wrapper.exists('.stats-container')).to.equal(true);
    });
    it('should render <Tetris currentStep="playerNameSelection" />', () => {
      const wrapper = shallow(<Tetris currentStep="playerNameSelection" />);

      expect(wrapper.exists()).to.equal(true);
    });
    it('should render <Tetris currentStep="roomNameSelection" />', () => {
      const wrapper = shallow(<Tetris currentStep="roomNameSelection" />);

      expect(wrapper.exists()).to.equal(true);
    });
    it('should render <Lobby />', () => {
      const wrapper = shallow(<Lobby />);

      expect(wrapper.exists()).to.equal(true);
    });
    it('should render <Lobby currentStep="playerNameSelection" />', () => {
      const wrapper = shallow(<Lobby currentStep="playerNameSelection" />);

      expect(wrapper.exists()).to.equal(true);
    });
    it('should render <Lobby currentStep="roomNameSelection" />', () => {
      const wrapper = shallow(<Lobby currentStep="roomNameSelection" />);

      expect(wrapper.exists()).to.equal(true);
    });
    it('should render <Board />', () => {
      const wrapper = shallow(<Board />);

      expect(wrapper.exists()).to.equal(true);
      expect(wrapper.exists('.board-container')).to.equal(true);
      expect(wrapper.exists('.window-size-error')).to.equal(true);
    });
    it('should render <Board didGameStart />', () => {
      const wrapper = shallow(<Board didGameStart />);

      expect(wrapper.exists()).to.equal(true);
      expect(wrapper.exists('.board-container')).to.equal(true);
      expect(wrapper.exists('.window-size-error')).to.equal(true);
    });
  });

  describe('Components', () => {
    it('should render <Block />', () => {
      const wrapper = shallow(<Block />);

      expect(wrapper.exists()).to.equal(true);
      expect(wrapper.exists('.block')).to.equal(true);
    });
    it('should render <BoardWaitingScreen />', () => {
      const wrapper = shallow(<BoardWaitingScreen />);

      expect(wrapper.exists()).to.equal(true);
      expect(wrapper.exists('.board-waiting-screen')).to.equal(true);
    });
    it('should render <BoardWaitingScreen isRoomOwner />', () => {
      const wrapper = shallow(<BoardWaitingScreen isRoomOwner />);

      expect(wrapper.exists()).to.equal(true);
      expect(wrapper.exists('.board-waiting-screen')).to.equal(true);
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
    it('should render <PlayerNameInput />', () => {
      const wrapper = shallow(<PlayerNameInput />);

      expect(wrapper.exists()).to.equal(true);
      expect(wrapper.exists('.username-input-container')).to.equal(true);
    });
    it('should render <RoomNameInput />', () => {
      const wrapper = shallow(<RoomNameInput />);

      expect(wrapper.exists()).to.equal(true);
      expect(wrapper.exists('.room-selection-container')).to.equal(true);
    });
    it('should render <Score />', () => {
      const wrapper = shallow(<Score />);

      expect(wrapper.exists()).to.equal(true);
      expect(wrapper.exists('.score-container')).to.equal(true);
    });
    it('should render <Spectrum />', () => {
      const wrapper = shallow(<Spectrum />);

      expect(wrapper.exists()).to.equal(true);
      expect(wrapper.exists('.spectrums-container')).to.equal(true);
    });
  });
});
