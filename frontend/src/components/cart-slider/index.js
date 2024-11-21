import React, { useState, useContext, useEffect } from "react";
import { FiTrash } from "react-icons/fi";
import { FiEdit2 } from "react-icons/fi";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { GoX } from "react-icons/go";
import { images } from "../../common/images";
// import { cart } from "../../common/constants";
import SlidingPane from "react-sliding-pane";
import "./styles.scss";
import { GenericButton } from "../generic-button/index";
import { GenericModal } from "../generic-modal";
import { useNavigate } from "react-router";
import { path } from "../../common/routesNames";
import { CircularProgress } from "@material-ui/core";
import {
  getCartItems,
  getProfile,
  setAddItemToCart,
} from "../../utils/localstorage";
import { HorizontalCard, KeyValueData } from "../horizontal-card";
import { useDispatch, useSelector } from "react-redux";
import {
  cartSliderHandler,
  openModal,
  setModalDetails,
} from "../../utils/store/slices/popup-modal";
import StripeCheckout from "react-stripe-checkout";
import { createOrder } from "../../utils/rest-services";
import { ENUMS } from "../../common";

export const emptyCart = () => {
  setAddItemToCart([]);
};
export const CartSlider = () => {
  const [isloader, setIsloader] = useState(false);
  const [totalCost, settotalCost] = useState(0);
  let cartList = getCartItems();

  const dispatch = useDispatch();
  const modalPopup = useSelector((state) => {
    return state.modal;
  });

  useEffect(() => {
    let amount = 0;
    if (cartList?.length > 0) {
      cartList.map((i) => (amount += i.unitPrice * i.quantity));
      settotalCost(amount);
    }
  }, [modalPopup.isCartSliderOpen]);

  const [isOpenPane, setIsOpenPane] = useState({
    isPaneOpen: false,
  });

  const closeCart = () => {
    document.body.style.overflow = "unset";
    setIsOpenPane({ isPaneOpen: false });
    dispatch(cartSliderHandler(false));
  };

  const onToken = async (token) => {
    if (!getProfile().isBlackListed) {
      let itemId = [];
      cartList?.map((i) => itemId.push(i.id));
      // call Custom API here
      let response = await createOrder({
        games: itemId,
        date: "07/03/2023",
        price: totalCost,
        token,
      });
      dispatch(
        setModalDetails({
          title: "Success",
          type: ENUMS.MODAL_TYPES.SUCCESS,
          details: "Your Order has been Successfully Placed.!",
        })
      );
      dispatch(openModal());
      closeCart();
      emptyCart();
    } else {
      dispatch(
        setModalDetails({
          title: "Error",
          type: ENUMS.MODAL_TYPES.ERROR,
          details:
            "User is BlackListed by Administration! Please contact support for further details",
        })
      );
      dispatch(openModal());
      closeCart();
    }
  };

  return (
    <>
      <div>
        <button
          className="cartAddedButton"
          onClick={() => {
            setIsOpenPane({ isPaneOpen: true });
            dispatch(cartSliderHandler(true));
            if (typeof window != "undefined" && window.document) {
              document.body.style.overflow = "hidden";
            }
            // totalCostCalculated();
          }}
        >
          <span>
            <img src={images.lockIcon} />
          </span>
          <span>{`Cart`}</span>
        </button>

        <SlidingPane
          className="some-custom-class"
          overlayClassName="some-custom-overlay-class"
          isOpen={isOpenPane.isPaneOpen}
          onRequestClose={() => {
            closeCart();
          }}
        >
          {isloader ? (
            <div className="loder-margin">
              <div style={{ alignItems: "center", padding: "20px" }}>
                <CircularProgress />
              </div>
            </div>
          ) : (
            <div className="pane-box">
              <div className="cartCount">
                <h3>
                  {cartList?.length == 0 ? `Cart` : `Cart(${cartList?.length})`}
                </h3>
                <button
                  className="closePaneIcon"
                  onClick={() => {
                    closeCart();
                  }}
                >
                  {<GoX />}
                </button>
              </div>

              {cartList?.length == 0 && (
                <div className="cartEmptyContainer">
                  <h4>{"Cart Empty"}</h4>
                  <p>{"There is no item in the cart"}</p>
                </div>
              )}
              {cartList?.map((item) => {
                const { title, image, unitPrice, minAge, id, quantity } =
                  item || {};

                const dataItem = {
                  title,
                  Image: image,
                  key1: "Amount",
                  value1: `${quantity}x${unitPrice} =${
                    unitPrice * quantity
                  }PKR `,
                };
                return (
                  <>
                    {<HorizontalCard item={dataItem} />}
                    <div className="grandTotal">
                      <div className="totalCost">
                        <span>
                          {"Total Cost"} <span>{`${totalCost} PKR/-`}</span>
                        </span>
                        {/* <span>{`$${parseFloat(totalSubscriptionCost).toFixed(
                          2
                        )}`}</span> */}
                      </div>
                      {getProfile().isBlackListed && (
                        <KeyValueData
                          keyy={"Note"}
                          value="You are unbale to place order because you are BlackList by Admin"
                        />
                      )}
                      <div className="payActionContainer">
                        <div className="payNowButton">
                          <StripeCheckout
                            token={onToken}
                            shippingAddress
                            billingAddress={true}
                            currency="pkr"
                            amount={totalCost * 100}
                            stripeKey="pk_test_51K8lJeSGkXsHpk6s64EtVo37lQmikIps217LhE2fmpwRMj2Ro0iKQvYXcFkMBHjjM4Z6BC5uvxV8XsTbKQFfbQ5y000eSg9RUb"
                          >
                            <GenericButton
                              id="pay-now-button"
                              disable={getProfile().isBlackListed}
                              onPress={() => {
                                // closeCart();
                              }}
                              buttonText={"Pay now"}
                            />
                          </StripeCheckout>
                        </div>
                        <div className="emptyCartButton">
                          <GenericButton
                            id="empty-cart-button"
                            onPress={() => {
                              // setEmptyCartConfirmation(true);
                              setAddItemToCart([]);
                              closeCart();
                              console.log("empty cart");
                            }}
                            buttonText={
                              <span>
                                <span className="payTrashIcon">
                                  <FiTrash />
                                </span>
                                <span className="payEmptyCart">
                                  {"Empty Cart"}
                                </span>
                              </span>
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
              <GenericModal
              // show={emptyCartConfirmation}
              // type={allCommonText.popupEnums.alert}
              // body={allCommonText.confirmataionMessage}
              // btnText={allCommonText.no}
              // handleAction={() => {
              //   emptyAllCart();
              //   setEmptyCartConfirmation(false);
              // }}
              // button2
              // btnText2={allCommonText.yes}
              // handleClose={() => {
              //   setEmptyCartConfirmation(false);
              // }}
              />
            </div>
          )}
        </SlidingPane>
      </div>
    </>
  );
};
