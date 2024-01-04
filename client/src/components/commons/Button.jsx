import PropTypes from 'prop-types';

Button.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
  text: PropTypes.string,
  isDisabled: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  isDisabled: false,
};

const typeStyle = {
  primary: 'bg-primary text-white border-transparent',
  default: 'bg-white text-primary border-primary',
  kakao: 'bg-kakaoyellow text-kakaoblack border-transparent',
  secondary: 'bg-secondary text-gray-1 border-transparent',
  red: 'bg-red text-white border-transparent',
  gray: 'bg-gray-3 text-white border-transparent',
};

const sizeStyle = {
  large: 'w-full',
  medium: 'w-2/3',
  small: 'w-1/3',
};

const fontStyle = {
  bold: 'text-base font-bold',
  normal: 'text-base',
  description: 'text-sm',
};

export default function Button({ type, size, text, isDisabled, onClick, children }) {
  return (
    <button
      className={`${typeStyle[type] !== undefined ? typeStyle[type] : typeStyle['default']} ${
        sizeStyle[size] !== undefined ? sizeStyle[size] : sizeStyle['large']
      } ${
        fontStyle[text] !== undefined ? fontStyle[text] : fontStyle['normal']
      } h-button cursor-pointer disabled:cursor-not-allowed border rounded-md flex justify-center items-center disabled:bg-gray-2 disabled:opacity-50 disabled:text-black disabled:border-black`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
