/**
 * @author Gary Franco
 **/
import React, { useContext, useState } from 'react';
import { Platform, Switch } from 'react-native';
import { ThemeContext } from '../../context/theme/ThemeContext';

interface CustomSwitchProps {
  isOn: boolean;
  onChange: (value: boolean) => void;
}

export const CustomSwitch = ({ isOn, onChange }: CustomSwitchProps) => {
  const [isEnabled, setIsEnabled] = useState(isOn);
  const { theme } = useContext(ThemeContext);
  const toggleSwitch = () => {
    console.log('toggleSwitch');
    setIsEnabled(!isEnabled);
    onChange(!isEnabled);
  };

  return (
    <Switch
      trackColor={{ false: '#D9D9DB', true: '#D9D9DB' }}
      thumbColor={theme.palette.white}
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  );
};
