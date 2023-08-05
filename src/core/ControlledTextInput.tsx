import {FieldValues, useController, UseControllerProps} from 'react-hook-form';
import {StyleProp, TextStyle} from 'react-native/types';
import {TextInput, TextInputProps} from 'react-native-paper';
import Box from './Box';
import Text from './Text';
import React from 'react';

type Props<T extends FieldValues> = TextInputProps &
  UseControllerProps<T> & {
    inputStyle?: StyleProp<TextStyle>;
    errorMessage?: string;
    showError?: boolean;
  };

function ControlledTextInput<T extends FieldValues>({
  control,
  name,
  defaultValue,
  rules,
  showError = true,
  ...rest
}: Props<T>) {
  const {field, fieldState} = useController<T>({
    control,
    name,
    defaultValue,
    rules,
  });

  return (
    <Box>
      <TextInput
        {...rest}
        value={field.value?.toString()}
        onChangeText={field.onChange}
        error={
          showError && (!!fieldState.error || !!rest.errorMessage || rest.error)
        }
        mode={rest.mode ?? 'outlined'}
      />
      {showError && (fieldState.error || rest.errorMessage) ? (
        <Text
          marginTop="xs"
          marginHorizontal="m"
          variant={'bodySmall'}
          color="error">
          {fieldState.error?.message ?? rest.errorMessage}
        </Text>
      ) : null}
    </Box>
  );
}

export default ControlledTextInput;
