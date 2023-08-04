import React, { FC, PropsWithChildren, useRef, useState } from 'react';
import clsx from 'clsx';
import { useIntl } from 'react-intl';

import { useOnClickOutside } from 'usehooks-ts';
import styles from './ActionSidebar.module.css';
import Icon from '~shared/Icon';
import { useMobile } from '~hooks';
import Button, { TextButton } from '~v5/shared/Button';
import ActionSidebarRow from '../ActionSidebarRow';
import { useActionSidebarContext } from '~context/ActionSidebarContext';
import SearchSelect from '~v5/shared/SearchSelect';
import { useActionSidebar, useActionsList } from './hooks';
import { translateAction } from './utils';
import { Actions } from '~constants/actions';

const ActionSidebar: FC<PropsWithChildren> = ({ children }) => {
  const ref = useRef(null);
  const [isSidebarFullscreen, setIsSidebarFullscreen] = useState(false);
  const { formatMessage } = useIntl();
  const isMobile = useMobile();
  const { toggleActionSidebarOff, selectedAction, setSelectedAction } =
    useActionSidebarContext();
  const { isSelectVisible, toggleSelect, toggleSelectOff } = useActionSidebar();

  const actionsList = useActionsList();

  useOnClickOutside(ref, () => !isMobile && toggleActionSidebarOff());

  return (
    <div
      className={clsx(styles.sidebar, {
        'sm:max-w-[43.375rem]': !isSidebarFullscreen,
        'max-w-full': isSidebarFullscreen,
      })}
      ref={ref}
    >
      <div className="py-4 px-6 flex w-full items-center justify-between border-b border-gray-200">
        {isMobile ? (
          <button
            type="button"
            className={styles.button}
            onClick={toggleActionSidebarOff}
            aria-label={formatMessage({ id: 'ariaLabel.closeModal' })}
          >
            <Icon name="close" appearance={{ size: 'tiny' }} />
          </button>
        ) : (
          <button
            type="button"
            className={styles.button}
            onClick={() => setIsSidebarFullscreen((prevState) => !prevState)}
            aria-label={formatMessage({ id: 'ariaLabel.fullWidth' })}
          >
            <Icon
              name={
                isSidebarFullscreen ? 'arrow-right-line' : 'arrows-out-simple'
              }
              appearance={{ size: 'tiny' }}
            />
          </button>
        )}
        {children}
      </div>
      <div className="px-6 py-8">
        <input
          type="text"
          className={styles.titleInput}
          placeholder={formatMessage({ id: 'placeholder.title' })}
        />
        <ActionSidebarRow
          iconName="file-plus"
          title={{ id: 'actionSidebar.actionType' }}
        >
          <>
            {!selectedAction && (
              <>
                <button
                  type="button"
                  className="flex text-md text-gray-600 transition-colors hover:text-blue-400"
                  onClick={toggleSelect}
                >
                  {formatMessage({ id: 'actionSidebar.chooseActionType' })}
                </button>
                {isSelectVisible && (
                  <SearchSelect
                    onToggle={toggleSelectOff}
                    items={actionsList}
                    isOpen={isSelectVisible}
                  />
                )}
              </>
            )}
            {selectedAction && (
              <span className="text-md">
                {formatMessage({ id: translateAction(selectedAction) })}
              </span>
            )}
          </>
        </ActionSidebarRow>
      </div>
      <div className="mt-auto">
        <div className="p-6">
          <h4 className="text-1 pb-2">
            {formatMessage({ id: 'actionSidebar.popularActions' })}
          </h4>
          <div className="divider mb-2" />
          <ul>
            <li className="flex items-center mb-4">
              <TextButton
                text={{ id: 'actionSidebar.simplePayment' }}
                iconName="money"
                iconSize="extraSmall"
                mode="medium"
                className="text-gray-600 font-normal"
                onClick={() => setSelectedAction(Actions.SIMPLE_PAYMENT)}
              />
            </li>
            <li className="flex items-center mb-4">
              <TextButton
                text={{ id: 'actionSidebar.userPermission' }}
                iconName="wrench"
                iconSize="extraSmall"
                mode="medium"
                className="text-gray-600 font-normal"
              />
            </li>
            <li className="flex items-center mb-4">
              <TextButton
                text={{ id: 'actionSidebar.transferFunds' }}
                iconName="user-switch"
                iconSize="extraSmall"
                mode="medium"
                className="text-gray-600 font-normal"
                onClick={() => setSelectedAction(Actions.TRANSFER_FUNDS)}
              />
            </li>
            <li className="flex items-center">
              <TextButton
                text={{ id: 'actionSidebar.advancedPayments' }}
                iconName="coins"
                iconSize="extraSmall"
                mode="medium"
                className="text-gray-600 font-normal"
                onClick={() => setSelectedAction(Actions.ADVANCED_PAYMENT)}
              />
            </li>
          </ul>
        </div>
        <div className="flex items-center justify-end gap-2 p-6 border-t border-gray-200">
          <Button
            mode="primaryOutline"
            text={{ id: 'button.cancel' }}
            onClick={toggleActionSidebarOff}
          />
          <Button
            mode="primarySolid"
            disabled
            text={{ id: 'button.createAction' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ActionSidebar;
