import React, { FC, useState } from 'react';
import clsx from 'clsx';

import { useAppContext, useTablet } from '~hooks';
import { formatText } from '~utils/intl';
import { splitWalletAddress } from '~utils/splitWalletAddress';
import Icon from '~shared/Icon';
import ThemeSwitcher from '~common/Extensions/ThemeSwitcher';
import Button from '~v5/shared/Button';
import PopoverBase from '~v5/shared/PopoverBase';
import Link from '~v5/shared/Link';
import TitleLabel from '~v5/shared/TitleLabel';

import WalletConnectedTopMenu from '../WalletConnectedTopMenu';
import UserSubmenu from '../UserSubmenu';

import styles from './UserMenu.module.css';
import { userMenuItems } from './consts';
import { UserMenuProps } from './types';

const displayName = 'common.Extensions.UserNavigation.partials.UserMenu';

const UserMenu: FC<UserMenuProps> = ({
  tooltipProps,
  setTooltipRef,
  isWalletConnected,
  user,
  isVerified,
  walletAddress,
}) => {
  const isTablet = useTablet();
  const { connectWallet, disconnectWallet } = useAppContext();
  const { profile } = user || {};
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const iconName = isTablet ? 'caret-down' : 'caret-right';
  const iconSize = isTablet ? 'small' : 'extraSmall';

  return (
    <PopoverBase
      setTooltipRef={setTooltipRef}
      tooltipProps={tooltipProps}
      withTooltipStyles={!isTablet}
      classNames={clsx(
        'w-full px-0 py-6 bg-base-white h-[calc(100vh-var(--top-content-height)-1px)] md:h-auto !top-[calc(100%+1px)] md:!top-auto md:rounded-lg md:border md:border-gray-100 md:max-w-[20.125rem] md:shadow-default',
        {
          '!translate-y-0 overflow-hidden': isTablet,
        },
      )}
    >
      <div
        className={clsx('transition-transform', {
          '-translate-x-0': !activeSubmenu,
          '-translate-x-[100vw] absolute': activeSubmenu,
        })}
      >
        {walletAddress ? (
          <div className="px-6">
            <WalletConnectedTopMenu
              userName={
                profile?.displayName ??
                splitWalletAddress(user?.walletAddress ?? '')
              }
              isVerified={isVerified}
              walletAddress={walletAddress}
              avatar={profile?.thumbnail || profile?.avatar || ''}
            />
          </div>
        ) : (
          <div className="px-6">
            <div className={styles.mobileButtons}>
              <Button
                mode="tertiary"
                size="small"
                isFullRounded
                iconName="cardholder"
                iconSize="extraTiny"
              >
                {formatText({ id: 'connectWallet' })}
              </Button>
              <Button
                mode="tertiary"
                size="small"
                isFullRounded
                iconName="list"
                iconSize="extraTiny"
              >
                {formatText({ id: 'help' })}
              </Button>
            </div>
            <div className="w-full pb-4 mb-6 border-b border-b-gray-200 sm:pb-3 sm:mb-5">
              <Button mode="quinary" isFullSize onClick={connectWallet}>
                {formatText({ id: 'connectWallet' })}
              </Button>
            </div>
          </div>
        )}
        <div className="w-full px-6 pb-4 mb-6 border-b border-b-gray-200 sm:pb-3">
          <TitleLabel text={formatText({ id: 'userMenu.optionsTitle' })} />
          <ul className="text-left">
            {userMenuItems.map(({ id, link, icon, name: itemName }) => (
              <li key={id} className="mb-2 last:mb-0 sm:mb-0">
                {link ? (
                  <Link to={link} className="navigation-link">
                    <Icon name={icon} appearance={{ size: iconSize }} />
                    <p className="ml-2">{formatText({ id: itemName })}</p>
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="navigation-link"
                    onClick={() => setActiveSubmenu(itemName)}
                    aria-expanded={activeSubmenu === itemName}
                    aria-controls="actionsWithVisibility"
                  >
                    <span className="flex items-center shrink-0 mr-2 sm:mr-0 flex-grow">
                      <Icon name={icon} appearance={{ size: iconSize }} />
                      <p className="ml-2">{formatText({ id: itemName })}</p>
                    </span>
                    <Icon name={iconName} appearance={{ size: 'extraTiny' }} />
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="px-6">
          {isWalletConnected && (
            <div className="w-full mb-4 sm:mb-3">
              <TitleLabel text={formatText({ id: 'userMenu.other' })} />
              <div className="navigation-link">
                <Icon name="plugs" appearance={{ size: iconSize }} />
                <button
                  type="button"
                  className="ml-2"
                  onClick={disconnectWallet}
                >
                  {formatText({ id: 'userMenu.disconnectWalletTitle' })}
                </button>
              </div>
            </div>
          )}
          <ThemeSwitcher />
        </div>
      </div>
      <div
        className={clsx('transition-transform', {
          'translate-x-0': activeSubmenu,
          'translate-x-full': !activeSubmenu,
        })}
      >
        {activeSubmenu && (
          <div className="px-6">
            <button
              type="button"
              aria-label={formatText({ id: 'ariaLabel.backToMainMenu' })}
              className={clsx(styles.buttonBack, 'group text-4')}
              onClick={() => setActiveSubmenu(null)}
            >
              <Icon name="caret-left" appearance={{ size: 'extraExtraTiny' }} />

              <TitleLabel
                className="ml-2"
                text={formatText({ id: activeSubmenu })}
              />
            </button>
            <UserSubmenu submenuId={activeSubmenu} />
          </div>
        )}
      </div>
    </PopoverBase>
  );
};

UserMenu.displayName = displayName;

export default UserMenu;
