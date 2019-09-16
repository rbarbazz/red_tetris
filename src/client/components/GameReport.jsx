import React from 'react';
import PropTypes from 'prop-types';
import GenericButton from './GenericButton';
import * as lobbyActions from '../actions/lobby';


const GameReport = ({ leaveRoom }) => (
  <GenericButton
    action={leaveRoom}
    contentText="Leave"
  />
);

export const propTypes = {
  leaveRoom: PropTypes.func,
};
GameReport.propTypes = propTypes;

export const defaultProps = {
  leaveRoom: lobbyActions.leaveRoom,
};
GameReport.defaultProps = defaultProps;

export default GameReport;
