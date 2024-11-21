import * as Yup from "yup";
import { ALL_TEXT } from "./constants";
const {
  ERROR_PLACEHOLDERS: {
    FIRST_NAME,
    LAST_NAME,
    PHONE,
    EMAIL,
    ADDRESS,
    STATE,
    CITY,
    ZIP,
    PASSWORD,
    CONFIRM_PASSWORD,
    PASSWORD_MATCH,
    PASSWORD_MUST_BE,
    PLEASE_SELECT,
    INVALID_EMAIL,
    MAKER,
    MODEL,
    YEAR,
    CARRIER,
    DEDUCTIBLES,
    OTHER_CARRIER,
    PLEASE_ENTER,
    OTHER_DEDUCTIBLES,
    MINIMUM_DEDUCTIBLES,
    INVALID_DEDUCTIBLES,
  },
} = ALL_TEXT;

// need to verify String messages from Import

export const signinSchema = Yup.object({
  email: Yup.string().email(INVALID_EMAIL).required(EMAIL),
  password: Yup.string().min(3, PASSWORD_MUST_BE).required(PASSWORD),
});
export const signUpSchema = Yup.object({
  name: Yup.string().required(),
  DOB: Yup.string().required(),
  gender: Yup.string().required(),
  email: Yup.string().email(INVALID_EMAIL).required(EMAIL),
  password: Yup.string().min(6, PASSWORD_MUST_BE).required(PASSWORD),
  confirmPassword: Yup.string()
    .required(CONFIRM_PASSWORD)
    .oneOf([Yup.ref("password"), null], PASSWORD_MATCH),
});

export const forgotSchema = Yup.object({
  email: Yup.string().email(INVALID_EMAIL).required(EMAIL),
});

export const resetSchema = Yup.object({
  password: Yup.string().min(6, PASSWORD_MUST_BE).required(PASSWORD),
  confirmPassword: Yup.string()
    .required(CONFIRM_PASSWORD)
    .oneOf([Yup.ref("password"), null], PASSWORD_MATCH),
});

export const userDetailSchema = Yup.object({
  firstName: Yup.string().required(FIRST_NAME),
  lastName: Yup.string().required(LAST_NAME),
  phone: Yup.string().min(10).required(PHONE),
  email: Yup.string().email(INVALID_EMAIL).required(EMAIL),
  address: Yup.string().required(ADDRESS),
  state: Yup.string().required(STATE),
  city: Yup.string().required(CITY),
  zip: Yup.string().required(ZIP),
  password: Yup.string().min(6, PASSWORD_MUST_BE).required(PASSWORD),
  confirmPassword: Yup.string()
    .required(CONFIRM_PASSWORD)
    .oneOf([Yup.ref("password"), null], PASSWORD_MATCH),
});
