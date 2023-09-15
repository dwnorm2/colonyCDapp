import { SearchSelectOptionProps } from '~v5/shared/SearchSelect/types';

export interface UserSelectHookProps extends SearchSelectOptionProps {
  loading: boolean;
  isAddressVerified: boolean;
  isUserVerified: boolean;
}
