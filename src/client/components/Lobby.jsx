import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as lobbyActions from '../actions/lobby';


const mapStateToProps = state => ({
  lobbyCurrentStep: state.tetris.lobbyCurrentStep,
  playerName: state.tetris.playerName,
  currentRoomList: state.tetris.currentRoomList,
  roomName: state.tetris.roomName,
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
  roomName,
  submitRoom,
}) => (
  <React.Fragment>
    {lobbyCurrentStep === 'playerNameSelection'
      && (
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
      )
    }
    {lobbyCurrentStep === 'roomSelection'
      && (
        <div key="room-selection-container" className="room-selection-container">
          <div className="input-label">
            <div className="three-dots-container">
              <div />
              <div />
              <div />
            </div>
            Provide a room name
          </div>
          <div className="input-submit-container">
            {currentRoomList.length > 0
              && (
                <div className="room-list-container">
                  <div className="room-list-title">Existing rooms</div>
                  <div className="room-list-items-container">
                    {currentRoomList.map((roomItem, index) => (
                      <div
                        value={roomItem}
                        className="room-item"
                        key={`room-item-${index.toString()}`}
                        onClick={(event) => handleRoomSelection(event.target.textContent)}
                      >
                        {roomItem}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            <input
              type="text"
              onChange={event => handleRoomSelection(event.target.value)}
              value={roomName}
            />
            <button
              type="submit"
              onClick={() => submitRoom(roomName)}
              disabled={roomName === ''}
            >
              {currentRoomList.includes(roomName) ? 'Enter' : 'Create'}
            </button>
          </div>
        </div>
      )
    }
  </React.Fragment>
);

Lobby.propTypes = {
  lobbyCurrentStep: PropTypes.string,
  handlePlayerName: PropTypes.func,
  submitPlayerName: PropTypes.func,
  handleRoomSelection: PropTypes.func,
  submitRoom: PropTypes.func,
  playerName: PropTypes.string,
  currentRoomList: PropTypes.arrayOf(PropTypes.string),
  roomName: PropTypes.string,
};
Lobby.defaultProps = {
  lobbyCurrentStep: 'playerName',
  handlePlayerName: lobbyActions.handlePlayerName,
  submitPlayerName: lobbyActions.submitPlayerName,
  handleRoomSelection: lobbyActions.handleRoomSelection,
  submitRoom: lobbyActions.submitRoom,
  playerName: '',
  currentRoomList: [],
  roomName: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
