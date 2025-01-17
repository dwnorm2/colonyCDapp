import React, { useId } from 'react';
import clsx from 'clsx';

import { InputBaseProps } from './types';
import { FIELD_STATE } from '../consts';
import { useStateClassNames } from '../hooks';
import { useAdjustInputWidth } from './hooks';

const displayName = 'v5.common.Fields.InputBase';

const InputBase = React.forwardRef<HTMLInputElement, InputBaseProps>(
  (
    {
      className,
      wrapperClassName,
      state,
      message,
      prefix,
      suffix,
      mode = 'primary',
      disabled,
      stateClassNames: stateClassNamesProp,
      autoWidth = false,
      label,
      id: idProp,
      ...rest
    },
    ref,
  ) => {
    const defaultId = useId();
    const stateClassNames = useStateClassNames(
      {
        [FIELD_STATE.Error]:
          'border-negative-400 text-negative-400 focus:border-negative-400 placeholder:!text-negative-400',
      },
      stateClassNamesProp,
    );

    const inputRef = useAdjustInputWidth(autoWidth, ref);
    const id = idProp || defaultId;

    return (
      <div className={wrapperClassName}>
        <label
          className="text-gray-700 text-md font-medium mb-1.5"
          htmlFor={id}
        >
          {label}
        </label>
        {prefix}
        <input
          ref={inputRef}
          className={clsx(
            className,
            state ? stateClassNames[state] : undefined,
            'w-full text-gray-900 text-md outline-0 placeholder:text-gray-400',
            {
              'text-gray-400 pointer-events-none': disabled,
              'bg-base-white rounded border py-2 px-3.5 border-gray-300 focus:border-blue-200 focus:shadow-light-blue':
                mode === 'primary',
              'border-none': mode === 'secondary',
            },
          )}
          id={id}
          {...rest}
        />
        {suffix}
        <span
          className={clsx(
            'border-0 text-md',
            state ? stateClassNames[state] : undefined,
          )}
        >
          {message}
        </span>
      </div>
    );
  },
);

Object.assign(InputBase, { displayName });

export default InputBase;
