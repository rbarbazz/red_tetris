/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import './helpers/react';
import { App } from '../src/client/containers/App';
import { Tetris } from '../src/client/components/Tetris';
import { Lobby } from '../src/client/components/Lobby';
import { Block, Board } from '../src/client/components/Board';
import Spectrum from '../src/client/components/Spectrum';
import Score from '../src/client/components/Score';

configure({ adapter: new Adapter() });

describe('React', () => {
  describe('Components', () => {
    it('should render <App />', () => {
      const wrapper = shallow(<App />);

      expect(wrapper.exists()).to.equal(true);
    });

    it('should render <Tetris />', () => {
      const wrapper = shallow(<Tetris />);

      expect(wrapper.exists()).to.equal(true);
    });

    it('should render <Tetris tetris={tetrisCurrentStep: \'game\'} />', () => {
      const tetris = {
        tetrisCurrentStep: 'game',
      };
      const wrapper = shallow(<Tetris tetris={tetris} />);

      expect(wrapper.exists('.game-container')).to.equal(true);
      expect(wrapper.exists('.stats-container')).to.equal(true);
    });

    it('should render <Lobby />', () => {
      const wrapper = shallow(<Lobby />);

      expect(wrapper.exists('.lobby-container')).to.equal(true);
      expect(wrapper.exists('form')).to.equal(true);
      expect(wrapper.find('form').children()).to.have.lengthOf(3);
    });

    it('should render <Block />', () => {
      const wrapper = shallow(<Block />);

      expect(wrapper.exists('.block')).to.equal(true);
    });

    it('should render <Board />', () => {
      const wrapper = shallow(<Board />);

      expect(wrapper.exists('.board-container')).to.equal(true);
      expect(wrapper.find('.board-container').children()).to.have.lengthOf(200);
    });

    it('should render <Score />', () => {
      const wrapper = shallow(<Score />);

      expect(wrapper.exists('.score-container')).to.equal(true);
    });

    it('should render <Spectrum />', () => {
      const wrapper = shallow(<Spectrum />);

      expect(wrapper.exists('.spectrum-container')).to.equal(true);
    });
  });
});
