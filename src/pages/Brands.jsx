import { CardHeader, CardMedia, Grid, TextField } from "@mui/material";
import { Field } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Page from "../components/UI/Page";
import UiCard from "../components/UI/UiCard";
import UiModal from "../components/UI/UiModal";
import { uiActions } from "../store/uiSlice";

const Brands = () => {
  const brands = useSelector((state) => state.stock.brands);
  const modalData = useSelector((state) => state.ui.modalData);
  const dispatch = useDispatch();

  let request;
  if (modalData.id)
    request = { endpoint: "brands", to: "/stock/brands", edit: true };
  else request = { endpoint: "brands", to: "/stock/brands", edit: false };

  const initialValues = {
    name: "",
    image: "",
  };

  return (
    <Page title="Brands" btnCaption="New Brand">
      <Grid container spacing={1}>
        {brands.map((item) => (
          <Grid item xs={12} md={6} lg={4} key={item.id}>
            <UiCard item={item} type="brands">
              <CardHeader
                title={item.name}
                sx={{ textAlign: "center", color: "dodgerblue" }}
              />
              <CardMedia
                component="img"
                image={item.image}
                height="325"
                width="250"
                title={item.name}
                alt={item.name}
                sx={{ objectFit: "cover", p: 2 }}
              />
            </UiCard>
          </Grid>
        ))}
      </Grid>

      <UiModal initialValues={initialValues} title="Brand" request={request}>
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
      </UiModal>
    </Page>
  );
};

export default Brands;