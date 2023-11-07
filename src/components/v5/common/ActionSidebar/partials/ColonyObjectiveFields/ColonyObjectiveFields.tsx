import React, { FC } from 'react';
import { defineMessages } from 'react-intl';

import ActionFormRow from '~v5/common/ActionFormRow';
import FormInputBase from '~v5/common/Fields/InputBase/FormInputBase';
import { formatText } from '~utils/intl';
import { useColonyContext } from '~hooks';

const displayName = 'v5.common.ActionsContent.partials.ColonyObjectiveFields';

const MSG = defineMessages({
  title: {
    id: `${displayName}.title`,
    defaultMessage: 'Objective title',
  },
  titlePlaceholder: {
    id: `${displayName}.titlePlaceholder`,
    defaultMessage: 'Enter a title',
  },
  description: {
    id: `${displayName}.description`,
    defaultMessage: 'Objective description',
  },
  descriptionPlaceholder: {
    id: `${displayName}.descriptionPlaceholder`,
    defaultMessage: 'Short objective overview',
  },
  progress: {
    id: `${displayName}.progress`,
    defaultMessage: 'Progress percentage',
  },
});

const ColonyObjectiveFields: FC = () => {
  const { colony } = useColonyContext();
  const { objective } = colony?.metadata || {};

  return (
    <>
      <ActionFormRow
        iconName="article"
        title={formatText(MSG.title)}
        fieldName="colonyObjectiveTitle"
      >
        <FormInputBase
          name="colonyObjectiveTitle"
          placeholder={formatText(MSG.titlePlaceholder)}
          mode="secondary"
          message={undefined}
          value={objective?.title}
        />
      </ActionFormRow>
      <ActionFormRow
        iconName="file-text"
        title={formatText(MSG.description)}
        fieldName="colonyObjectiveDescription"
      >
        <FormInputBase
          name="colonyObjectiveDescription"
          placeholder={formatText(MSG.descriptionPlaceholder)}
          mode="secondary"
          message={undefined}
          value={objective?.description}
        />
      </ActionFormRow>
      <ActionFormRow
        iconName="percent"
        title={formatText(MSG.progress)}
        fieldName="colonyObjectiveProgress"
      >
        <FormInputBase
          type="number"
          max={100}
          name="colonyObjectiveProgress"
          placeholder="0"
          suffix={<span className="text-md">%</span>}
          mode="secondary"
          autoWidth
          message={undefined}
          value={objective?.progress}
        />
      </ActionFormRow>
    </>
  );
};

ColonyObjectiveFields.displayName = displayName;

export default ColonyObjectiveFields;