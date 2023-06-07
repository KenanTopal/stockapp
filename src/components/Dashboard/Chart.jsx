import {Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

const Chart = () => {
  const sales = useSelector((state) => state.stock.sales);

  const data = sales.map((item) => ({
    time: item.time_hour,
    price_total: parseInt(item.price_total),
  }));
  return (
    <>
      <Typography> Today</Typography>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          width={500}
          height={300}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis dataKey="price_total">
            <Label angle={270} position="left" style={{ textAnchor: "middle" }}>
              Sale ($)
            </Label>
          </YAxis>

          <Line
            type="monotone"
            dataKey="price_total"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />

          <Tooltip />

        </LineChart>
      </ResponsiveContainer>
      </>
  );
};

export default Chart;