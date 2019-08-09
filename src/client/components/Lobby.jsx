import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as lobbyActions from '../actions/lobby';


const mapStateToProps = state => ({ playerName: state.tetris.playerName });

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    ...lobbyActions,
  }, dispatch)
);


export const Lobby = ({ playerName, handlePlayerName, submitPlayerName }) => (
  <div className="lobby-container">
    <form onSubmit={(event) => {
      event.preventDefault();
      submitPlayerName(playerName);
    }}
    >
      <div className="player-name-label">Input your username:</div>
      <input
        type="text"
        onChange={handlePlayerName}
        value={playerName}
      />
      <input
        type="submit"
        value="Submit"
        disabled={playerName === ''}
      />
    </form>
  </div>
);

Lobby.propTypes = {
  playerName: PropTypes.string,
  handlePlayerName: PropTypes.func,
  submitPlayerName: PropTypes.func,
};
Lobby.defaultProps = {
  playerName: '',
  handlePlayerName: lobbyActions.handlePlayerName,
  submitPlayerName: lobbyActions.submitPlayerName,
};

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
