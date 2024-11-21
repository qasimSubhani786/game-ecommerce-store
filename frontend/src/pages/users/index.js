import React, { useState, useEffect } from "react";
import { ALL_TEXT } from "../../common";
import {
  GenericTable,
  CustomizedSearch,
  GenericButton,
  AddNewUser,
} from "../../components";
import "./style.scss";
import { tableHeading } from "./table";
import Pagination from "@mui/material/Pagination";
import { getAllUsers } from "../../utils/rest-services";

function Users() {
  const [addNewUser, setAddNewUser] = useState(false);
  //  {
  //     id: 1,
  //     name: "raza Subhani",
  //     email: "qasim@gmail.com",
  //     DOB: "12/02/23",
  //     gender: "male",
  //     isBlackListed: true,
  //     role: "User",
  //   },
  const [usersList, setUsersList] = useState([]);
  const [allUsersData, setAllUsersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getAllUsers();
        setAllUsersData(usersData);
        setUsersList(usersData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const userFilterhandler = (text, data) => {
    const filteredData = data.filter((item) =>
      Object.values(item).some(
        (val) =>
          typeof val === "string" &&
          val.toLowerCase().includes(text.toLowerCase())
      )
    );
    return filteredData;
  };

  return (
    <div className="userlist-main-container">
      <div className="title-container-userlist">
        <span>{ALL_TEXT.USERS}</span>
        <GenericButton
          customStyle={"custom-register-btn"}
          buttonText={`+${ALL_TEXT.REGISTER_USER}`}
          onPress={() => {
            setAddNewUser(true);
          }}
        />
      </div>
      <div className="user-search-bar">
        <CustomizedSearch
          title={"Search User By"}
          firstLabel={"Name"}
          secondInput
          firstPlaceholder={"Enter Name"}
          secondLabel={"Email"}
          secondPlaceholder={"Enter Email"}
          firstDropdown
          firstDropdownLabel={"Gender"}
          firstDropdownList={["male", "female"]}
          onClearFilterHandler={() => {
            setUsersList(allUsersData);
          }}
          onSearchBtnPress={(name, email, dummy, gender) => {
            let userData = [...usersList];
            let filteredData = userFilterhandler(
              name || email || gender,
              userData
            );

            setUsersList(filteredData);
          }}
        />
      </div>
      <div className="table-userlist-container">
        <GenericTable headings={tableHeading} data={usersList} />
      </div>
      {addNewUser && (
        <AddNewUser
          show={addNewUser}
          buttonText={"Add"}
          handleClose={() => setAddNewUser(false)}
        />
      )}
      {/* <div className="pagination-container">
        <div className="inner-pagination">
          <Pagination
            page={1}
            color={"secondary"}
            onChange={() => {}}
            count={10}
          />
        </div>
      </div> */}
    </div>
  );
}

export default Users;
