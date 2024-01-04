import PropTypes from 'prop-types';
import splash from '../../assets/images/splash.svg';

export default function Splash() {
  return (
    <div className={`fixed top-0 left-0 z-50 bg-white w-full h-screen flex items-center justify-center`}>
      <img src={splash} alt="splash" />
    </div>
  );
}

Splash.propTypes = {
  loading: PropTypes.bool,
};
