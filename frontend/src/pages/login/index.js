import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import { images } from "../../common";
import { ALL_TEXT, ENUMS } from "../../common/constants";
import { GenericButton, InputField } from "../../components";
import { Formik } from "formik";
import { signinSchema } from "../../common/schemas";
import { path } from "../../common/routesNames";
import { setProfile, setToken } from "../../utils/localstorage";
import { performLogin } from "../../utils/rest-services/index";
import { useDispatch } from "react-redux";
import { setModalDetails } from "../../utils/store/slices/popup-modal";

const Login = () => {
  const [btnLoader, setbtnLoader] = useState(false);

  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const dispatch = useDispatch();
  const saveUserData = (token, employee) => {
    setToken(`bearer ${token}`);
    setProfile(employee);
    navigate(employee.role === "Admin" ? path.dashboard : path.games, {
      replace: true,
    });
  };

  const requestLogin = async (values, formik) => {
    try {
      setbtnLoader(true);
      let result = await performLogin({
        email: values.email,
        password: values.password,
      });
      const { token, user } = result || {};

      if (token?.length) {
        delete user._id;
        saveUserData(token, user);
      } else {
        formik.resetForm();
      }
      setbtnLoader(false);
    } catch (error) {
      dispatch(
        setModalDetails({
          title: "Error",
          description: "Invalid Credentials",
          type: ENUMS.MODAL_TYPES.ERROR,
        })
      );
      dispatch(setModalDetails());
    }
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validateOnMount={true}
        onSubmit={(values, formikActions) => {
          requestLogin(values, formikActions);
        }}
        validationSchema={signinSchema}
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
            <div className="sign-in-box">
              <div className="login-logo">
                <img src={images.userLogin} alt={ALL_TEXT.ICON} />
                <p>{ALL_TEXT.LOGIN}</p>
              </div>
              <div className="login-input-field">
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
                  icon={<span class="icon-password"></span>}
                  id={"password"}
                  name={"password"}
                  placeholder={ALL_TEXT.ENTER_PASSWORD}
                  error={touched.password && errors.password}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isPassword
                />
                <div
                  className="forgotPassword-action"
                  onClick={() => {
                    navigate({ pathname: path.register });
                  }}
                >
                  <a>{"Register yourself here!"}</a>
                </div>
                <div className="login-button">
                  <GenericButton
                    buttonText={ALL_TEXT.LOGIN}
                    onPress={handleSubmit}
                    loading={btnLoader}
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
export default Login;
