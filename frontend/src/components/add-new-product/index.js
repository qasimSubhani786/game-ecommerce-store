import React, { useState } from "react";
import Autocomplete from "react-google-autocomplete";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.scss";
import { GenericButton } from "../generic-button";
import { Grid } from "@mui/material";
import { ALL_TEXT } from "../../common";
import { InputField } from "../input-field";
import { Formik } from "formik";
import { userDetailSchema } from "../../common/schemas";
import Dropdown from "react-dropdown";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { createNewGame } from "../../utils/rest-services";

export const AddProduct = ({ show, handleClose, buttonText }) => {
  const [imageObj, setimageObj] = useState(null);
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
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    state: "",
    city: "",
    zip: "",
    password: "",
    confirmPassword: "",
  };

  const convertArrayToString = (data) => {
    const joined = data.join();
    let newAddress = joined.replace(/,/g, " ");
    return newAddress;
  };
  const AddressSeprateHandler = (data, setFieldValue, values) => {
    let address = [];
    let city = [];
    let state = [];
    let postal = [];
    data.map((dataItem) => {
      dataItem.types.map((type) => {
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
      .replace(/^(\+1)/, "")
      .replace(/^(1)/, "");
    const numericValue = inputValue.replace(/[^0-9+]/g, ""); // remove non-numeric characters
    const restrictedValue = numericValue.substring(0, 12); // restrict to 10 digits
    setFieldValue("phone", restrictedValue);
  };
  const generateFormData = (values) => {
    let formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }
    return formData;
  };

  return (
    <>
      <Formik
        initialValues={{
          Title: "",
          Description: "",
          type: "",
          Platform: "",
          ReleaseDate: "",
          marketPrice: "",
          costPrice: "",
          minAge: "",
          quantity: "",
          Image: imageObj,
          Publisher: "",
        }}
        validateOnMount={true}
        // validationSchema={userDetailSchema}
        enableReinitialize
        onSubmit={async (formikValues, action) => {
          const dataform = generateFormData(formikValues);
          const response = await createNewGame(dataform);
          console.log(response);
          handleClose();
          console.log(formikValues);
        }}
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
              <h5>{"Add New Product"}</h5>
            </Modal.Header>
            <Modal.Body>
              <div className="user-detail">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <label htmlFor="/">{"Title"}</label>
                    <InputField
                      id={"Title"}
                      name={"Title"}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched.Title}
                      error={errors.Title}
                      value={values.Title}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <label htmlFor="/">{"Description"}</label>
                    <InputField
                      id={"Description"}
                      name={"Description"}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched.Description}
                      error={errors.Description}
                      value={values.Description}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <label htmlFor="/">{"Publisher"}</label>
                    <InputField
                      id={"Publisher"}
                      name={"Publisher"}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched.Publisher}
                      error={errors.Publisher}
                      value={values.Publisher}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <label htmlFor="/">{"PlateForm"}</label>
                    <InputField
                      id={"Platform"}
                      name={"Platform"}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched.Platform}
                      error={errors.Platform}
                      value={values.Platform}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <label htmlFor="/">{"Type"}</label>
                    <InputField
                      id={"type"}
                      name={"type"}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched.type}
                      error={errors.type}
                      value={values.type}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <label htmlFor="/">{"ReleaseDate"}</label>
                    <InputField
                      id={"ReleaseDate"}
                      name={"ReleaseDate"}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched.ReleaseDate}
                      error={errors.ReleaseDate}
                      value={values.ReleaseDate}
                      type={"date"}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <label htmlFor="/">{"marketPrice"}</label>
                    <InputField
                      id={"marketPrice"}
                      name={"marketPrice"}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched.marketPrice}
                      error={errors.marketPrice}
                      value={values.marketPrice}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <label htmlFor="/">{"costPrice"}</label>
                    <InputField
                      id={"costPrice"}
                      name={"costPrice"}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched.costPrice}
                      error={errors.costPrice}
                      value={values.costPrice}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <label htmlFor="/">{"Min Age"}</label>
                    <InputField
                      id={"minAge"}
                      name={"minAge"}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched.minAge}
                      error={errors.minAge}
                      value={values.minAge}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <label htmlFor="/">{"Quantity"}</label>
                    <InputField
                      id={"quantity"}
                      name={"quantity"}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched.quantity}
                      error={errors.quantity}
                      value={values.quantity}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <label htmlFor="/">{"Choose Image"}</label>

                    <input
                      id={"Image"}
                      name={"Image"}
                      type="file"
                      onChange={(event) => {
                        const file = event.target.files[0];
                        console.log(file);
                        setFieldValue("Image", file);
                      }}
                      onClick={(e) => (e.target.value = null)}
                      className="filetype"
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
