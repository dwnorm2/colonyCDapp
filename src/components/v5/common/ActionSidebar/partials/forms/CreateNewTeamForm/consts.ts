import { InferType, object, string } from 'yup';
import {
  MAX_ANNOTATION_LENGTH,
  MAX_COLONY_DISPLAY_NAME,
  MAX_DOMAIN_PURPOSE_LENGTH,
} from '~constants';
import { ACTION_BASE_VALIDATION_SCHEMA } from '~v5/common/ActionSidebar/consts';

export const validationSchema = object()
  .shape({
    teamName: string()
      .trim()
      .max(MAX_COLONY_DISPLAY_NAME)
      .required(() => 'Team name required.'),
    domainPurpose: string().trim().max(MAX_DOMAIN_PURPOSE_LENGTH).notRequired(),
    domainColor: string().notRequired(),
    createdIn: string().defined(),
    decisionMethod: string().defined(),
    description: string().max(MAX_ANNOTATION_LENGTH).notRequired(),
  })
  .defined()
  .concat(ACTION_BASE_VALIDATION_SCHEMA);

export type CreateNewTeamFormValues = InferType<typeof validationSchema>;
