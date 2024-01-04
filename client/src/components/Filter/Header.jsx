import PropTypes from 'prop-types';

import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export default function Header({ title }) {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[56px] flex items-center justify-center px-[24px]">
      <p className="w-full h-full flex items-center justify-center font-bold">{title}</p>

      <IoClose size="24px" onClick={() => navigate(-1)} />
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
