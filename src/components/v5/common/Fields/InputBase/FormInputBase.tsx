import React, { FC } from 'react';

import { useController } from 'react-hook-form';
import { FormInputBaseProps } from './types';
import { FIELD_STATE } from '../consts';
import InputBase from './InputBase';

const displayName = 'v5.common.Fields.FormInputBase';

const FormInputBase: FC<FormInputBaseProps> = ({ name, type, ...rest }) => {
  const {
    field: { onChange, value },
    fieldState: { invalid, error },
  } = useController({
    name,
  });

  return (
    <InputBase
      {...rest}
      type={type}
      value={value}
      onChange={(event) => {
        const { value: inputValue, valueAsNumber } = event.target;

        if (type === 'number') {
          onChange(Number.isNaN(valueAsNumber) ? 0 : valueAsNumber);
        } else {
          onChange(inputValue);
        }
      }}
      state={invalid ? FIELD_STATE.Error : undefined}
      message={error?.message}
    />
  );
};

FormInputBase.displayName = displayName;

export default FormInputBase;
