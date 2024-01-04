import Input from '../commons/Input';
import Eye from '../../assets/Eye';

import PropTypes from 'prop-types';
import EyeSlash from '../../assets/EyeSlash';

import { useState } from 'react';

InputPassword.propTypes = {
  value: PropTypes.string,
  onChangeFunc: PropTypes.func,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  isValid: PropTypes.bool,
};

InputPassword.defaultProps = {
  value: '',
  placeholder: '',
  name: '',
  isValid: true,
};

export default function InputPassword({ value, onChangeFunc, placeholder, name, isValid }) {
  const [inputType, setInputType] = useState('password');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <div className="relative">
      <Input
        type={'password'}
        value={value}
        inputType={inputType}
        name={name}
        placeholder={placeholder}
        onChangeFunc={onChangeFunc}
        isValid={isValid}
      />
      {isPasswordVisible && (
        <EyeSlash
          className="w-4 h-4 text-darkgray absolute scale-150 right-3.5 top-3.5"
          onClick={() => {
            setInputType('password');
            setIsPasswordVisible(false);
          }}
        />
      )}
      {!isPasswordVisible && (
        <Eye
          className="w-4 h-4 text-darkgray absolute scale-150 right-3.5 top-[16px]"
          onClick={() => {
            setInputType('text');
            setIsPasswordVisible(true);
          }}
        />
      )}
    </div>
  );
}
