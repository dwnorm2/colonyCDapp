import React from 'react';

import DecisionOption, { DecisionOptionType } from './DecisionOption';

const displayName = 'DecisionHub';

interface Props {
  /** Array of decision options */
  options: DecisionOptionType[];
  /** Html input `name` attribute */
  name: string;
  /** Component renders mobile styles if true */
  isMobile?: boolean;
}

const DecisionHub = ({ options, name, isMobile = false }: Props) => (
  <div data-test="hubOptions">
    {options.map((option) => (
      <DecisionOption
        name={name}
        option={option}
        key={`row-${option.value}`}
        isMobile={isMobile}
      />
    ))}
  </div>
);

DecisionHub.displayName = displayName;

export default DecisionHub;
