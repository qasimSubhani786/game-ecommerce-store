import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import { images } from "../../common";
import { ALL_TEXT, ENUMS } from "../../common/constants";
import { GenericButton, GenericModal, InputField } from "../../components";
import { Formik } from "formik";
import { signUpSchema } from "../../common/schemas";
import { path } from "../../common/routesNames";
import { setProfile, setToken } from "../../utils/localstorage";
import {
  openModal,
  closeModal,
  setModalDetails,
} from "../../utils/store/slices/popup-modal";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../utils/rest-services";

const Register = () => {
  const [btnLoader, setbtnLoader] = useState(false);
  const dispatch = useDispatch();
  const modalPopup = useSelector((state) => {
    return state.modal;
  });
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    DOB: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const saveUserData = (token, employee) => {
    setToken(`bearer ${token}`);
    setProfile(employee);
    navigate(path.dashboard, { replace: true });
  };

  const requestLogin = async (values, formik) => {
    // setbtnLoader(true);
    let result = await registerUser({
      ...values,
    });
    console.log(
      result,
      "re ehe",
      result.message === "Registration success. Please login."
    );
    if (
      result &&
      result.message &&
      result.message === "Registration success. Please login."
    ) {
      dispatch(
        setModalDetails({
          details: result.message,
          type: ENUMS.MODAL_TYPES.SUCCESS,
        })
      );
    }
    dispatch(openModal());
    // navigate('/dashboard');
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validateOnMount={true}
        onSubmit={(values, formikActions) => {
          requestLogin(values, formikActions);
        }}
        validationSchema={signUpSchema}
        enableReinitialize
      >
        {({ handleChange, handleBlur, handleSubmit, touched, errors }) => (
          <div
            className="login-background"
            style={{
              backgroundImage: `url(${images.noDukAmdinBackground})`,
            }}
          >
            <div className="noduk-logo">
              <img src={images.mainLogo} alt={ALL_TEXT.ICON} />
            </div>
            <div className="sign-up-box">
              <div className="login-logo">
                <img src={images.userLogin} alt={ALL_TEXT.ICON} />
                <p>{"Register Yourself"}</p>
              </div>
              <div className="login-input-field">
                <InputField
                  icon={<span class="icon-email"></span>}
                  name={"name"}
                  id={"name"}
                  placeholder={"Enter you name"}
                  error={touched.name && errors.name}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
                <InputField
                  icon={<span class="icon-email"></span>}
                  name={"email"}
                  id={"email"}
                  placeholder={ALL_TEXT.ENTER_EMAIL}
                  error={touched.email && errors.email}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
                <InputField
                  icon={<span class="icon-email"></span>}
                  name={"gender"}
                  id={"gender"}
                  placeholder={"Enter your Gender"}
                  error={touched.gender && errors.gender}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
                <InputField
                  icon={<span class="icon-email"></span>}
                  name={"DOB"}
                  id={"DOB"}
                  type={"date"}
                  placeholder={"Enter your Date of Birth"}
                  error={touched.DOB && errors.DOB}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
                <InputField
                  icon={<span class="icon-password"></span>}
                  id={"password"}
                  name={"password"}
                  placeholder={ALL_TEXT.ENTER_PASSWORD}
                  error={touched.password && errors.password}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isPassword
                />
                <InputField
                  icon={<span class="icon-password"></span>}
                  id={"confirmPassword"}
                  name={"confirmPassword"}
                  placeholder={"Enter your Confirm password"}
                  error={touched.confirmPassword && errors.confirmPassword}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isPassword
                />

                <div className="login-button">
                  <GenericButton
                    buttonText={"Register"}
                    onPress={handleSubmit}
                    loading={btnLoader}
                  />
                  <div className="login-button">
                    <GenericButton
                      buttonText={"Already Registered ? Login"}
                      onPress={() => {
                        navigate(path.login, { replace: true });
                      }}
                    />
                  </div>
                </div>
              </div>
              <GenericModal
                show={modalPopup.openModal}
                type={modalPopup.type}
                title={modalPopup.title}
                body={modalPopup.details}
                buttonText={modalPopup.primaryBtnText}
                handleClose={() => {
                  dispatch(closeModal());
                  navigate(path.login, { replace: true });
                }}
              />
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};
export default Register;
