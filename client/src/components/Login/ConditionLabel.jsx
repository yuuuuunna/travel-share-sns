import PropTypes from 'prop-types';

ConditionLabel.propTypes = {
  message: PropTypes.string.isRequired,
  isSatisfied: PropTypes.bool.isRequired,
};

export default function ConditionLabel({ message, isSatisfied }) {
  return <span className={isSatisfied && 'hidden'}>{message}</span>;
}
