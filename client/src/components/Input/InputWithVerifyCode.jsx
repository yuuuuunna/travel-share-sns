import { useEffect, useRef, useState } from 'react';

import InputWithLabel from './InputWithLabel';
import Input from '../commons/Input';

import PropTypes from 'prop-types';

InputWithVerifyCode.propTypes = {
  time: PropTypes.number,
  value: PropTypes.string,
  onChangeFunc: PropTypes.func,
  onExpire: PropTypes.func,
};

InputWithVerifyCode.defaultProps = {
  time: 300,
  value: '',
};

export default function InputWithVerifyCode({ time, value, onChangeFunc, onExpire }) {
  const totalTime = useRef(time);
  const timerId = useRef(null);
  const [minute, setMinute] = useState(parseInt(totalTime.current / 60));
  const [second, setSecond] = useState(0);

  useEffect(() => {
    timerId.current = setInterval(() => {
      setMinute(parseInt(totalTime.current / 60));
      setSecond(totalTime.current % 60);
      totalTime.current -= 1;
    }, 1000);

    return () => clearInterval(timerId.current);
  }, []);

  useEffect(() => {
    if (totalTime.current < 0) {
      clearInterval(timerId.current);
      onExpire();
    }
  }, [second, onExpire]);

  return (
    <div>
      <InputWithLabel
        labelText={'인증번호 입력'}
        InputComponent={
          <div className="flex flex-row justify-between">
            <Input
              value={value}
              type={'default'}
              size={'large-medium'}
              name={'verification-code'}
              placeholder={'인증번호 입력'}
              onChangeFunc={onChangeFunc}
              isValid={true}
            />
            <span className=" text-red inline-block grow self-center text-center">
              {minute}:{second.toString().padStart(2, '0')}
            </span>
          </div>
        }
      />
    </div>
  );
}
