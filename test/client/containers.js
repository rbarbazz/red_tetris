/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import jsdom from 'jsdom';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

import { App } from '../../src/client/containers/App';
import { Tetris } from '../../src/client/containers/Tetris';
import { Lobby } from '../../src/client/containers/Lobby';
import { Board } from '../../src/client/containers/Board';


export default () => describe('Containers', () => {
  describe('App', () => {
    it('should render <App />', () => {
      const wrapper = shallow(<App />);

      expect(wrapper.exists()).to.equal(true);
    });

    it('should render <App receivedPong />', () => {
      const wrapper = shallow(<App receivedPong />);

      expect(wrapper.exists()).to.equal(true);
    });

    it('should render <App receivedPong matches={Array(3)} />', () => {
      const matches = ['#room303[Bob]', 'room303', 'Bob'];
      const wrapper = shallow(<App receivedPong matches={matches} />);

      expect(wrapper.exists()).to.equal(true);
    });
  });


  describe('Tetris', () => {
    it('should render <Tetris />', () => {
      const wrapper = shallow(<Tetris />);

      expect(wrapper.exists()).to.equal(true);
    });

    it('should mount <Tetris />', () => {
      const { JSDOM } = jsdom;
      const { document } = (new JSDOM('')).window;
      global.document = document;
      global.window = document.defaultView;
      const wrapper = mount(<Tetris />);
      const event = new window.KeyboardEvent('keydown', { keyCode: 37 });
      window.dispatchEvent(event);

      expect(wrapper.exists()).to.equal(true);
      wrapper.unmount();
      expect(wrapper.exists()).to.equal(false);
    });

    it('should render <Tetris currentStep="game" />', () => {
      const wrapper = shallow(<Tetris currentStep="game" />);

      expect(wrapper.exists()).to.equal(true);
      expect(wrapper.exists('.game-container')).to.equal(true);
      expect(wrapper.exists('.board-stats-container')).to.equal(true);
      expect(wrapper.exists('.stats-container')).to.equal(true);
    });

    it('should render <Tetris currentStep="roomNameSelection" />', () => {
      const wrapper = shallow(<Tetris currentStep="lobby" />);

      expect(wrapper.exists()).to.equal(true);
    });

    it('should render <Tetris currentStep="playerNameSelection" />', () => {
      const wrapper = shallow(<Tetris currentStep="loading" />);

      expect(wrapper.exists()).to.equal(true);
    });
  });

  describe('Lobby', () => {
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

    it('should render <Lobby currentStep="loading" />', () => {
      const wrapper = shallow(<Lobby currentStep="loading" />);

      expect(wrapper.exists()).to.equal(true);
    });
  });

  describe('Board', () => {
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
});
