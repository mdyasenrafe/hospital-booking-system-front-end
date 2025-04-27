import React from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';

type keyboardAwareViewProps = {
  children: React.ReactNode;
};

export const KeyboardAwareView: React.FC<keyboardAwareViewProps> = ({
  children,
}) => {
  return (
    <KeyboardAvoidingView behavior={'padding'} style={{flex: 1}}>
      {children}
    </KeyboardAvoidingView>
  );
};
