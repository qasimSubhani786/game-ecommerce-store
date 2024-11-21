import React from 'react';
import './styles.scss';
import {Formik} from 'formik';
import {resetSchema} from '../../common/schemas';
import {ALL_TEXT, images} from '../../common';
import {GenericButton, InputField} from '../../components';

const ResetPassword = () => {
  const initialValues = {
    password: '',
    confirmPassword: '',
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validateOnMount={true}
        enableReinitialize
        validationSchema={resetSchema}>
        {({handleChange, handleBlur, handleSubmit, touched, errors}) => (
          <div
            className="login-background"
            style={{
              backgroundImage: `url(${images.noDukAmdinBackground})`,
            }}>
            <div className="noduk-logo">
              <img src={images.noDukLogo} alt={ALL_TEXT.ICON} />
            </div>
            <div className="reset-password-box">
              <div className="login-logo">
                <img src={images.userLogin} alt={ALL_TEXT.ICON} />
                <p>{ALL_TEXT.RESET_PASSWORD}</p>
              </div>
              <div className="login-input-field">
                <InputField
                  icon={<span class="icon-password"></span>}
                  id={'password'}
                  name={'password'}
                  placeholder={ALL_TEXT.ENTER_PASSWORD}
                  error={errors.password}
                  touched={touched.password}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isPassword
                />
                <InputField
                  icon={<span class="icon-password"></span>}
                  id={'confirmPassword'}
                  name={'confirmPassword'}
                  placeholder={ALL_TEXT.CONFIRM_NEW_PASSWORD}
                  error={errors.confirmPassword}
                  touched={touched.confirmPassword}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isPassword
                />
                <div className="reset-password-button">
                  <GenericButton
                    customStyle={'reset-password-button'}
                    buttonText={ALL_TEXT.SAVE}
                    onPress={handleSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default ResetPassword;
