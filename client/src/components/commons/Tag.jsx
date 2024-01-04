import PropTypes from 'prop-types';

export default function Tag({ tags, whiteMode, handleRemoveTag }) {
  return (
    <div className="flex flex-wrap text-[14px]">
      {tags.map((tag, index) => (
        <span
          key={'teg-' + index}
          className={`${
            whiteMode ? 'text-primary bg-white' : 'text-white bg-primary'
          } rounded px-[6px] py-[1px] mb-[6px] mr-[4px] hover:cursor-pointer `}
          onClick={() => (handleRemoveTag ? handleRemoveTag(tag) : {})}
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}

Tag.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  whiteMode: PropTypes.bool,
  handleRemoveTag: PropTypes.func,
};
