import React, { useEffect, useState } from "react";
import { SingleOrder } from "../../components";
import { getAllOrders } from "../../utils/rest-services";
import { Box, CircularProgress } from "@mui/material";
const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await getAllOrders();
        setOrders(ordersData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <Box>
      {orders && orders?.length === 0 ? (
        <div style={{ alignItems: "center", padding: "20px" }}>
          <CircularProgress />
        </div>
      ) : (
        orders.map((order, index) => (
          <SingleOrder
            key={index}
            price={order.price}
            status={order.status}
            createdAt={order.createdAt}
            orderedBy={order.orderedBy}
            id={order._id}
            setOrders={setOrders}
            number={index}
            transactionId={order.transactionId}
          />
        ))
      )}
    </Box>
  );
};

export default Orders;
