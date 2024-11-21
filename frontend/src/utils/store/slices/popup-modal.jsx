import { createSlice } from "@reduxjs/toolkit";
import { ALL_TEXT, ENUMS } from "../../../common";
// import {clearAllUserIMP} from '../actions';

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    openModal: false,
    title: ALL_TEXT.GENERIC_MODAL.SUCCESS,
    details: "",
    type: ENUMS.MODAL_TYPES.SUCCESS,
    primaryBtnText: "OK",
    isCartSliderOpen: false,
  },
  reducers: {
    openModal: (state, { payload }) => {
      state.openModal = true;
    },
    cartSliderHandler: (state, { payload }) => {
      state.isCartSliderOpen = payload;
    },
    closeModal: (state, { payload }) => {
      state.openModal = false;
    },
    setModalDetails: (state, { payload }) => {
      state.title = payload.title;
      state.details = payload.details;
      state.type = payload.type;
    },
  },
});

export const { openModal, closeModal, setModalDetails, cartSliderHandler } =
  modalSlice.actions;
