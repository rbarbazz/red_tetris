import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import * as lobbyActions from '../actions/lobby';
import PlayerInfo from './PlayerInfo';


const PlayerNameInput = ({
  handlePlayerNameSelection,
  errorMessage,
  playerName,
  submitPlayerName,
}) => (
  <div key="username-input-container" className="username-input-container">
    <PlayerInfo
      playerName={playerName}
    />
    <h1 className="game-title">Red Tetris</h1>
    <form
      className="username-input-form"
      onSubmit={(event) => {
        event.preventDefault();
        submitPlayerName(playerName);
      }}
    >
      <CSSTransition
        in={errorMessage !== ''}
        classNames="error-transition"
        appear
        unmountOnExit
        timeout={300}
      >
        <div
          className="input-error-message"
          style={errorMessage !== '' ? { backgroundColor: '#f5a5a4' } : {}}
        >
          {errorMessage}
        </div>
      </CSSTransition>
      <input
        type="text"
        placeholder="Username"
        onChange={event => handlePlayerNameSelection(event.target.value)}
        value={playerName}
        style={playerName === '' ? {} : { border: 'solid 3px #eb4d4b' }}
      />
      <button
        disabled={playerName === ''}
        type="submit"
        className="generic-button"
      >
        Play
      </button>
    </form>
  </div>
);

export const propTypes = {
  errorMessage: PropTypes.string,
  handlePlayerNameSelection: PropTypes.func,
  playerName: PropTypes.string,
  submitPlayerName: PropTypes.func,
};
PlayerNameInput.propTypes = propTypes;

export const defaultProps = {
  errorMessage: '',
  handlePlayerNameSelection: lobbyActions.handlePlayerNameSelection,
  playerName: '',
  submitPlayerName: lobbyActions.submitPlayerName,
};
PlayerNameInput.defaultProps = defaultProps;

export default PlayerNameInput;
