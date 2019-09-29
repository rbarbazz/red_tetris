import React from 'react';
import PropTypes from 'prop-types';
import LoadingIcon from './LoadingIcon';


const GenericButton = ({
  action,
  isLoading,
  disabled,
  contentText,
}) => (
  isLoading ? (
    <LoadingIcon />
  ) : (
    <button
      className="generic-button"
      disabled={disabled}
      onClick={action}
      type="submit"
    >
      {contentText}
    </button>
  ));

export const propTypes = {
  action: PropTypes.func,
  contentText: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
};
GenericButton.propTypes = propTypes;

export const defaultProps = {
  action: undefined,
  contentText: '',
  disabled: false,
  isLoading: false,
};
GenericButton.defaultProps = defaultProps;

export default GenericButton;
