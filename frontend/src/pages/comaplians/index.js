import React, { useState, useEffect } from "react";
import { ALL_TEXT, images } from "../../common";
import {
  GenericTable,
  CustomizedSearch,
  GenericButton,
  AddNewUser,
  Card,
} from "../../components";
import "./style.scss";
import { Grid } from "@mui/material";
import { getAllComplains } from "../../utils/rest-services";
import { AddProduct } from "../../components/add-new-product";
import { Description } from "@material-ui/icons";
import { HorizontalCard } from "../../components/horizontal-card";

export const Complain = () => {
  const [complainList, setcomplainList] = useState([]);
  const [rawComplain, setrawComplain] = useState([]);
  useEffect(() => {
    getComplainsHandler();
  }, []);
  const getComplainsHandler = async () => {
    let response = await getAllComplains();
    console.log(response.results);
    setcomplainList(response.results);
    setrawComplain(response.results);
  };

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
        <span>{"Complains"}</span>
      </div>
      <div className="user-search-bar">
        <CustomizedSearch
          title={"Search Complains By"}
          firstLabel={"Complain Id"}
          firstPlaceholder={"Complain Id"}
          onClearFilterHandler={() => {
            setcomplainList(rawComplain);
          }}
          onSearchBtnPress={(id) => {
            console.log(id);
            let userData = [...rawComplain];
            let filteredData = userFilterhandler(id, userData);

            setcomplainList(filteredData);
          }}
        />
      </div>

      {complainList?.map((i) => {
        const itemData = {
          title: i.Title,
          key1: "Description",
          value1: i.description,
          key2: "Complain Id",
          value2: i._id,
          key3: "User Id",
          value3: i.createdBy._id,
          key4: "Order Id",
          value4: i.order,
          Image: i.Image,
        };

        return <HorizontalCard item={itemData} />;
      })}
    </div>
  );
};
