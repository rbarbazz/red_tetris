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

PlayerInfo.propTypes = {
  roomName: PropTypes.string,
  playerName: PropTypes.string,
};
PlayerInfo.defaultProps = {
  roomName: '',
  playerName: '',
};

export default PlayerInfo;
