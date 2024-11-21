import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getUserOrders } from "../../utils/rest-services";
import { Box, CircularProgress } from "@mui/material";
import { SingleOrder } from "../../components";
// import { getSingleOrder } from "../../utils/rest-services";

const Myorders = () => {
  const [myOrders, setMyOrders] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const allGamesData = await getUserOrders();
      setMyOrders(allGamesData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      {myOrders && myOrders?.length === 0 ? (
        <div style={{ alignItems: "center", padding: "20px" }}>
          <CircularProgress />
        </div>
      ) : (
        myOrders.map((order, index) => (
          <SingleOrder
            key={index}
            transactionId={order.transactionId}
            price={order.price}
            status={order.status}
            createdAt={order.createdAt}
            orderedBy={order.orderedBy}
            id={order._id}
            setOrders={setMyOrders}
            number={index}
            myOrder={true}
          />
        ))
      )}
    </Box>
  );
};

export default Myorders;
