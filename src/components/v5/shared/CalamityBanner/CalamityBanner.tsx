import React, { FC } from 'react';

import { CalamityBannerProps } from './types';
import { useCalamityBanner } from './hooks';
import CalamityBannerContent from './partials/CalamityBannerContent';

const displayName = 'v5.CalamityBanner';

const CalamityBanner: FC<CalamityBannerProps> = ({ items }) => {
  const { showBanner, setShowBanner, activeElement, handleBannerChange } =
    useCalamityBanner(items);

  return (
    <>
      {showBanner && (
        <div className="overflow-hidden relative min-h-[7.25rem] md:min-h-[4.25rem]">
          {items.map((item, index) => (
            <CalamityBannerContent
              {...{ ...item }}
              index={index}
              activeElement={activeElement}
              handleBannerChange={handleBannerChange}
              setShowBanner={setShowBanner}
              itemsLength={items.length}
            />
          ))}
        </div>
      )}
    </>
  );
};

CalamityBanner.displayName = displayName;

export default CalamityBanner;
