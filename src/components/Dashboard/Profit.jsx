import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Profit = () => {
  const totalProfit = useSelector((state) => state.stock.totalProfit);
  return (
    <>
      <Typography> Total Profit</Typography>
      <Typography
        variant="h6"
        sx={{ color: totalProfit.profitTotal > 0 ? "green" : "red" }}
      >
        {totalProfit && totalProfit.profitTotal}
      </Typography>
      <Typography> Total Sale</Typography>
      <Typography variant="h6">
        {totalProfit && totalProfit.profitSale}
      </Typography>
      <Typography> Total Purchase</Typography>
      <Typography variant="h6">
        {totalProfit && totalProfit.profitPurchase}
      </Typography>
    </>
  );
};

export default Profit;