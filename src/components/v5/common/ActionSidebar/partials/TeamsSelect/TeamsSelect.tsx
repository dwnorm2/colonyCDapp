import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import clsx from 'clsx';
import { useController } from 'react-hook-form';

import SearchSelect from '~v5/shared/SearchSelect';
import useToggle from '~hooks/useToggle';
import TeamBadge from '~v5/common/Pills/TeamBadge';
import { useTeams } from '~hooks/useTeams';
import { TeamSelectProps } from './types';

const displayName = 'v5.common.ActionsContent.partials.TeamsSelect';

const TeamsSelect: FC<TeamSelectProps> = ({ name }) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
  });
  const selectedTeam = field.value;
  const isError = !!error;
  const teamsOptions = useTeams();
  const { formatMessage } = useIntl();
  const [
    isTeamSelectVisible,
    {
      toggle: toggleTeamSelect,
      toggleOff: toggleTeamSelectOff,
      registerContainerRef,
    },
  ] = useToggle();
  const selectedOption = teamsOptions.options.find(
    (option) => option.value === selectedTeam,
  );

  return (
    <div className="sm:relative w-full">
      <button
        type="button"
        className={clsx('flex text-md transition-colors hover:text-blue-400', {
          'text-gray-500': !isError,
          'text-negative-400': isError,
        })}
        onClick={toggleTeamSelect}
      >
        {selectedOption ? (
          <TeamBadge
            teamName={
              typeof selectedOption.label === 'object'
                ? formatMessage(selectedOption.label)
                : selectedOption.label
            }
          />
        ) : (
          formatMessage({ id: 'actionSidebar.selectTeam' })
        )}
      </button>
      {isTeamSelectVisible && (
        <SearchSelect
          ref={registerContainerRef}
          items={[teamsOptions]}
          isOpen={isTeamSelectVisible}
          onToggle={toggleTeamSelect}
          onSelect={(value) => {
            field.onChange(value);

            toggleTeamSelectOff();
          }}
        />
      )}
    </div>
  );
};

TeamsSelect.displayName = displayName;

export default TeamsSelect;
