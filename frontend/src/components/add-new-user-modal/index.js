import React from 'react';
import Autocomplete from 'react-google-autocomplete';
import {Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './styles.scss';
import {GenericButton} from '../generic-button';
import {Grid} from '@mui/material';
import {ALL_TEXT} from '../../common';
import {InputField} from '../input-field';
import {Formik} from 'formik';
import {userDetailSchema} from '../../common/schemas';

export const AddNewUser = ({show, handleClose, buttonText}) => {
  // const [userDetailsInfo, setUserDetailsInfo] = useState({
  //   firstName: '',
  //   lastName: '',
  //   phone: '',
  //   email: '',
  //   address: '',
  //   state: '',
  //   city: '',
  //   zip: '',
  //   password: '',
  //   confirmPassword: '',
  // });

  const userDetailsInfo = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    state: '',
    city: '',
    zip: '',
    password: '',
    confirmPassword: '',
  };

  const convertArrayToString = data => {
    const joined = data.join();
    let newAddress = joined.replace(/,/g, ' ');
    return newAddress;
  };
  const AddressSeprateHandler = (data, setFieldValue, values) => {
    let address = [];
    let city = [];
    let state = [];
    let postal = [];
    data.map(dataItem => {
      dataItem.types.map(type => {
        if (type === ALL_TEXT.FIELD_TYPE_ENUMS.STREET_NUMBER) {
          address.push(dataItem.long_name);
        } else if (type === ALL_TEXT.FIELD_TYPE_ENUMS.ROUTE) {
          address.push(dataItem.long_name);
        } else if (type === ALL_TEXT.FIELD_TYPE_ENUMS.NAIBHOUR) {
          address.push(dataItem.long_name);
        } else if (type === ALL_TEXT.FIELD_TYPE_ENUMS.LOCALITY) {
          city.push(dataItem.long_name);
        } else if (type === ALL_TEXT.FIELD_TYPE_ENUMS.ADMIN) {
          state.push(dataItem.long_name);
        } else if (type === ALL_TEXT.FIELD_TYPE_ENUMS.CODE) {
          postal.push(dataItem.long_name);
        }
      });
    });
    // === convert Address array to string === //
    setFieldValue(ALL_TEXT.FIELD_VALUE.ADDRESS, values);
    setFieldValue(ALL_TEXT.FIELD_VALUE.CITY, convertArrayToString(city));
    setFieldValue(ALL_TEXT.FIELD_VALUE.STATE, convertArrayToString(state));
    setFieldValue(ALL_TEXT.FIELD_VALUE.ZIP, convertArrayToString(postal));
  };

  const handleChangePhoneNumber = (event, setFieldValue) => {
    const inputValue = event.target.value
      .replace(/^(\+1)/, '')
      .replace(/^(1)/, '');
    const numericValue = inputValue.replace(/[^0-9+]/g, ''); // remove non-numeric characters
    const restrictedValue = numericValue.substring(0, 12); // restrict to 10 digits
    setFieldValue('phone', restrictedValue);
  };

  return (
    <>
      <Formik
        initialValues={{
          firstName: userDetailsInfo.firstName || '',
          lastName: userDetailsInfo.lastName || '',
          email: userDetailsInfo.email || '',
          phone: userDetailsInfo.phone || '',
          address: userDetailsInfo.address || '',
          city: userDetailsInfo.city || '',
          state: userDetailsInfo.state || '',
          zip: userDetailsInfo.zip || '',
          password: userDetailsInfo.password || '',
          confirmPassword: userDetailsInfo.confirmPassword || '',
        }}
        validateOnMount={true}
        validationSchema={userDetailSchema}
        enableReinitialize
        // onSubmit={(formikValues, action) => {}}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          values,
          touched,
          errors,
        }) => (
          <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton={handleClose}>
              <h5>{ALL_TEXT.USER_DETAIL.ADD_NEW_USER_TITLE}</h5>
            </Modal.Header>
            <Modal.Body>
              <div className="user-detail">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <label htmlFor="/">{ALL_TEXT.USER_DETAIL.FIRST_NAME}</label>
                    <InputField
                      id={'firstName'}
                      name={'firstName'}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched.firstName}
                      error={errors.firstName}
                      value={values.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <label htmlFor="/">{ALL_TEXT.USER_DETAIL.LAST_NAME}</label>
                    <InputField
                      id={'lastName'}
                      name={'lastName'}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched.lastName}
                      error={errors.lastName}
                      value={values.lastName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <label htmlFor="/">{ALL_TEXT.USER_DETAIL.PHONE}</label>
                    <InputField
                      id={'phone'}
                      name={'phone'}
                      handleChange={e =>
                        handleChangePhoneNumber(e, setFieldValue)
                      }
                      handleBlur={handleBlur}
                      touched={touched.phone}
                      error={errors.phone}
                      value={values.phone}
                      phone
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <label htmlFor="/">{ALL_TEXT.USER_DETAIL.EMAIL}</label>
                    <InputField
                      id={'email'}
                      name={'email'}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched.email}
                      error={errors.email}
                      value={values.email}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <label htmlFor="/">{ALL_TEXT.USER_DETAIL.ADDRESS}</label>
                    <Autocomplete
                      className="input-field-container p-2 drop-down-height"
                      apiKey={ALL_TEXT.ADDRESSKEY}
                      defaultValue={values.address}
                      placeholder=""
                      onChange={handleChange('address')}
                      onBlur={handleBlur('address')}
                      onPlaceSelected={data => {
                        AddressSeprateHandler(
                          data.address_components,
                          setFieldValue,
                          data.formatted_address,
                        );
                      }}
                      options={{
                        componentRestrictions: {country: 'us'},
                      }}
                    />
                    <div className="error-input-container">
                      {errors.address && touched.address ? (
                        <p className="form-error">{errors.address}</p>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <label htmlFor="/">{ALL_TEXT.USER_DETAIL.STATE}</label>
                    <InputField
                      id={'state'}
                      name={'state'}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched.state}
                      error={errors.state}
                      value={values.state}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <label htmlFor="/">{ALL_TEXT.USER_DETAIL.CITY}</label>
                    <InputField
                      id={'city'}
                      name={'city'}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched.city}
                      error={errors.city}
                      value={values.city}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <label htmlFor="/">{ALL_TEXT.USER_DETAIL.ZIP}</label>
                    <InputField
                      id={'zip'}
                      name={'zip'}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched.zip}
                      error={errors.zip}
                      value={values.zip}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <label htmlFor="/">{ALL_TEXT.USER_DETAIL.PASSWORD}</label>
                    <InputField
                      id={'password'}
                      name={'password'}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched.password}
                      error={errors.password}
                      value={values.password}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <label htmlFor="/">
                      {ALL_TEXT.USER_DETAIL.CONFIRM_PASSWORD}
                    </label>
                    <InputField
                      id={'confirmPassword'}
                      name={'confirmPassword'}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched.confirmPassword}
                      error={errors.confirmPassword}
                      value={values.confirmPassword}
                    />
                  </Grid>
                </Grid>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <GenericButton
                buttonText={buttonText}
                onPress={() => {
                  handleSubmit();
                }}
              />
            </Modal.Footer>
          </Modal>
        )}
      </Formik>
    </>
  );
};
