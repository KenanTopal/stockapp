import { Box, CardMedia, Grid, Stack, TextField, Typography } from "@mui/material";
import { Field } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Page from "../components/UI/Page";
import UiCard from "../components/UI/UiCard";
import UiModal from "../components/UI/UiModal";
import { uiActions } from "../store/uiSlice";
import cw from '../assets/cw.jpeg';


const Firms = () => {
  const firms = useSelector((state) => state.stock.firms);
  const initialValues = {
    name: "",
    image: "",
    address: "", 
    phone:""
  };

  const modalData = useSelector((state) => state.ui.modalData);
  const dispatch = useDispatch();

  let request;
  if (modalData.id)
    request = { endpoint: "firms", to: "/stock/firms", edit: true };
  else request = { endpoint: "firms", to: "/stock/firms", edit: false };



  return (
    <Page title="Firms" btnCaption="Add Firm">
      <Grid container spacing={3}>
        {firms.map((item) => (
          <Grid item xs={12} md={6} lg={4} key={item.id}>
            <UiCard item={item} type="firms">
              <Box p={2}>
                <CardMedia
                  component="img"
                  image={item.image? item.image: cw}
                  height="325"
                  width="250"
                  title={item.name}
                  alt={item.name}
                  sx={{ objectFit: "contain", p: 2 }}
                />

                <Stack direction="row" justifyContent="space-between">
                  <Typography>Name </Typography>
                  <Typography variant="subtitle2" color="secondary">
          
                    {item.name}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography>Phone Number </Typography>
                  <Typography variant="subtitle2" color="secondary">
                    {item.phone}
                  </Typography>
                </Stack>
                <Stack direction="column" alignItems="center" mt={2}>
                  <Typography>Address </Typography>
                  <Typography variant="subtitle2"> {item.address} </Typography>
                </Stack>
              </Box>
            </UiCard>
          </Grid>
        ))}
      </Grid>

      {/* Modal */}

      <UiModal title="Firm" initialValues={initialValues} request={request}>
      <Field
          as={TextField}
          label="Brand Name"
          name="name"
          variant="outlined"
          type="text"
          required
          fullWidth
          sx={{ mb: 2 }}
          onChange={(e) =>
            dispatch(
              uiActions.setModalData({ ...modalData, name: e.target.value })
            )
          }
          value={modalData.name}
        />
        <Field
          as={TextField}
          label="Image Url"
          name="image"
          variant="outlined"
          type="text"
          required
          fullWidth
          sx={{ mb: 2 }}
          onChange={(e) =>
            dispatch(
              uiActions.setModalData({ ...modalData, image: e.target.value })
            )
          }
          value={modalData.image}
        />
        <Field
          as={TextField}
          label="Phone"
          name="phone"
          variant="outlined"
          type="text"
          required
          fullWidth
          sx={{ mb: 2 }}
          onChange={(e) =>
            dispatch(
              uiActions.setModalData({ ...modalData, phone: e.target.value })
            )
          }
          value={modalData.phone}
        />
        <Field
          as={TextField}
          label="Address"
          name="address"
          variant="outlined"
          type="text"
          required
          fullWidth
          sx={{ mb: 2 }}
          onChange={(e) =>
            dispatch(
              uiActions.setModalData({ ...modalData, address: e.target.value })
            )
          }
          value={modalData.address}
        />
      </UiModal>
    </Page>
  );
};

export default Firms;