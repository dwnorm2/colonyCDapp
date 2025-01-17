import React, { useRef } from 'react';
import { MessageDescriptor } from 'react-intl';

import { Select } from '~shared/Fields';
import { SelectOption } from '~shared/Fields/Select';

import { Appearance } from './types';

const displayName = 'common.ColonyMembers.MembersFilter.Filter';

interface Props {
  appearance?: Appearance;
  name: string;
  options?: SelectOption[];
  label: string | MessageDescriptor;
  onFilterChange: (name, value) => void;
}

const Filter = ({
  appearance,
  name,
  options,
  label,
  onFilterChange,
}: Props) => {
  const selectRef = useRef<HTMLDivElement>(null);

  const scrollIntoView = () => {
    selectRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      onClick={scrollIntoView}
      ref={selectRef}
      role="button"
      tabIndex={0}
      onKeyUp={scrollIntoView}
    >
      <Select
        onChange={(value) => onFilterChange(name, value)}
        appearance={appearance}
        name={name}
        options={options}
        label={label}
      />
    </div>
  );
};

Filter.displayName = displayName;

export default Filter;
