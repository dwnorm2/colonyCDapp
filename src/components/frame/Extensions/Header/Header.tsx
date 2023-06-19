import clsx from 'clsx';
import React from 'react';
import { useIntl } from 'react-intl';

import { useColonyContext, useMobile, useUserReputation } from '~hooks';
import {
  ColoniesDropdown,
  ColonyAvatarWrapper,
} from '~common/Extensions/ColonySwitcher';
import ColonyDropdownMobile from '~common/Extensions/ColonySwitcher/partials/ColonyDropdownMobile';
import Icon from '~shared/Icon';
import UserNavigation from '~common/Extensions/UserNavigation';
import MainNavigation from '~common/Extensions/MainNavigation';
import Button from '~shared/Extensions/Button';
import styles from './Header.module.css';
import { useHeader } from './hooks';
import { useExtensionsContext } from '~context/ExtensionsContext';
import NavigationTools from '~common/Extensions/NavigationTools/NavigationTools';

const displayName = 'frame.Extensions.Header';

const Header = () => {
  const isMobile = useMobile();
  const { formatMessage } = useIntl();
  const { colony } = useColonyContext();
  const {
    colonyToDisplayAddress,
    colonyToDisplay,
    sortByDate,
    userLoading,
    user,
    wallet,
    getTooltipProps,
    setTooltipRef,
    mainMenuGetTooltipProps,
    mainMenuSetTooltipRef,
    mainMenuSetTriggerRef,
    isMainMenuVisible,
    setTriggerRef,
    visible,
  } = useHeader();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isExtensionInstalling } = useExtensionsContext();

  const { profile } = user || {};
  const { colonyAddress, nativeToken } = colony || {};
  const { userReputation, totalReputation } = useUserReputation(
    colonyAddress,
    wallet?.address,
  );

  const { items: watchlist = [] } = user?.watchlist || {};

  const isCloseButtonVisible = (isMainMenuVisible || visible) && isMobile;

  return (
    <header>
      <div className="bg-base-white w-full flex min-h-[5rem] sm:min-h-[6rem] justify-center px-6">
        <div className="flex items-center justify-between max-w-[90rem] w-full">
          <div className="mr-5 sm:mr-10">
            <div className="flex justify-between relative">
              <button
                aria-label="Open dropdown"
                ref={setTriggerRef}
                className="flex items-center justify-between transition-all duration-normal hover:text-gray-600"
                type="button"
              >
                <ColonyAvatarWrapper
                  isOpen={visible || isMainMenuVisible}
                  isMobile={isMobile}
                  colonyToDisplayAddress={colonyToDisplayAddress}
                  colonyToDisplay={
                    isCloseButtonVisible ? colonyToDisplay : undefined
                  }
                />
              </button>
              {visible && (
                <div className="h-auto absolute top-[3.5rem] sm:top-[2.3rem]">
                  {!isMobile && (
                    <div
                      ref={setTooltipRef}
                      {...getTooltipProps({
                        className: clsx(
                          `${styles.tooltipContainer} p-1 flex justify-start z-[9999] tooltip-container`,
                          {
                            'w-[26.75rem] border-none shadow-none': isMobile,
                            'w-[15.1875rem]': !isMobile,
                          },
                        ),
                      })}
                    >
                      {!!watchlist.length && !userLoading && (
                        <ColoniesDropdown
                          watchlist={[...watchlist].sort(sortByDate)}
                        />
                      )}
                    </div>
                  )}
                  {isMobile && (
                    <div
                      ref={setTooltipRef}
                      {...getTooltipProps({
                        className: clsx(`flex justify-start z-[9999]`),
                      })}
                    >
                      <ColonyDropdownMobile
                        isOpen={visible}
                        userLoading={userLoading}
                      >
                        <div className={styles.mobileButtons}>
                          <NavigationTools
                            // @TODO Help and account label
                            // buttonLabel={formatMessage({
                            //   id: 'helpAndAccount',
                            // })}
                            nativeToken={nativeToken}
                            totalReputation={totalReputation}
                            userName={profile?.displayName || user?.name || ''}
                            userReputation={userReputation}
                            user={user}
                          />
                        </div>
                        {!!watchlist.length && (
                          <ColoniesDropdown
                            watchlist={[...watchlist].sort(sortByDate)}
                            isMobile={isMobile}
                          />
                        )}
                      </ColonyDropdownMobile>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between w-full items-center">
            {!visible && (
              <button
                type="button"
                className={clsx('items-center flex sm:hidden', {
                  'opacity-100 visible': !isMainMenuVisible,
                  'opacity-0 invisible': isMainMenuVisible,
                })}
                ref={mainMenuSetTriggerRef}
                aria-label={formatMessage({ id: 'ariaLabel.openMenu' })}
              >
                <Icon name="list" appearance={{ size: 'tiny' }} />
                <p className="text-sm font-medium ml-1">
                  {formatMessage({ id: 'menu' })}
                </p>
              </button>
            )}
            <MainNavigation
              setTooltipRef={mainMenuSetTooltipRef}
              tooltipProps={mainMenuGetTooltipProps}
              isMenuOpen={isMainMenuVisible}
            />
            <div className="block ml-auto">
              {isCloseButtonVisible ? (
                <Button
                  className="md:border-gray-200 md:hover:border-blue-400 px-4 py-2.5 border-base-white"
                  mode="quinary"
                  isFullRounded
                >
                  <Icon name="close" appearance={{ size: 'tiny' }} />
                </Button>
              ) : (
                <UserNavigation />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.displayName = displayName;

export default Header;
