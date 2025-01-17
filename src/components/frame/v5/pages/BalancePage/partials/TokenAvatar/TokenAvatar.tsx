import React, { FC } from 'react';
import clsx from 'clsx';
import { useMobile } from '~hooks';
import TokenIcon from '~shared/TokenIcon';
import CopyableAddress from '~shared/CopyableAddress';
import IconTooltip from '~shared/IconTooltip';
import { TokenAvatarProps } from './types';
import Modal from '~v5/shared/Modal';
import useToggle from '~hooks/useToggle';
import Portal from '~v5/shared/Portal';
import Card from '~v5/shared/Card';
import { useRelativePortalElement } from '~hooks/useRelativePortalElement';

const displayName = 'v5.pages.BalancePage.partials.TokenAvatar';
// @TODO: implement token popover according to the design
const TokenAvatar: FC<TokenAvatarProps> = ({
  token,
  tokenAddress,
  nativeTokenStatus,
}) => {
  const isMobile = useMobile();
  const isTokenNative = token.tokenAddress === tokenAddress;

  const [
    isTokenModalOpened,
    { toggleOff: toggleTokenModalOff, toggleOn: toggleTokenModalOn },
  ] = useToggle();
  const [isTokenVisible, { toggle: toggleToken, registerContainerRef }] =
    useToggle();

  const { portalElementRef, relativeElementRef } = useRelativePortalElement<
    HTMLButtonElement,
    HTMLDivElement
  >([isTokenVisible], {
    top: 8,
  });

  const content = (
    <div className="flex gap-4 items-center">
      <TokenIcon token={token} size="xs" />
      <div className="flex items-center gap-1">
        {token.name ? (
          <span
            className={clsx('text-gray-900 font-medium', {
              'truncate max-w-[6.25rem] md:max-w-full': !isTokenModalOpened,
              'md:whitespace-normal': isTokenModalOpened,
            })}
          >
            {token.name}
          </span>
        ) : (
          <CopyableAddress>{token.tokenAddress}</CopyableAddress>
        )}
        {isTokenNative && !nativeTokenStatus?.unlocked && (
          <span>
            <IconTooltip
              icon="lock"
              tooltipText={{ id: 'tooltip.lockedToken' }}
              appearance={{ size: 'tiny' }}
            />
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex relative">
      <button
        type="button"
        ref={relativeElementRef}
        className="flex gap-4 items-center"
        onClick={isMobile ? toggleTokenModalOn : toggleToken}
      >
        {content}
      </button>
      {isMobile ? (
        <Modal
          isFullOnMobile={false}
          onClose={toggleTokenModalOff}
          isOpen={isTokenModalOpened}
        >
          {content}
        </Modal>
      ) : (
        isTokenVisible && (
          <Portal>
            <Card
              className="absolute p-1 z-[60]"
              hasShadow
              rounded="s"
              ref={(ref) => {
                registerContainerRef(ref);
                portalElementRef.current = ref;
              }}
            >
              {content}
            </Card>
          </Portal>
        )
      )}
    </div>
  );
};

TokenAvatar.displayName = displayName;

export default TokenAvatar;
