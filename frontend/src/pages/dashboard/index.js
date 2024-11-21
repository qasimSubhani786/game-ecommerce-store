import React, { useEffect, useState } from "react";
import "./style.scss";
import { ALL_TEXT, colors } from "../../common";
import { Grid } from "@mui/material";
import { HiOutlineUsers } from "react-icons/hi";
import { IoMdWarning } from "react-icons/io";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { BsFillBagCheckFill } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import { GiTimeTrap } from "react-icons/gi";
import { getAllStats } from "../../utils/rest-services";

const Card = ({ icon, title, count }) => {
  return (
    <div className="dashboard-card">
      <div className="dashboard-icon-container">{icon}</div>
      <div className="title-card-dashboard">
        <span>{title}</span>
        <span>{count}</span>
      </div>
    </div>
  );
};

function Dashboard() {
  useEffect(() => {
    getAllDataHandler();
  }, []);
  const [allStats, setallStats] = useState({});
  const getAllDataHandler = async () => {
    let response = await getAllStats();
    setallStats(response);
  };

  let cardsArr = [
    {
      icon: <HiOutlineUsers size={30} color={colors.primary} />,
      title: "Customers",
      count: allStats.userCount,
    },
    {
      icon: <BsFillBagCheckFill size={30} color={colors.primary} />,
      title: "Orders",
      count: allStats.orderCount,
    },
    {
      icon: <HiOutlineCurrencyDollar size={30} color={colors.primary} />,
      title: "Revenue",
      count: `${allStats?.totalRevenue}PKR/-`,
    },
    {
      icon: <TiTick size={30} color={colors.primary} />,
      title: "Orders Delivered",
      count: allStats.deliveredOrder,
    },
    {
      icon: <GiTimeTrap size={30} color={colors.primary} />,
      title: "Orders Inprogress",
      count: allStats.pendingOrder,
    },
    {
      icon: (
        <MdOutlineProductionQuantityLimits size={30} color={colors.primary} />
      ),
      title: "Games",
      count: allStats.gameCount,
    },
    {
      icon: (
        <MdOutlineProductionQuantityLimits size={30} color={colors.primary} />
      ),
      title: "Gears",
      count: allStats.gearCount,
    },
    {
      icon: <IoMdWarning size={30} color={colors.primary} />,
      title: "Complains",
      count: allStats.complainCount,
    },
  ];

  return (
    <div className="dashboard-main-container">
      <div className="title-container-dashboard">
        <span>{ALL_TEXT.DASHBOARD}</span>
      </div>
      <div className="dashboard-card-container">
        <Grid container spacing={2}>
          {cardsArr.map((i, index) => (
            <Grid key={index} item xs={12} sm={4} md={4} lg={3} xl={3}>
              <Card icon={i.icon} title={i.title} count={i.count} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default Dashboard;
