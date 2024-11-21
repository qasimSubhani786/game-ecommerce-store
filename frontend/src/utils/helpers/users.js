import React from "react";
import { ENUMS } from "../../common";
import { GenericBadge } from "../../components";
import "./style.scss";

const {
  USERS: { ROLE, STATUS },
  INVOICES: { STATUS: INV_STATUS },
} = ENUMS;

// this is just dynamic custom build badge
export const GetBadge = (text) => {
  if (text === ROLE.CUSTOMER.LABEL || text === "User") {
    return <GenericBadge value={text} colors="gray-badge" />;
  } else if (text === ROLE.REGISTERED.LABEL || text === "Admin") {
    return <GenericBadge value={text} colors="yellow-badge" />;
  } else if (text == STATUS.ACTIVE.LABEL || text == INV_STATUS.SUCCESS.LABEL) {
    return <GenericBadge value={text} colors="green-badge" />;
  } else if (
    text == STATUS.BLACKLISTED.LABEL ||
    text == INV_STATUS.FAILED.LABEL
  ) {
    return <GenericBadge value={text} colors="red-badge" />;
  }
};
