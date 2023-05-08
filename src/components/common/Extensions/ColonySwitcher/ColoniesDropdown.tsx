import React, { FC } from 'react';
import { Colony } from '~types';
import ColonyItem from './ColonyItem';
import ColonyAvatar from '~shared/ColonyAvatar';
import { IColoniesDropdown } from './types';
import { useSelectedColony } from './hooks';

const displayName = 'common.Extensions.ColonySwitcher.ColoniesDropdown';

const ColoniesDropdown: FC<IColoniesDropdown> = ({ watchlist = [] }) => {
  const { colonyToDisplay, colonyToDisplayAddress } = useSelectedColony(watchlist);

  return (
    <div className="h-[24.75rem] p-1 w-full">
      <div className="flex items-center p-2 md:ml-4">
        <div className="flex mr-2">
          <ColonyAvatar colony={colonyToDisplay as Colony} colonyAddress={colonyToDisplayAddress || ''} size="xxs" />
        </div>
        <div className="font-normal text-md text-gray-900">
          {colonyToDisplay?.metadata?.displayName || colonyToDisplay?.name}
        </div>
      </div>
      <div className="w-full h-[0.0625rem] bg-gray-200 my-2" />
      <div className="uppercase text-gray-400 text-xs font-medium ml-6">Gnosis</div>
      {watchlist.map((item) => (
        <ColonyItem colony={item?.colony as Colony} key={item?.colony?.colonyAddress} chainName="gnosis" />
      ))}
    </div>
  );
};

ColoniesDropdown.displayName = displayName;

export default ColoniesDropdown;
