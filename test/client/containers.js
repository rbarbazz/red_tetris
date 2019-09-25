/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import configureMockStore from 'redux-mock-store';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';

import { playerType } from '../../src/common/enums';
import ConnectedApp, { App } from '../../src/client/containers/App';
import ConnectedTetris, { Tetris } from '../../src/client/containers/Tetris';
import ConnectedLobby, { Lobby } from '../../src/client/containers/Lobby';
import ConnectedBoard, { Board } from '../../src/client/containers/Board';


const mockStore = configureMockStore();

export default () => describe('Containers', () => {
  describe('App', () => {
    it('should render <App />', () => {
      const wrapper = shallow(<App />);

      expect(wrapper.exists()).to.equal(true);
    });

    it('should render <App clientInit />', () => {
      const wrapper = shallow(<App clientInit />);

      expect(wrapper.exists()).to.equal(true);
    });

    it('should render <App clientInit matches={Array(3)} />', () => {
      const matches = ['#room303[Bob]', 'room303', 'Bob'];
      const wrapper = shallow(<App clientInit matches={matches} />);

      expect(wrapper.exists()).to.equal(true);
    });

    it('should get the correct props from mapStateToProps and mapDispatchToProps', () => {
      const initialState = {
        server: {
          clientInit: false,
        },
      };
      const store = mockStore(initialState);
      const connectedWrapper = shallow(<ConnectedApp store={store} />).dive();

      expect(connectedWrapper.props().clientInit).to.equal(false);
      expect(connectedWrapper.props().ping).to.be.instanceOf(Function);
      expect(connectedWrapper.props().submitHashBasedData).to.be.instanceOf(Function);
      expect(connectedWrapper.props().displayLobby).to.be.instanceOf(Function);
    });
  });


  describe('Tetris', () => {
    it('should render <Tetris />', () => {
      const wrapper = shallow(<Tetris />);

      expect(wrapper.exists()).to.equal(true);
    });

    it('should mount <Tetris />', () => {
      const wrapper = mount(<Tetris />);
      const event = new window.KeyboardEvent('keydown', { keyCode: 37 });
      window.dispatchEvent(event);

      expect(wrapper.exists()).to.equal(true);
      wrapper.unmount();
      expect(wrapper.exists()).to.equal(false);
    });

    it('should mount <Tetris didGameStart currentStep="game" />', () => {
      const initialState = {
        lobby: {
          playerName: '',
          roomName: '',
        },
        tetris: {
          currentStep: 'loading',
          didGameStart: false,
          score: 0,
          spectrums: [],
        },
      };
      const store = mockStore(initialState);
      const connectedWrapper = mount(
        <Provider store={store}>
          <Tetris currentStep="game" didGameStart />
        </Provider>,
      );
      const event = new window.KeyboardEvent('keydown', { keyCode: 37 });
      window.dispatchEvent(event);

      expect(connectedWrapper.exists()).to.equal(true);
      connectedWrapper.unmount();
      expect(connectedWrapper.exists()).to.equal(false);
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

    it('should get the correct props from mapStateToProps and mapDispatchToProps', () => {
      const initialState = {
        lobby: {
          playerName: '',
          roomName: '',
        },
        tetris: {
          currentStep: 'loading',
          didGameStart: false,
          score: 0,
          spectrums: [],
        },
      };
      const store = mockStore(initialState);
      const connectedWrapper = shallow(<ConnectedTetris store={store} />).dive();

      expect(connectedWrapper.props().playerName).to.equal('');
      expect(connectedWrapper.props().roomName).to.equal('');
      expect(connectedWrapper.props().currentStep).to.equal('loading');
      expect(connectedWrapper.props().didGameStart).to.equal(false);
      expect(connectedWrapper.props().score).to.equal(0);
      expect(connectedWrapper.props().spectrums).to.deep.equal([]);
      expect(connectedWrapper.props().sendGameInput).to.be.instanceOf(Function);
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

    it('should get the correct props from mapStateToProps and mapDispatchToProps', () => {
      const initialState = {
        lobby: {
          roomList: [],
          currentStep: 'playerNameSelection',
          playerName: '',
          roomName: '',
        },
      };
      const store = mockStore(initialState);
      const connectedWrapper = shallow(<ConnectedLobby store={store} />).dive();

      expect(connectedWrapper.props().roomList).to.deep.equal([]);
      expect(connectedWrapper.props().currentStep).to.equal('playerNameSelection');
      expect(connectedWrapper.props().playerName).to.equal('');
      expect(connectedWrapper.props().roomName).to.equal('');
      expect(connectedWrapper.props().handlePlayerNameSelection).to.be.instanceOf(Function);
      expect(connectedWrapper.props().handleRoomSelection).to.be.instanceOf(Function);
      expect(connectedWrapper.props().submitPlayerName).to.be.instanceOf(Function);
      expect(connectedWrapper.props().submitRoom).to.be.instanceOf(Function);
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

    it('should get the correct props from mapStateToProps and mapDispatchToProps', () => {
      const initialState = {
        board: Array(200).fill(0),
        tetris: {
          didGameStart: false,
          currentPlayerType: playerType.NONE,
        },
      };
      const store = mockStore(initialState);
      const connectedWrapper = shallow(<ConnectedBoard store={store} />).dive();

      expect(connectedWrapper.props().board).to.deep.equal(Array(200).fill(0));
      expect(connectedWrapper.props().didGameStart).to.equal(false);
      expect(connectedWrapper.props().currentPlayerType).to.equal(playerType.NONE);
      expect(connectedWrapper.props().ownerIsReady).to.be.instanceOf(Function);
    });
  });
});
