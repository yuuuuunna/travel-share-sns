import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoOptionsOutline, IoSearchOutline } from 'react-icons/io5';
import Header from '../../components/Main/Header';
import PostItem from '../../components/Main/PostItem';
import postsAPI from '../../services/posts';
import { PATH } from '../../constants/path';

export default function Main() {
  const [data, setData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const cityValue = queryParams.get('city');
  const tagValue = queryParams.get('tag');
  const sortValue = queryParams.get('sort');

  useEffect(() => {
    postsAPI.getAllPosts({ tag: tagValue, sort: sortValue, city: cityValue }).then((Posts) => {
      const receivedData = Posts.data.posts;
      setData(receivedData);
    });
  }, [location, cityValue, tagValue, sortValue]);

  return (
    <>
      <div className="w-full h-screen flex justify-center">
        <div className="w-mobile flex flex-col">
          <div>
            <Header />
            <div className="mx-[24px]">
              <div className="mx-auto">
                <div className="mb-[22px] flex">
                  <div className="w-[264px] h-[52px] border rounded-[26px] border-gray-4 bg-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] mr-[11px] flex items-center">
                    <button className="w-[264px] h-[52px] flex items-center" onClick={() => navigate(PATH.search)}>
                      <div className="mr-[18px] pl-[20px]">
                        <IoSearchOutline size="20px" />
                      </div>
                      {cityValue ? (
                        <p> {cityValue}</p>
                      ) : (
                        <span>
                          <div className="text-sm">어디로 여행가세요?</div>
                          <div className="text-[10px] text-gray-1 text-left">여행지를 알려주세요.</div>
                        </span>
                      )}
                    </button>
                  </div>
                  <button
                    className={`w-[52px] h-[52px] border border-gray-4 ${
                      tagValue || sortValue ? 'bg-primary' : 'bg-white'
                    } rounded-full flex justify-center items-center  drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]`}
                    onClick={() => navigate(PATH.filter, { state: { cityValue, tagValue, sortValue } })}
                  >
                    <IoOptionsOutline
                      className={`text-[20px] ${tagValue || sortValue ? 'text-white' : 'text-black'}`}
                    />
                  </button>
                </div>
                <PostItem data={data} filter={tagValue} />
              </div>
            </div>
            <div className="w-full h-[64px]"></div>
          </div>
        </div>
      </div>
      )
    </>
  );
}
