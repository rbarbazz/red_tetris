import React from 'react';
import PropTypes from 'prop-types';

import * as lobbyActions from '../actions/lobby';


const PlayerNameInput = ({ handlePlayerName, playerName, submitPlayerName }) => (
  <div key="username-input-container" className="username-input-container">
    <div className="input-label">
      <div className="three-dots-container">
        <div />
        <div />
        <div />
      </div>
      Provide your username
    </div>
    <div className="input-submit-container">
      <input
        type="text"
        onChange={event => handlePlayerName(event.target.value)}
        value={playerName}
      />
      <button
        type="submit"
        disabled={playerName === ''}
        onClick={() => submitPlayerName(playerName)}
      >
        Submit
      </button>
    </div>
  </div>
);

PlayerNameInput.propTypes = {
  handlePlayerName: PropTypes.func,
  playerName: PropTypes.string,
  submitPlayerName: PropTypes.func,
};
PlayerNameInput.defaultProps = {
  handlePlayerName: lobbyActions.handlePlayerName,
  playerName: '',
  submitPlayerName: lobbyActions.submitPlayerName,
};

export default PlayerNameInput;
