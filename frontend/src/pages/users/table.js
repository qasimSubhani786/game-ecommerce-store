import React from "react";
import { ALL_TEXT, ENUMS } from "../../common";
import { ActionDropDownPopUp, CellValue } from "../../components";
import { GetBadge } from "../../utils/helpers/users";
import { GoKebabVertical } from "react-icons/go";
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";

const {
  USERS: { ROLE, STATUS },
} = ENUMS;

const menuItems = [
  // {
  //   title: ALL_TEXT.VIEW_PROFILE,
  //   icon: <span class="icon-search popup-menu-icon gray-popup-icon"></span>,
  // },
  {
    title: "Black list User",
    icon: (
      <AiOutlineCloseCircle
        size={30}
        className="icon-close popup-menu-icon red-popup-icon"
      ></AiOutlineCloseCircle>
    ),
  },
  {
    title: "Active User",
    icon: (
      <AiOutlineCheckCircle
        size={30}
        className="icon-close popup-menu-icon green-popup-icon"
      ></AiOutlineCheckCircle>
    ),
  },
  // {
  //   title: ALL_TEXT.CHANGE_PASSWORD,
  //   icon: (
  //     <span class="icon-resetpassword popup-menu-icon red-popup-icon"></span>
  //   ),
  // },
];
export const tableHeading = [
  {
    title: "Name",
    fieldName: "name",
    dataformat: (cell, row) => <CellValue cell={cell} row={row} />,
  },
  {
    title: "Email",
    fieldName: "email",
    dataformat: (cell, row) => <CellValue cell={cell} row={row} />,
  },
  {
    title: "Gender",
    fieldName: "gender",
    dataformat: (cell, row) => <CellValue cell={cell} row={row} />,
  },
  {
    title: "DOB",
    fieldName: "DOB",
    dataformat: (cell, row) => <CellValue cell={cell} row={row} />,
  },

  {
    title: "Role",
    fieldName: "role",
    dataformat: (cell, row) => GetBadge(row.role == "User" ? "User" : "Admin"),
  },
  {
    title: "Status",
    fieldName: "isBlackListed",
    dataformat: (cell, row) => {
      console.log(cell, row, row.isBlackListed);
      return GetBadge(
        row.isBlackListed == true
          ? STATUS.BLACKLISTED.LABEL
          : STATUS.ACTIVE.LABEL
      );
    },
  },
  {
    title: "",
    fieldName: "action",
    dataformat: (cell, row) => (
      <ActionDropDownPopUp
        visibleIcon={<GoKebabVertical />}
        items={menuItems}
        status={row.isBlackListed}
        id={row._id}
      />
    ),
  },
];
