import React, { useState, useEffect } from 'react';
import Proptypes from 'prop-types';


const useAudioLoop = (url) => {
  const audio = new Audio(url);
  audio.loop = true;
  const [audioLoop] = useState(audio);
  const [playing, setPlaying] = useState(false);
  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    playing ? audioLoop.play() : audioLoop.pause();
  },
  [playing]);

  return [playing, toggle];
};

const MusicToggle = ({ url }) => {
  const [playing, toggle] = useAudioLoop(url);

  return (
    <button
      onClick={toggle}
      type="button"
      className="music-toggle"
    >
      <span>♪</span>
      {!playing && (
        <span className="music-toggle-linethrough" />
      )}
    </button>
  );
};

MusicToggle.propTypes = {
  url: Proptypes.string,
};
MusicToggle.defaultProps = {
  url: '',
};

export default MusicToggle;
