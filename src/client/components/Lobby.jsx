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


const Lobby = (props) => {
  const { playerName, handlePlayerName, submitPlayerName } = props;

  return (
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
};

Lobby.propTypes = {
  playerName: PropTypes.string.isRequired,
  handlePlayerName: PropTypes.func.isRequired,
  submitPlayerName: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
