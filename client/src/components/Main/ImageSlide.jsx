import { useImageSlide } from '../../hooks/useImageSlide';
import PropTypes from 'prop-types';
import { IoEllipseSharp } from 'react-icons/io5';
import noImage from '../../assets/images/noImage.png';

export default function ImageSlide({ images }) {
  const { onMouseDown, onMouseUp, onTouchStart, onTouchEnd, transformValue, currentPage } = useImageSlide(images);

  // ul의 width길이 동적으로 변환
  function widthSize(images) {
    return `${(images.length || 1) * 100}%`;
  }

  if (images.length > 5) {
    images.splice(5);
  }

  return (
    <div className="w-[327px] h-[303px] rounded-[10px] mb-[14px] overflow-hidden">
      <ul
        className={`flex transition-transform duration-300 ease-in-out`}
        onTouchEnd={onTouchEnd}
        onTouchStart={onTouchStart}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        style={{
          transform: `translateX(${transformValue}px)`,
          width: widthSize(images),
        }}
      >
        {images.length === 0 ? (
          <li className="w-[327px] h-[303px] bg-gray-3 border border-gray-3 ">
            <img src={noImage} alt="thumbnail" className="object-cover h-full w-full rounded-[10px]" />
          </li>
        ) : (
          images.map((image, index) => (
            <li key={index} className="w-[327px] h-[303px] border bg-gray-3  border-gray-3">
              <img
                src={image === 'default' ? noImage : image || noImage}
                alt="thumbnail"
                className="object-cover h-full w-full  rounded-[10px]"
              />
            </li>
          ))
        )}
      </ul>
      <div className="absolute bottom-[14px] flex justify-center inset-x-0 items-center">
        {Array.from({ length: images.length }, (_, index) => (
          <IoEllipseSharp
            key={index}
            className={` ${currentPage === index ? 'text-primary text-[12px]' : 'text-white text-[8px]'} inline mx-1`}
          />
        ))}
      </div>
    </div>
  );
}

ImageSlide.propTypes = {
  images: PropTypes.array.isRequired,
};
