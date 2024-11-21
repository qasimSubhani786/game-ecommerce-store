import React, { useState, useEffect } from "react";
import Rating from "react-rating";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import { Box, Button } from "@mui/material";
import { GenericButton } from "../generic-button";
import "./style.scss";
import { Badge } from "react-bootstrap";
import { useNavigate } from "react-router";
import { KeyValueData } from "../horizontal-card";
import { setFavourite } from "../../utils/rest-services";
import { path } from "../../common/routesNames";
import { QuantityButton } from "../qunatity-button";
import { getCartItems, setAddItemToCart } from "../../utils/localstorage";

export const Card = ({ addtocart, item, setValue, number, favourite }) => {
  const [isFavorite, setIsFavorite] = useState(item.isFavourite);
  const [isAvailable, setIsAvailable] = useState(true);
  const navigate = useNavigate();
  const handleFavoriteClick = async () => {
    const response = await setFavourite(item._id);
    console.log(response.data, "here");
    setValue((oldValue) => {
      const newValue = [...oldValue]; // create a copy of the existing array
      if (favourite) {
        newValue[number] = {}; // update the specific element at the desired index
      } else {
        newValue[number] = response.data; // update the specific element at the desired index
      }

      return newValue; // return the updated array
    });

    setIsFavorite(!isFavorite);
  };
  console.log("item 786", item);

  const [rating, setRating] = useState(4);
  const [quantity, setquantity] = useState(0);

  let cartItem = {
    title: item.Title,
    image: item?.Image,
    unitPrice: item.marketPrice,
    minAge: item.minAge,
    id: item._id,
    quantity: 0,
  };

  useEffect(() => {
    let cartList = getCartItems();
    if (cartList != null) {
      let index = cartList.findIndex((i) => i.id == item._id);
      if (index != -1) {
        const newQty = cartList[index].quantity;
        setquantity(newQty);
      }
    }
  }, []);
  console.log(item, "item", item.type);
  return Object.keys(item).length ? (
    <div className="card col-md-4 col-sm-12">
      <div
        className="card-img-container cardImage"
        onClick={() => navigate(`${path.productDetails}?id=${item._id}`)}
      >
        <img
          src={require(`../../../../../nodeJsProject/softec-23-backend/Images/${item?.Image}`)}
          alt="card"
        />
      </div>

      <div className="card-content allCardContent">
        <div className="top d-flex justify-content-between infoIcons">
          <div style={{ pointerEvents: "none" }} className="card-rating">
            <Rating
              initialRating={rating}
              onChange={setRating}
              onHover={setRating}
              emptySymbol={<i className="far fa-star text-yellow-500"></i>}
              fullSymbol={<i className="fas fa-star text-yellow-500"></i>}
              fractions={2}
            />
          </div>

          {addtocart && (
            <div className="favorite-icon" onClick={handleFavoriteClick}>
              <Box style={{ color: "red", fontSize: "30px" }}>
                {item.isFavourite || isFavorite ? (
                  <AiFillHeart onClick={handleFavoriteClick} />
                ) : (
                  <AiOutlineHeart onClick={handleFavoriteClick} />
                )}
              </Box>
            </div>
          )}
        </div>
        <Box style={{ cursor: "pointer" }}>
          <div className="titleAvailable mt-2 mb-2">
            <h2 className="card-title">{item?.Title}</h2>
            <div>
              <Badge bg={item?.quantity > 0 ? "success" : "danger"}>
                {item.quantity > 0 ? "Available" : "out of stock"}
              </Badge>
            </div>
          </div>
          <div>
            <KeyValueData keyy={"Price"} value={`PKR ${item.marketPrice}/-`} />
            <div className="product-item">
              {`Type `}
              <Badge bg={item.type.toLowerCase() == "game" ? "info" : "danger"}>
                <span>{item.type}</span>
              </Badge>
            </div>
            {item.Platform && (
              <Box className="d-flex justify-content-between">
                <div className="product-item">
                  {`Min Age `}
                  <Badge bg={item.minAge > 18 ? "danger" : "info"}>
                    <span>{item.minAge}</span>
                  </Badge>
                </div>
                <div style={{ marginRight: "15px" }}>
                  <KeyValueData keyy={"Platform"} value={item.Platform} />
                </div>
              </Box>
            )}
          </div>
          <Box className="d-flex justify-content-between">
            <div className="card-description">{item.Description}</div>
            <KeyValueData keyy={"In Stock Items"} value={item?.quantity} />
          </Box>
          <div className="card-badge badges justify-content-between d-flex">
            {addtocart && (
              <QuantityButton
                quantity={quantity}
                onIncrement={() => {
                  let cartList = getCartItems();
                  if (cartList === null || cartList.length == 0) {
                    // new item in cart
                    cartList = [];
                    cartItem.quantity = quantity + 1;
                    cartList.push(cartItem);
                    setAddItemToCart(cartList);
                    setquantity(quantity + 1);
                  } else {
                    // if there is already an item in cart list

                    let index = cartList.findIndex((i) => i.id == item._id);
                    if (index != -1) {
                      const newQty = cartList[index].quantity + 1;
                      cartItem.quantity = newQty;
                      setquantity(newQty);
                      cartList[index] = cartItem;
                      setAddItemToCart(cartList);
                    } else {
                      cartItem.quantity = quantity + 1;
                      setquantity(cartItem.quantity);
                      cartList.push(cartItem);
                      setAddItemToCart(cartList);
                    }
                  }
                }}
                onDecrement={() => {
                  debugger;

                  if (quantity > 0) {
                    // if there is already an item in cart list
                    let cartList = getCartItems();

                    console.log("Existing Cart list", cartList);

                    let index = cartList.findIndex((i) => i.id == item._id);
                    if (index != -1) {
                      const newQty = cartList[index].quantity - 1;
                      cartItem.quantity = newQty;
                      setquantity(newQty);
                      if (newQty == 0) {
                        cartList.splice(index);
                      } else {
                        cartList[index] = cartItem;
                      }

                      setAddItemToCart(cartList);
                    }
                  }
                }}
              />
            )}
          </div>
        </Box>
      </div>
    </div>
  ) : null;
};
