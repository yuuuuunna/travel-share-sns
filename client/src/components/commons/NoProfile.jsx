import PropTypes from 'prop-types';

import logo from '../../assets/logo.png';

export default function NoProfile({ width, height }) {
  return (
    <div className={`w-${width} h-${height} rounded-full flex justify-center items-center`}>
      <img src={logo} alt="여기다" className="w-[23px] h-[28px]" />
    </div>
  );
}

NoProfile.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};
