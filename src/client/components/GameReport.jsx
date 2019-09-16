import React from 'react';
import PropTypes from 'prop-types';

import GenericButton from './GenericButton';
import * as lobbyActions from '../actions/lobby';
import { playerType } from '../../common/enums';


const GameReport = ({ currentPlayerType, resetRoom, leaveRoom }) => (
  <React.Fragment>
    <GenericButton
      action={leaveRoom}
      contentText="Leave"
    />
    {currentPlayerType === playerType.MASTER && (
      <GenericButton
        action={resetRoom}
        contentText="Restart"
      />
    )}
  </React.Fragment>
);

export const propTypes = {
  currentPlayerType: PropTypes.string,
  leaveRoom: PropTypes.func,
  resetRoom: PropTypes.func,
};
GameReport.propTypes = propTypes;

export const defaultProps = {
  currentPlayerType: playerType.NONE,
  leaveRoom: lobbyActions.leaveRoom,
  resetRoom: lobbyActions.leaveRoom,
};
GameReport.defaultProps = defaultProps;

export default GameReport;
