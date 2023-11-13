import React, { FC } from 'react';
import { useCrateNewTeam } from './hooks';
import { ActionFormBaseProps } from '../../../types';
import ActionFormRow from '~v5/common/ActionFormRow';
import TeamColourField from '~v5/common/ActionSidebar/partials/TeamColourField';
import TeamsSelect from '~v5/common/ActionSidebar/partials/TeamsSelect';
import { FormCardSelect } from '~v5/common/Fields/CardSelect';
import { DECISION_METHOD_OPTIONS } from '../../consts';
import FormTextareaBase from '~v5/common/Fields/TextareaBase/FormTextareaBase';
import FormInputBase from '~v5/common/Fields/InputBase/FormInputBase';
import { useAdditionalFormOptionsContext } from '~context/AdditionalFormOptionsContext/AdditionalFormOptionsContext';
import { formatText } from '~utils/intl';
import DescriptionRow from '../../DescriptionRow';
import { MAX_DOMAIN_PURPOSE_LENGTH } from '~constants';

const displayName = 'v5.common.ActionSidebar.partials.CreateNewTeamForm';

const CreateNewTeamForm: FC<ActionFormBaseProps> = ({ getFormOptions }) => {
  const { readonly } = useAdditionalFormOptionsContext();

  useCrateNewTeam(getFormOptions);

  return (
    <>
      <ActionFormRow
        fieldName="teamName"
        iconName="user-list"
        title={formatText({ id: 'actionSidebar.teamName' })}
        tooltips={{
          label: {
            tooltipContent: formatText({
              id: 'actionSidebar.tooltip.createNewTeam.team.name',
            }),
          },
        }}
      >
        <FormInputBase
          name="teamName"
          placeholder={formatText({
            id: 'actionSidebar.placeholder.teamName',
          })}
          mode="secondary"
          readOnly={readonly}
        />
      </ActionFormRow>
      <ActionFormRow
        iconName="rocket"
        fieldName="domainPurpose"
        title={formatText({ id: 'actionSidebar.teamPurpose' })}
        isMultiLine
        tooltips={{
          label: {
            tooltipContent: formatText({
              id: 'actionSidebar.tooltip.createNewTeam.team.purpose',
            }),
          },
        }}
      >
        <FormTextareaBase
          name="domainPurpose"
          placeholder={formatText({
            id: 'actionSidebar.placeholder.purpose',
          })}
          maxCharNumber={MAX_DOMAIN_PURPOSE_LENGTH}
        />
      </ActionFormRow>
      <ActionFormRow
        iconName="paint"
        fieldName="domainColor"
        title={formatText({ id: 'actionSidebar.teamColour' })}
        tooltips={{
          label: {
            tooltipContent: formatText({
              id: 'actionSidebar.tooltip.createNewTeam.team.colour',
            }),
          },
        }}
      >
        <TeamColourField name="domainColor" />
      </ActionFormRow>
      <ActionFormRow
        iconName="scales"
        fieldName="decisionMethod"
        tooltips={{
          label: {
            tooltipContent: formatText({
              id: 'actionSidebar.tooltip.decisionMethod',
            }),
          },
        }}
        title={formatText({ id: 'actionSidebar.decisionMethod' })}
      >
        <FormCardSelect
          name="decisionMethod"
          options={DECISION_METHOD_OPTIONS}
          title={formatText({ id: 'actionSidebar.decisionMethod' })}
        />
      </ActionFormRow>
      <ActionFormRow
        iconName="house-line"
        fieldName="createdIn"
        tooltips={{
          label: {
            tooltipContent: formatText({
              id: 'actionSidebar.tooltip.createdIn',
            }),
          },
        }}
        title={formatText({ id: 'actionSidebar.createdIn' })}
      >
        <TeamsSelect name="createdIn" />
      </ActionFormRow>
      <DescriptionRow />
    </>
  );
};

CreateNewTeamForm.displayName = displayName;

export default CreateNewTeamForm;
