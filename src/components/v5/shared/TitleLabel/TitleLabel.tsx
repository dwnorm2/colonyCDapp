import React, { FC } from 'react';
import clsx from 'clsx';

import { TitleLabelProps } from './types';
import { formatText } from '~utils/intl';

const displayName = 'v5.TitleLabel';

const TitleLabel: FC<TitleLabelProps> = ({ text, className }) => {
  if (!text) {
    return null;
  }

  const textLabel = formatText(text);

  return (
    <span
      className={clsx(
        className,
        'block text-gray-400 text-4 uppercase group-hover:text-blue-400 transition-all duration-normal',
      )}
    >
      {textLabel}
    </span>
  );
};

TitleLabel.displayName = displayName;

export default TitleLabel;
