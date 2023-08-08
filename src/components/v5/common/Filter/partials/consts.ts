import { FilterOptionProps } from '../types';

export const contributorTypes: FilterOptionProps[] = [
  {
    value: 'top',
    label: { id: 'filter.option.top' },
  },
  {
    value: 'dedicated',
    label: { id: 'filter.option.dedicated' },
  },
  {
    value: 'active',
    label: { id: 'filter.option.active' },
  },
  {
    value: 'contributorVerified',
    label: { id: 'filter.option.verified' },
  },
  {
    value: 'general',
    label: { id: 'filter.option.general' },
  },
];

export const statusTypes: FilterOptionProps[] = [
  {
    value: 'banned',
    label: { id: 'filter.option.banned' },
  },
  {
    value: 'notBanned',
    label: { id: 'filter.option.notBanned' },
  },
];

export const teamTypes: FilterOptionProps[] = [
  {
    value: 'Root',
    label: { id: 'filter.option.root' },
  },
  {
    value: 'Business',
    label: { id: 'filter.option.business' },
  },
  {
    value: 'Product',
    label: { id: 'filter.option.product' },
  },
  {
    value: 'Development',
    label: { id: 'filter.option.development' },
  },
  {
    value: 'Design',
    label: { id: 'filter.option.productDesign' },
  },
  {
    value: 'Devops',
    label: { id: 'filter.option.devops' },
  },
];

export const reputationType: FilterOptionProps[] = [
  {
    value: 'highestToLowest',
    label: { id: 'filter.option.highest.to.lowest' },
  },
  {
    value: 'lowestToHighest',
    label: { id: 'filter.option.lowest.to.highest' },
  },
];

export const permissionsTypes: FilterOptionProps[] = [
  {
    value: 'permissionRoot',
    label: { id: 'filter.option.root' },
  },
  {
    value: 'administration',
    label: { id: 'filter.option.administration' },
  },
  {
    value: 'arbitration',
    label: { id: 'filter.option.arbitration' },
  },
  {
    value: 'architecture',
    label: { id: 'filter.option.architecture' },
  },
  {
    value: 'funding',
    label: { id: 'filter.option.funding' },
  },
  {
    value: 'recovery',
    label: { id: 'filter.option.recovery' },
  },
];
