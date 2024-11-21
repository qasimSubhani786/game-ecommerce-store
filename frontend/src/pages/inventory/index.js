import React, { useState, useEffect } from "react";
import { ALL_TEXT } from "../../common";
import {
  GenericTable,
  CustomizedSearch,
  GenericButton,
  AddNewUser,
  Card,
} from "../../components";
import "./style.scss";
import { Grid } from "@mui/material";
import { getAllGames } from "../../utils/rest-services";
import { AddProduct } from "../../components/add-new-product";
import { useSelector } from "react-redux";

function Inventory() {
  const [addNewUser, setAddNewUser] = useState(false);
  const [rawProduct, setrawProduct] = useState([]);
  const [allproducts, setAllproducts] = useState([]);
  const modalPopup = useSelector((state) => {
    return state.modal;
  });

  useEffect(() => {
    getAllGamesHanlder();
  }, [modalPopup.isCartSliderOpen]);

  const getAllGamesHanlder = async () => {
    let response = await getAllGames();
    setAllproducts(response.data);
    setrawProduct(response.data);
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
        <span>{"Gemes & Gears"}</span>
        <GenericButton
          customStyle={"custom-register-btn"}
          buttonText={`+ Add Product`}
          onPress={() => {
            setAddNewUser(true);
          }}
        />
      </div>
      <div className="user-search-bar">
        <CustomizedSearch
          title={"Search Products By"}
          firstLabel={"Product Id"}
          firstPlaceholder={"Product Id"}
          secondInput
          secondLabel={"Product name"}
          secondPlaceholder={"Enter Product name"}
          onClearFilterHandler={() => {
            setAllproducts(rawProduct);
          }}
          onSearchBtnPress={(name, email) => {
            console.log(name, email);
            let userData = [...allproducts];
            let filteredData = userFilterhandler(name || email, userData);

            setAllproducts(filteredData);
          }}
        />
      </div>
      <div className="main-products-container">
        <Grid container spacing={2}>
          {allproducts.map((i, k) => {
            return (
              <Grid item xs={12} md={4}>
                <Card
                  addtocart={false}
                  item={i}
                  setValue={setAllproducts}
                  number={k}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
      {addNewUser && (
        <AddProduct
          show={addNewUser}
          buttonText={"Add"}
          handleClose={() => {
            setAddNewUser(false);
            getAllGamesHanlder();
          }}
        />
      )}
    </div>
  );
}

export default Inventory;
