import React from 'react';
import PropTypes from 'prop-types';

import * as lobbyActions from '../actions/lobby';


const PlayerNameInput = ({ handlePlayerNameSelection, playerName, submitPlayerName }) => (
  <div key="username-input-container" className="username-input-container">
    <div className="input-label">
      <div className="three-dots-container">
        <div />
        <div />
        <div />
      </div>
      Provide your username
    </div>
    <form
      className="input-submit-container"
      onSubmit={(event) => {
        event.preventDefault();
        submitPlayerName(playerName);
      }}
    >
      <input
        type="text"
        onChange={event => handlePlayerNameSelection(event.target.value)}
        value={playerName}
      />
      <button
        disabled={playerName === ''}
        type="submit"
      >
        Submit
      </button>
    </form>
  </div>
);

PlayerNameInput.propTypes = {
  handlePlayerNameSelection: PropTypes.func,
  playerName: PropTypes.string,
  submitPlayerName: PropTypes.func,
};
PlayerNameInput.defaultProps = {
  handlePlayerNameSelection: lobbyActions.handlePlayerNameSelection,
  playerName: '',
  submitPlayerName: lobbyActions.submitPlayerName,
};

export default PlayerNameInput;
