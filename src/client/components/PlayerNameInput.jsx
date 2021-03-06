import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import * as lobbyActions from '../actions/lobby';
import PlayerInfo from './PlayerInfo';
import
GenericButton,
{ propTypes as GenericButtonPropTypes, defaultProps as GenericButtonDefaultProps }
  from './GenericButton';


const PlayerNameInput = ({
  handlePlayerNameSelection,
  isLoading,
  message,
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
      <input
        type="text"
        placeholder="Username"
        onChange={event => handlePlayerNameSelection(event.target.value)}
        value={playerName}
        style={playerName === '' ? {} : { border: 'solid 3px #eb4d4b' }}
      />
      <CSSTransition
        in={message !== ''}
        classNames="error-transition"
        appear
        unmountOnExit
        timeout={0}
      >
        <div className="input-error-message">{message}</div>
      </CSSTransition>
      <GenericButton
        isLoading={isLoading}
        disabled={playerName === ''}
        contentText="Play"
      />
    </form>
  </div>
);

export const propTypes = {
  ...GenericButtonPropTypes,
  handlePlayerNameSelection: PropTypes.func,
  message: PropTypes.string,
  playerName: PropTypes.string,
  submitPlayerName: PropTypes.func,
};
PlayerNameInput.propTypes = propTypes;

export const defaultProps = {
  ...GenericButtonDefaultProps,
  handlePlayerNameSelection: lobbyActions.handlePlayerNameSelection,
  message: '',
  playerName: '',
  submitPlayerName: lobbyActions.submitPlayerName,
};
PlayerNameInput.defaultProps = defaultProps;

export default PlayerNameInput;
