import React from 'react';
import PropTypes from 'prop-types';


const PlayerInfo = ({ playerName, roomName }) => (
  <div className="player-base-info">
    <div className="three-dots-container">
      <div />
      <div />
      <div />
    </div>
    {playerName !== '' && roomName !== ''
      && (
        <React.Fragment>
          <div className="player-base-info-label">{playerName}</div>
          <div className="player-base-info-label">@</div>
          <div className="player-base-info-label">{roomName}</div>
        </React.Fragment>
      )}
  </div>
);

export const propTypes = {
  roomName: PropTypes.string,
  playerName: PropTypes.string,
};
PlayerInfo.propTypes = propTypes;

export const defaultProps = {
  roomName: '',
  playerName: '',
};
PlayerInfo.defaultProps = defaultProps;

export default PlayerInfo;
