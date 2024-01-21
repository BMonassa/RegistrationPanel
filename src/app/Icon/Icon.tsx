import React from 'react';

import { primary } from '../constants/colors';

interface IconProps {
  name: string;
  size?: IconSizeProps['iconSizes'];
  color?: string;
  bundle?: 'MaterialCommunityIcons' | 'MaterialIcons';
}

type IconSizeProps = {
  iconSizes: keyof typeof IconSizes;
};

const IconSizes = {
  small: 16,
  medium: 20,
  large: 24,
  huge: 28,
  giant: 36
};

export default function ({
  size = 'medium',
  name,
  color,
  bundle = 'MaterialIcons'
}: IconProps) {
  if (bundle === 'MaterialCommunityIcons') {
    return (
      <MaterialCommunityIcons
        name={name}
        size={IconSizes[size]}
        color={color || primary}
      />
    );
  }
  return (
    <MaterialIcons
      name={name}
      size={IconSizes[size]}
      color={color || primary}
    />
  );
}
