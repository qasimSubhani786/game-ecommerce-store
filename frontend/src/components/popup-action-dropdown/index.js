import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "./styles.scss";
import { path } from "../../common/routesNames";
import { useNavigate } from "react-router";
import { ALL_TEXT } from "../../common";
import { clearStorage } from "../../utils/localstorage";
import { blackListUser } from "../../utils/rest-services";

export function ActionDropDownPopUp({
  items,
  visibleIcon,
  userInfo,
  userImage,
  userName,
  userEmail,
  status,
  id,
}) {
  let navigate = useNavigate();
  const performLogout = () => {
    clearStorage();
    navigate(path.login, { replace: true });
  };
  return (
    <div className="action-menu">
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          <span className="action-popup-style">{visibleIcon}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu className="action-popup">
          {userInfo && (
            <div className="logout-user-info">
              <div className="user-primary">
                <span>{userImage}</span>
              </div>
              <div className="user-secondry">
                <h5>{userName}</h5>
                <p>{userEmail}</p>
              </div>
            </div>
          )}
          {items.map((i, index) => (
            <Dropdown.Item
              key={index}
              onClick={i.onPress}
              style={{
                display:
                  (i.title === "Black list User" && status) ||
                  (i.title === "Active User" && !status)
                    ? "none"
                    : "block",
              }}
            >
              <div
                className="action-options"
                onClick={async () => {
                  console.log(i);
                  if (i.title === ALL_TEXT.ADD_POLICY) {
                    navigate({ pathname: path.addPolicy });
                  } else if (i.title === ALL_TEXT.LOGOUT) {
                    performLogout();
                  } else if (i.title === "Black list User") {
                    const response = await blackListUser(!status, id);
                    // console.log(response); // do something with the response
                    window.location.reload();
                  } else if (i.title === "Active User") {
                    const response = await blackListUser(!status, id);
                    window.location.reload();
                  }
                }}
              >
                {i.icon}
                <span className="text-cancel-policy px-2">{i.title}</span>
              </div>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
