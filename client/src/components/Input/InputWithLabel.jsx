import PropTypes from 'prop-types';

InputWithLabel.propTypes = {
  labelText: PropTypes.string,
  InputComponent: PropTypes.node,
  validateMessage: PropTypes.string,
};

InputWithLabel.defaultProps = {
  labelText: '',
  validateMessage: '',
};

export default function InputWithLabel({ labelText, InputComponent, validateMessage }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-bold mb-3" htmlFor="email">
        {labelText}
      </label>
      {InputComponent}
      <span className="text-xs text-red">{validateMessage}</span>
    </div>
  );
}
