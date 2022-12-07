import { getExtensionHash } from '@colony/colony-js';
import { useMemo } from 'react';

import { supportedExtensionsConfig } from '~constants';
import {
  useGetColonyExtensionQuery,
  useGetCurrentExtensionVersionQuery,
} from '~gql';
import { AnyExtensionData } from '~types';

import useColonyContext from './useColonyContext';

interface UseExtensionDataReturn {
  extensionData: AnyExtensionData | null;
  loading: boolean;
}

/**
 * Hook for fetching extension data with a given extensionId
 * and mapping it into Installed or InstallableExtensionData object
 */
const useExtensionData = (extensionId: string): UseExtensionDataReturn => {
  const { colony } = useColonyContext();

  const extensionHash = getExtensionHash(extensionId);

  const { data, loading: extensionLoading } = useGetColonyExtensionQuery({
    variables: {
      colonyAddress: colony?.colonyAddress ?? '',
      extensionHash,
    },
    skip: !colony,
    fetchPolicy: 'cache-and-network',
  });
  const colonyExtension = data?.getExtensionByColonyAndHash?.items?.[0];

  const { data: versionData, loading: versionLoading } =
    useGetCurrentExtensionVersionQuery({
      variables: {
        extensionHash,
      },
      fetchPolicy: 'cache-and-network',
    });
  const { version } = versionData?.getCurrentVersionByItem?.items?.[0] || {};

  const extensionConfig = supportedExtensionsConfig.find(
    (e) => e.extensionId === extensionId,
  );

  const extensionData = useMemo<AnyExtensionData | null>(() => {
    if (!version || !extensionConfig) {
      return null;
    }

    return {
      ...colonyExtension,
      ...extensionConfig,
      availableVersion: version,
    };
  }, [colonyExtension, extensionConfig, version]);

  return {
    extensionData,
    loading: extensionLoading || versionLoading,
  };
};

export default useExtensionData;
