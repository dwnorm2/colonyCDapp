import React from 'react';
import clsx from 'clsx';

import { useWizardContext } from '~context/WizardContext';

import { WizardSubStep } from './WizardSidebarSubItem';

const displayName =
  'routes.WizardRoute.WizardSidebar.WizardSidebarItem.WizardSidebarItemFlowLine';

interface Props {
  stepId: number;
  subItems?: WizardSubStep[];
}

const WizardSidebarItemFlowLine = ({ stepId, subItems }: Props) => {
  const { currentStep } = useWizardContext();
  const lastSubid = subItems ? subItems[subItems.length - 1].id : 0;

  return (
    <div className="absolute w-2.5 flex flex-col items-center top-[13px] gap-2.5 h-[calc(100%+8px)]">
      <div
        className={clsx('w-px h-full bg-gray-900', {
          'h-6': currentStep < stepId || currentStep > lastSubid,
        })}
      />
    </div>
  );
};

WizardSidebarItemFlowLine.displayName = displayName;

export default WizardSidebarItemFlowLine;
