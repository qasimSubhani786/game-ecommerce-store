import React from 'react';
import {colors} from '../../common/theme';
import Select from 'react-select';

export const CriteriaDropdown = ({
  options,
  dropdowntitle,
  onChangeOption,
  selectedOption,
  error,
  name,
  isDisable,
  ...props
}) => {
  return (
    <>
      <Select
        placeholder={dropdowntitle}
        onChange={onChangeOption}
        options={options}
        name={name}
        isDisabled={isDisable}
        id={name}
        value={selectedOption && selectedOption}
        autoFocus={false}
        theme={theme => ({
          ...theme,
          borderRadius: 5,
          colors: {
            ...theme.colors,
            primary25: colors.dropDownBackground,
            primary: colors.primary,
          },
        })}
        styles={{
          control: baseStyles => ({
            ...baseStyles,
            height: '4rem',
            border: 'none',
            backgroundColor: colors.dropDownBackground,
          }),
        }}
        {...props}
      />
      <div className="error-input-container">
        {error ? <p className="form-error">{error}</p> : null}
      </div>
    </>
  );
};
