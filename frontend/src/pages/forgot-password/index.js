import React from 'react';
import './styles.scss';
import {ALL_TEXT, images} from '../../common';
import {GenericButton, InputField} from '../../components';
import {Formik} from 'formik';
import {forgotSchema} from '../../common/schemas';

const ForgotPassword = () => {
  const initialValues = {
    forgotPassword: '',
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validateOnMount={true}
        // onSubmit={(formikActions, values) => {
        //   // requestLogin(values, formikActions);
        // }}
        validationSchema={forgotSchema}
        enableReinitialize>
        {({handleChange, handleBlur, handleSubmit, touched, errors}) => (
          <div
            className="forgot-password login-background "
            style={{
              backgroundImage: `url(${images.noDukAmdinBackground})`,
            }}>
            <div className="noduk-logo">
              <img src={images.noDukLogo} alt={ALL_TEXT.ICON} />
            </div>
            <div className="forgot-password-box">
              <div className="login-logo">
                <img src={images.forgotPassword} alt={ALL_TEXT.ICON} />
                <p>{ALL_TEXT.FORGOT_PASSWORD}</p>
              </div>
              <div className="login-input-field">
                <InputField
                  icon={<span class="icon-email"></span>}
                  name={'email'}
                  id={'email'}
                  placeholder={ALL_TEXT.ENTER_EMAIL}
                  error={errors.email}
                  touched={touched.email}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
                <div className="login-button">
                  <GenericButton
                    buttonText={ALL_TEXT.SEND}
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

export default ForgotPassword;
