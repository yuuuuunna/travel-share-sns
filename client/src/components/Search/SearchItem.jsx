import PropTypes from 'prop-types';

import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export default function SearchItem({ keyword, onRemove }) {
  const navigate = useNavigate();
  function onRemoveHandler() {
    onRemove(keyword);
  }

  return (
    <div>
      <div className="relative">
        <div className="w-full h-[52px] flex justify-between items-center px-[24px]">
          <p
            className=" flex-1 py-2 px-4  rounded-full cursor-pointer hover:border hover:border-none hover:bg-slate-50"
            onClick={() => navigate(`/search?city=${keyword}`)}
          >
            {keyword}
          </p>
          <button onClick={onRemoveHandler}>
            <IoClose />
          </button>
        </div>
      </div>
    </div>
  );
}

SearchItem.propTypes = {
  keyword: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};
