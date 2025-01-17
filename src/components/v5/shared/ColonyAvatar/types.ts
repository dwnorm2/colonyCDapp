import { ImgHTMLAttributes } from 'react';

export interface ColonyAvatarProps {
  chainIconName?: string;
  colonyImageProps?: ImgHTMLAttributes<HTMLImageElement>;
  className?: string;
  size?: 'default' | 'small';
}
