import { notNull } from '~utils/arrays';
import {
  AvailablePermission,
  DomainWithPermissionsAndReputation,
} from './types';
import {
  ColonyContributor,
  ContributorReputation,
  ContributorRoles,
} from '~types';

const mergeDomains = (
  reputation: ContributorReputation[],
  permissions: ContributorRoles[],
) => {
  const domains: Record<string, DomainWithPermissionsAndReputation> = {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const { __typename, ...repInfo } of reputation) {
    domains[repInfo.domainId] = {
      ...repInfo,
      nativeId: repInfo.domain.nativeId,
      permissions: [],
      domainName:
        repInfo.domain.metadata?.name ?? `Domain ${repInfo.domain.nativeId}`,
    };
  }

  for (const permDomain of permissions) {
    const roles = Object.keys(permDomain).reduce((acc, key) => {
      if (!key.startsWith('role_') || !permDomain[key]) {
        return acc;
      }

      const role = Number(key.split('_')[1]) as AvailablePermission;

      if (permDomain[key]) {
        acc.push(role);
      }

      return acc;
    }, [] as AvailablePermission[]);

    if (domains[permDomain.domainId]) {
      domains[permDomain.domainId].permissions = roles;
    } else {
      domains[permDomain.domainId] = {
        nativeId: permDomain.domain.nativeId,
        domainId: permDomain.domainId,
        domainName:
          permDomain.domain?.metadata?.name ??
          `Domain ${permDomain.domain.nativeId}`,
        permissions: roles,
        reputationRaw: '0',
        reputationPercentage: 0,
      };
    }
  }

  return Object.values(domains).sort((a, b) => a.nativeId - b.nativeId);
};

const useContributorBreakdown = (contributor?: ColonyContributor | null) => {
  if (!contributor) {
    return [];
  }
  const rep = contributor.reputation?.items.filter(notNull) ?? [];
  const roles = contributor.roles?.items.filter(notNull) ?? [];

  return mergeDomains(rep, roles);
};

export default useContributorBreakdown;
