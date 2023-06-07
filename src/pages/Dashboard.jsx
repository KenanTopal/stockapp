import { Box, Grid, Paper, Typography, Container } from "@mui/material";
import Chart from "../components/Dashboard/Chart";
import Profit from '../components/Dashboard/Profit';
import TransactionsTable from "../components/Dashboard/TransactionsTable";

import React from "react";

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom align="center" mt={2}>
        Dashboard
      </Typography>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8} lg={9}>
            <Paper sx={{ p: 2, height: "40vh" }}>
              <Chart />
            </Paper>
          </Grid>

          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                height: "40vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#71b2f3",
                flexDirection:'column',
                color: "white",
              }}
            >
              <Profit/>
            </Paper>
          </Grid>

          <Grid item xs={12}>
              <Paper sx={{p:2}}>
                <TransactionsTable/>
              </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;