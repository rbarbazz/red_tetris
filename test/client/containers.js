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
import ConnectedGame, { Game } from '../../src/client/containers/Game';


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

  describe('Game', () => {
    it('should render <Game />', () => {
      const wrapper = shallow(<Game />);

      expect(wrapper.exists()).to.equal(true);
      expect(wrapper.exists('.game-container')).to.equal(true);
      expect(wrapper.exists('.board-stats-container')).to.equal(true);
    });

    it('should render <Game currentStep="gameReport" />', () => {
      const wrapper = shallow(<Game currentStep="gameReport" />);

      expect(wrapper.exists()).to.equal(true);
    });

    it('should get the correct props from mapStateToProps and mapDispatchToProps', () => {
      const initialState = {
        game: {
          board: Array(20).fill(Array(10).fill(0)),
          score: 0,
          spectrums: [],
        },
        tetris: {
          currentPlayerType: playerType.SLAVE,
          currentStep: 'game',
          playerName: 'raph',
          roomName: 'room303',
        },
      };
      const store = mockStore(initialState);
      const connectedWrapper = shallow(<ConnectedGame store={store} />).dive();

      expect(connectedWrapper.props().board).to.deep.equal(Array(20).fill(Array(10).fill(0)));
      expect(connectedWrapper.props().score).to.equal(0);
      expect(connectedWrapper.props().spectrums).to.deep.equal([]);
      expect(connectedWrapper.props().currentPlayerType).to.equal(playerType.SLAVE);
      expect(connectedWrapper.props().currentStep).to.equal('game');
      expect(connectedWrapper.props().playerName).to.equal('raph');
      expect(connectedWrapper.props().roomName).to.equal('room303');
      expect(connectedWrapper.props().leaveRoom).to.be.instanceOf(Function);
      expect(connectedWrapper.props().resetRoom).to.be.instanceOf(Function);
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
        tetris: {
          currentPlayerType: playerType.MASTER,
          currentStep: 'playerNameSelection',
          isInRoom: false,
          isLoading: false,
          message: '',
          playerList: [],
          playerName: 'raph',
          roomList: [],
          roomName: '',
          roomObject: undefined,
        },
      };
      const store = mockStore(initialState);
      const connectedWrapper = shallow(<ConnectedLobby store={store} />).dive();

      expect(connectedWrapper.props().currentPlayerType).to.equal(playerType.MASTER);
      expect(connectedWrapper.props().currentStep).to.equal('playerNameSelection');
      expect(connectedWrapper.props().isInRoom).to.equal(false);
      expect(connectedWrapper.props().isLoading).to.equal(false);
      expect(connectedWrapper.props().message).to.equal('');
      expect(connectedWrapper.props().playerList).to.deep.equal([]);
      expect(connectedWrapper.props().playerName).to.equal('raph');
      expect(connectedWrapper.props().roomList).to.deep.equal([]);
      expect(connectedWrapper.props().roomName).to.equal('');
      expect(connectedWrapper.props().roomObject).to.equal(undefined);
      expect(connectedWrapper.props().handlePlayerNameSelection).to.be.instanceOf(Function);
      expect(connectedWrapper.props().handleRoomSelection).to.be.instanceOf(Function);
      expect(connectedWrapper.props().leaveRoom).to.be.instanceOf(Function);
      expect(connectedWrapper.props().ownerIsReady).to.be.instanceOf(Function);
      expect(connectedWrapper.props().submitPlayerName).to.be.instanceOf(Function);
      expect(connectedWrapper.props().submitRoom).to.be.instanceOf(Function);
    });
  });

  describe('Tetris', () => {
    it('should render <Tetris />', () => {
      const wrapper = shallow(<Tetris />);

      expect(wrapper.exists()).to.equal(true);
    });

    it('should render <Tetris currentStep="roomNameSelection" />', () => {
      const wrapper = shallow(<Tetris currentStep="roomNameSelection" />);

      expect(wrapper.exists()).to.equal(true);
    });

    it('should render <Tetris currentStep="playerNameSelection" />', () => {
      const wrapper = shallow(<Tetris currentStep="playerNameSelection" />);

      expect(wrapper.exists()).to.equal(true);
    });

    it('should render <Tetris currentStep="game" />', () => {
      const wrapper = shallow(<Tetris currentStep="game" />);

      expect(wrapper.exists()).to.equal(true);
    });

    it('should render <Tetris currentStep="endGame" />', () => {
      const wrapper = shallow(<Tetris currentStep="endGame" />);

      expect(wrapper.exists()).to.equal(true);
    });

    it('should render <Tetris currentStep="gameReport" />', () => {
      const wrapper = shallow(<Tetris currentStep="gameReport" />);

      expect(wrapper.exists()).to.equal(true);
    });

    it('should get the correct props from mapStateToProps and mapDispatchToProps', () => {
      const initialState = {
        tetris: {
          currentStep: 'game',
        },
      };
      const store = mockStore(initialState);
      const connectedWrapper = shallow(<ConnectedTetris store={store} />).dive();

      expect(connectedWrapper.props().currentStep).to.equal('game');
      expect(connectedWrapper.props().sendGameInput).to.be.instanceOf(Function);
    });

    it('should get a known keyboard event', () => {
      const initialState = {
        game: {
          board: Array(20).fill(Array(10).fill(0)),
          score: 0,
          spectrums: [],
        },
        tetris: {
          currentPlayerType: playerType.SLAVE,
          currentStep: 'game',
          playerName: 'raph',
          roomName: 'room303',
        },
      };
      const store = mockStore(initialState);
      const connectedWrapper = mount(
        <Provider store={store}>
          <Tetris currentStep="game" />
        </Provider>,
      );
      const event = new window.KeyboardEvent('keydown', { keyCode: 37 });
      window.dispatchEvent(event);

      expect(connectedWrapper.exists()).to.equal(true);
      connectedWrapper.unmount();
      expect(connectedWrapper.exists()).to.equal(false);
    });

    it('should get an unknown keyboard event', () => {
      const initialState = {
        game: {
          board: Array(20).fill(Array(10).fill(0)),
          score: 0,
          spectrums: [],
        },
        tetris: {
          currentPlayerType: playerType.SLAVE,
          currentStep: 'game',
          playerName: 'raph',
          roomName: 'room303',
        },
      };
      const store = mockStore(initialState);
      const connectedWrapper = mount(
        <Provider store={store}>
          <Tetris currentStep="game" />
        </Provider>,
      );
      const event = new window.KeyboardEvent('keydown', { keyCode: 73 });
      window.dispatchEvent(event);

      expect(connectedWrapper.exists()).to.equal(true);
      connectedWrapper.unmount();
      expect(connectedWrapper.exists()).to.equal(false);
    });
  });
});
