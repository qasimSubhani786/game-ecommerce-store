import React, { useState } from "react";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiCheckCircle } from "react-icons/fi";
import { makeStyles } from "@material-ui/core/styles";
import "./style.scss";
import { updateStatus } from "../../utils/rest-services";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FiMoreVertical } from "react-icons/fi";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router";
import { path } from "../../common/routesNames";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f5f5f5",
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    color: "#E03333",
    marginLeft: theme.spacing(1),
  },
  button: {
    color: "#E03333",
    marginTop: theme.spacing(2),
    "&:hover": {
      backgroundColor: "#ba0d4d",
    },
  },
}));

const options = ["Pending", "Delivered"];
const ITEM_HEIGHT = 48;

const SingleOrder = ({
  price,
  status,
  createdAt,
  orderedBy,
  id,
  setOrders,
  number,
  transactionId,
  myOrder,
}) => {
  const classes = useStyles();
  const [currentStatus, setCurrentStatus] = useState(
    `${status ? status : "Pending"}`
  );
  const statusUpdate = async (values, formik) => {
    let result = await updateStatus(
      id,
      status === "PENDING" ? "DELIVERED" : "PENDING"
    );
    if (result?.success === "Order status updated") {
      setCurrentStatus(status === "PENDING" ? "DELIVERED" : "PENDING");
      setOrders((oldOrders) => {
        const newOrders = [...oldOrders];
        newOrders[number].status =
          status === "PENDING" ? "DELIVERED" : "PENDING";
        return newOrders;
      });
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box className={`${classes.root} orderParent`}>
      <Grid
        container
        spacing={2}
        alignItems="center"
        className="orderContainer"
      >
        <Grid item xs={12} sm={6}>
          {transactionId && (
            <Typography variant="h6">
              <b>{`${transactionId}`}</b>
            </Typography>
          )}

          <Typography variant="subtitle1">
            <b>Order By:</b> {orderedBy.name}
          </Typography>

          <Typography variant="subtitle1">
            <b>Total Price:</b>&nbsp;PKR&nbsp;{price}{" "}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} align="center">
          <div className="buttonContainer">
            <IconButton aria-label="shopping cart" disableRipple>
              <AiOutlineShoppingCart size={48} color="#c2185b" />
              <Typography variant="subtitle1" className={classes.badge}>
                {currentStatus}
              </Typography>
            </IconButton>
            {/* <Button
              variant="contained"
              className={classes.button}
              onClick={statusUpdate}
            >
              Update Status
              <FiCheckCircle style={{ marginLeft: "8px" }} />
            </Button> */}
            {!myOrder && (
              <Tooltip title={"Change Status"}>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <FiMoreVertical />
                </IconButton>
              </Tooltip>
            )}
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              {options.map((option) => (
                <MenuItem
                  key={option}
                  onClick={() => {
                    statusUpdate();
                    handleClose();
                  }}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SingleOrder;
