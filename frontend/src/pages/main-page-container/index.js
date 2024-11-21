import React, { useState } from "react";
import { colors, images } from "../../common";
import "./style.scss";
import { IoIosLogOut } from "react-icons/io";
import { GrGamepad } from "react-icons/gr";
import { GiGearStick } from "react-icons/gi";
import { GoIssueOpened } from "react-icons/go";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineUsers } from "react-icons/hi";
import { FaGamepad } from "react-icons/fa";
import { useNavigate } from "react-router";
import { Grid, Typography } from "@mui/material";
import { path } from "../../common/routesNames";
import { ALL_TEXT, ENUMS } from "../../common/constants";
import { ActionDropDownPopUp, GenericModal } from "../../components";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../utils/store/slices/popup-modal";
import { BsReverseListColumnsReverse } from "react-icons/bs";
import { TbDeviceGamepad } from "react-icons/tb";
import { RxBorderWidth } from "react-icons/rx";
import { CartSlider } from "../../components/cart-slider";
import { getProfile } from "../../utils/localstorage";

import { MdFavorite } from "react-icons/md";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-block",
    position: "relative",
  },
  iconButton: {
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  menu: {
    marginTop: theme.spacing(1),
  },
  bottomBox: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    padding: theme.spacing(1),
  },
}));
const SideMenuItem = ({ text, onClick, isSelected, icon }) => {
  return (
    <div
      onClick={onClick}
      className={
        isSelected
          ? `user-section-item selected-tab-sidebar `
          : `user-section-item`
      }
    >
      {icon}
      <span>{text}</span>
    </div>
  );
};

function MainLayout({ SubPage, ...rest }) {
  const [selectedTab, setSelectedTab] = useState(rest.selectedId);
  const [isModal, setIsModal] = useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const modalPopup = useSelector((state) => {
    return state.modal;
  });

  const adminTabs = [
    {
      path: path.dashboard,
      name: ALL_TEXT.DASHBOARD,
      icon: (
        <RxDashboard color={selectedTab == 0 ? colors.primary : colors.gray} />
      ),
    },
    {
      path: path.users,
      name: ALL_TEXT.USERS,
      icon: (
        <HiOutlineUsers
          color={selectedTab == 1 ? colors.primary : colors.gray}
        />
      ),
    },
    {
      path: path.inventory,
      name: "Add Games & Gears",
      icon: (
        <GrGamepad color={selectedTab == 2 ? colors.primary : colors.gray} />
      ),
    },
    {
      path: path.allOrders,
      name: ALL_TEXT.ALL_ORDERS,
      icon: (
        <BsReverseListColumnsReverse
          color={selectedTab == 3 ? colors.primary : colors.gray}
        />
      ),
    },
    {
      path: path.complain,
      name: "Complains",
      icon: (
        <GoIssueOpened
          color={selectedTab == 4 ? colors.primary : colors.gray}
        />
      ),
    },
  ];
  const userTabs = [
    {
      path: path.games,
      name: "Games",
      icon: (
        <TbDeviceGamepad
          color={selectedTab == 0 ? colors.primary : colors.gray}
        />
      ),
    },
    {
      path: path.gears,
      name: "Gears",
      icon: (
        <GiGearStick color={selectedTab == 1 ? colors.primary : colors.gray} />
      ),
    },
    {
      path: path.myOrders,
      name: "My Orders",
      icon: (
        <RxBorderWidth
          color={selectedTab == 2 ? colors.primary : colors.gray}
        />
      ),
    },
    {
      path: path.favorites,
      name: "My Favorites",
      icon: (
        <MdFavorite color={selectedTab == 8 ? colors.primary : colors.gray} />
      ),
    },

    // {
    //   path: path.allProducts,
    //   name: ALL_TEXT.ALL_PRODUCTS,
    //   icon: (
    //     <FaGamepad color={selectedTab == 2 ? colors.primary : colors.gray} />
    //   )
    // },
    // {
    // path: path.singleProductDetails,
    // name: ALL_TEXT.SINGLE_PRODUCT_DETAILS,
    // icon: (
    //   <FaGamepad color={selectedTab == 3 ? colors.primary : colors.gray} />
    // )
    // }
  ];

  // const navTabs = [
  //   {
  //     path: path.dashboard,
  //     name: ALL_TEXT.DASHBOARD,
  //     icon: (
  //       <RxDashboard color={selectedTab == 0 ? colors.primary : colors.gray} />
  //     ),
  //   },
  //   {
  //     path: path.users,
  //     name: ALL_TEXT.USERS,
  //     icon: (
  //       <HiOutlineUsers
  //         color={selectedTab == 1 ? colors.primary : colors.gray}
  //       />
  //     ),
  //   },
  //   {
  //     path: path.inventory,
  //     name: "Add Games & Gears",
  //     icon: (
  //       <GrGamepad color={selectedTab == 2 ? colors.primary : colors.gray} />
  //     ),
  //   },
  //   {
  //     path: path.allOrders,
  //     name: ALL_TEXT.ALL_ORDERS,
  //     icon: (
  //       <BsReverseListColumnsReverse
  //         color={selectedTab == 3 ? colors.primary : colors.gray}
  //       />
  //     ),
  //   },
  //   {
  //     path: path.complain,
  //     name: "Complains",
  //     icon: (
  //       <GoIssueOpened
  //         color={selectedTab == 4 ? colors.primary : colors.gray}
  //       />
  //     ),
  //   },
  //   {
  //     path: path.games,
  //     name: "Games",
  //     icon: (
  //       <TbDeviceGamepad
  //         color={selectedTab == 5 ? colors.primary : colors.gray}
  //       />
  //     ),
  //   },
  //   {
  //     path: path.gears,
  //     name: "Gears",
  //     icon: (
  //       <GiGearStick color={selectedTab == 6 ? colors.primary : colors.gray} />
  //     ),
  //   },
  //   {
  //     path: path.myOrders,
  //     name: "My Orders",
  //     icon: (
  //       <RxBorderWidth
  //         color={selectedTab == 7 ? colors.primary : colors.gray}
  //       />
  //     ),
  //   },

  //   // {
  //   //   path: path.allProducts,
  //   //   name: ALL_TEXT.ALL_PRODUCTS,
  //   //   icon: (
  //   //     <FaGamepad color={selectedTab == 2 ? colors.primary : colors.gray} />
  //   //   )
  //   // },
  //   // {
  //   // path: path.singleProductDetails,
  //   // name: ALL_TEXT.SINGLE_PRODUCT_DETAILS,
  //   // icon: (
  //   //   <FaGamepad color={selectedTab == 3 ? colors.primary : colors.gray} />
  //   // )
  //   // }
  // ];
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Implement your logout functionality here
    localStorage.removeItem("authToken");
    localStorage.removeItem("userProfile");
    handleClose();
    navigate("/login");
  };
  const menuItems = [
    {
      title: ALL_TEXT.LOGOUT,
      icon: (
        <span>
          <IoIosLogOut />
        </span>
      ),
    },
  ];

  return (
    <div className="background-dashboard">
      <div className="header-container">
        <div className="header-icon-container d-flex justify-content-between align-items-center">
          <img className="noduk-icon-header" src={images.mainLogo} />
          <Typography
            variant="h6"
            style={{ color: "red", fontFamily: "poppins" }}
          >
            Gaming Era
          </Typography>
        </div>
        <div className="header-secondary-container">
          {getProfile().role === "User" && <CartSlider />}
          <IoMdNotificationsOutline className="noti-icon-header" size={20} />
          <div className="log-out-popUp">
            <ActionDropDownPopUp
              userInfo
              userImage={
                <img className="header-dp-icon" src={images.userIcon} />
              }
              userEmail={getProfile().email}
              userName={getProfile().name}
              items={menuItems}
              visibleIcon={
                <img className="header-dp-icon" src={images.userIcon} />
              }
            />
          </div>
        </div>
      </div>
      <div className="main-layout-handler">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
            <div className="side-bar-container">
              {getProfile().role === "Admin"
                ? adminTabs.map((i, index) => {
                    const { name, path, icon } = i;
                    return (
                      <SideMenuItem
                        key={index}
                        icon={icon}
                        isSelected={index == selectedTab}
                        onClick={() => {
                          setSelectedTab(index);
                          navigate({ pathname: path });
                        }}
                        text={name}
                      />
                    );
                  })
                : userTabs.map((i, index) => {
                    const { name, path, icon } = i;
                    return (
                      <SideMenuItem
                        key={index}
                        icon={icon}
                        isSelected={index == selectedTab}
                        onClick={() => {
                          setSelectedTab(index);
                          navigate({ pathname: path });
                        }}
                        text={name}
                      />
                    );
                  })}
            </div>
          </Grid>
          <Grid item xs={12} sm={10} md={10} lg={10} xl={10}>
            <div className="sub-page-container">
              <SubPage />
            </div>
          </Grid>
        </Grid>
      </div>
      <GenericModal
        show={modalPopup.openModal}
        type={modalPopup.type}
        title={modalPopup.title}
        body={modalPopup.details}
        buttonText={modalPopup.primaryBtnText}
        handleClose={() => dispatch(closeModal())}
      />
    </div>
  );
}

export default MainLayout;
