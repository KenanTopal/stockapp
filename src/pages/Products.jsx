import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Field } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Page from "../components/UI/Page";
import UiModal from "../components/UI/UiModal";
import { setData } from "../store/stock/stockActions";
import { uiActions } from "../store/uiSlice";

const Products = () => {
  const products = useSelector((state) => state.stock.products);
  const brands = useSelector((state) => state.stock.brands);
  const categories = useSelector((state) => state.stock.categories);
  const modalData = useSelector((state) => state.ui.modalData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initalValues = {
    name: "",
    category_id: "",
    brad_id: "",
  };
  const request = {
    endpoint: "products",
    to: "/stock/products",
    edit: false,
  };

  const handleDelete = (id) => {
    dispatch(setData("delete", "products", id, navigate, "/stock/products"));
  };

  return (
    <Page title="Products" btnCaption="New Product">
      <Container>
        <TableContainer component={Paper} sx={{ mt: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell># </TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.brand}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  {!row.stock ? (
                    <TableCell sx={{ color: "red" }}>0</TableCell>
                  ) : (
                    <TableCell>{row.stock}</TableCell>
                  )}
                  <TableCell>
                    <DeleteOutlineIcon
                      sx={{ cursor: "pointer", color: "red" }}
                      onClick={() => handleDelete(row.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      {/* modal */}
      <UiModal title="Product" initialValues={initalValues} request={request}>
        <FormControl fullWidth>
          <InputLabel> Category</InputLabel>
          <Field
            as={Select}
            name="category_id"
            label="Category"
            sx={{ mb: 3 }}
            onChange={(e) =>
              dispatch(
                uiActions.setModalData({
                  ...modalData,
                  category_id: e.target.value,
                })
              )
            }
            value={modalData.category_id}
          >
            {categories.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Field>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel> Brand</InputLabel>
          <Field
            as={Select}
            name="brand_id"
            label="Brand"
            sx={{ mb: 3 }}
            onChange={(e) =>
              dispatch(
                uiActions.setModalData({
                  ...modalData,
                  brand_id: e.target.value,
                })
              )
            }
            value={modalData.brand_id}
          >
            {brands.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {" "}
                {item.name}
              </MenuItem>
            ))}
          </Field>
        </FormControl>

        <FormControl fullWidth>
          <TextField 
          label="Product Name"
          name="name"
          variant="outlined"
          required
          sx={{mb:3}}
          onChange={(e) =>
            dispatch(
              uiActions.setModalData({
                ...modalData,
               name: e.target.value,
              })
            )
          }
          value={modalData.name}

          />
        </FormControl>
      </UiModal>
    </Page>
  );
};

export default Products;