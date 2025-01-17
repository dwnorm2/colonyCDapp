import React, { FC } from 'react';

import { useSetPageHeadingTitle } from '~context';
import { formatText } from '~utils/intl';
import WidgetBoxList from '~v5/common/WidgetBoxList';

import { useActivityFeedWidgets } from './hooks';

const displayName = 'v5.pages.ActivityPage';

const ActivityPage: FC = () => {
  useSetPageHeadingTitle(formatText({ id: 'activityPage.title' }));

  const widgets = useActivityFeedWidgets();

  return (
    <div className="flex flex-col gap-4 sm:gap-[1.125rem] w-full">
      <WidgetBoxList items={widgets} />
      <div>add table here</div>
    </div>
  );
};

ActivityPage.displayName = displayName;

export default ActivityPage;
