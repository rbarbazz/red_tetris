import React from 'react';
import PropTypes from 'prop-types';

import * as lobbyActions from '../actions/lobby';


const PlayerNameInput = ({
  handlePlayerNameSelection,
  errorMessage,
  playerName,
  submitPlayerName,
}) => (
  <div key="username-input-container" className="username-input-container">
    <h1 className="game-title">Red Tetris</h1>
    <form
      className="input-submit-container"
      onSubmit={(event) => {
        event.preventDefault();
        submitPlayerName(playerName);
      }}
    >
      <div className="input-error-message">{errorMessage}</div>
      <input
        type="text"
        onChange={event => handlePlayerNameSelection(event.target.value)}
        value={playerName}
      />
      <button
        disabled={playerName === ''}
        type="submit"
      >
        Play
      </button>
    </form>
  </div>
);

PlayerNameInput.propTypes = {
  errorMessage: PropTypes.string,
  handlePlayerNameSelection: PropTypes.func,
  playerName: PropTypes.string,
  submitPlayerName: PropTypes.func,
};
PlayerNameInput.defaultProps = {
  errorMessage: '',
  handlePlayerNameSelection: lobbyActions.handlePlayerNameSelection,
  playerName: '',
  submitPlayerName: lobbyActions.submitPlayerName,
};

export default PlayerNameInput;
