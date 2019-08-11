import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as lobbyActions from '../actions/lobby';

const hashRegex = /(^#.+)(\[.+\]$)/gi;
const matches = hashRegex.exec(window.location.hash);

const mapStateToProps = state => ({
  lobbyCurrentStep: state.tetris.lobbyCurrentStep,
  playerName: state.tetris.playerName,
  currentRoomList: state.tetris.currentRoomList,
  roomSelected: state.tetris.roomSelected,
});
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    ...lobbyActions,
  }, dispatch)
);

export const Lobby = ({
  playerName,
  handlePlayerName,
  submitPlayerName,
  lobbyCurrentStep,
  currentRoomList,
  handleRoomSelection,
  roomSelected,
  submitRoom,
}) => {
  if (matches[0] && matches[1]) {
    submitRoom(matches[0]);
    submitPlayerName(matches[1]);
  }

  return (
    <React.Fragment>
      {lobbyCurrentStep === 'playerNameSelection'
        && (
        <div key="username-input-container" className="username-input-container">
          <div className="player-name-label input-label">Provide your username</div>
          <input
            type="text"
            onChange={handlePlayerName}
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
        )
      }
      {lobbyCurrentStep === 'roomSelection'
        && (
          <React.Fragment>
            {currentRoomList.length > 0
              && (
                <div key="room-selection-container" className="room-selection-container">
                  <div className="room-list-label input-label">Provide a room name</div>
                  <input
                    type="text"
                    onChange={handleRoomSelection}
                    value={roomSelected}
                  />
                  <button
                    type="submit"
                    onClick={() => submitRoom(roomSelected)}
                  >
                    {currentRoomList.includes(roomSelected) ? 'Enter' : 'Create'}
                  </button>
                </div>
              )
            }
          </React.Fragment>
        )
      }
    </React.Fragment>
  );
};

Lobby.propTypes = {
  lobbyCurrentStep: PropTypes.string,
  handlePlayerName: PropTypes.func,
  submitPlayerName: PropTypes.func,
  handleRoomSelection: PropTypes.func,
  submitRoom: PropTypes.func,
  playerName: PropTypes.string,
  currentRoomList: PropTypes.arrayOf(PropTypes.string),
  roomSelected: PropTypes.string,
};
Lobby.defaultProps = {
  lobbyCurrentStep: 'playerName',
  handlePlayerName: lobbyActions.handlePlayerName,
  submitPlayerName: lobbyActions.submitPlayerName,
  handleRoomSelection: lobbyActions.handleRoomSelection,
  submitRoom: lobbyActions.submitRoom,
  playerName: '',
  currentRoomList: [],
  roomSelected: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
