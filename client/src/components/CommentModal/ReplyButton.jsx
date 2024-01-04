import PropTypes from 'prop-types';

export default function ReplyButton({ text, textColor, className }) {
  return <button className={`text-[12px] ${textColor} ${className}`}>{text}</button>;
}

ReplyButton.propTypes = {
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};
