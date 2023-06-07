import React, { useEffect } from "react";
import Page from "../components/UI/Page";
import Filter from "../components/UI/Filter";
import {
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
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { uiActions } from "../store/uiSlice";
import {  getData, setData } from "../store/stock/stockActions";
import { useNavigate } from "react-router-dom";
import UiModal from "../components/UI/UiModal";
import { Field } from "formik";

const Sales = () => {
  const { filteredData, modalData } = useSelector((state) => state.ui);
  const { products, brands, sales } = useSelector((state) => state.stock);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleEdit = (data) => {
    dispatch(uiActions.setModalData(data));
    dispatch(uiActions.openModal());
  };

  const handleDelete = (id) => {
    dispatch(setData("delete", "sales", id, navigate, "/stock/sales"));
  };

  const initialValues = {
    brand_id: "",
    product_id: "",
    quantity: 0,
    price: "",
  };

  let request;
  if (modalData.id)
    request = { endpoint: "sales", to: "/stock/sales", edit: true };
  else request = { endpoint: "sales", to: "/stock/sales", edit: false };


  useEffect(()=>{
    dispatch(getData('sales'))
    dispatch(uiActions.setFilterData(sales))
  }, [modalData])

  return (
    <Page title="Sales" btnCaption="New Sale">
      <Filter />

      <Paper sx={{ overflow: "hidden", margin: "30px auto" }}>
        <TableContainer sx={{ border: "5px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Catgory</TableCell>
                <TableCell>Brand's Name</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData &&
                filteredData?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.createds}</TableCell>
                    <TableCell>{row.category[0].name}</TableCell>
                    <TableCell>{row.brand}</TableCell>
                    <TableCell>{row.product}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>{row.price_total}</TableCell>
                    <TableCell>
                      <EditIcon
                        sx={{ cursor: "pointer", color: "orange" }}
                        onClick={() => handleEdit(row)}
                      />
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
      </Paper>

      <UiModal
        title="Sale"
        initialValues={initialValues}
        request={request}
      >
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
                  brand_id: Number(e.target.value),
                })
              )
            }
            value={modalData.brand_id}
          >
            {brands.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Field>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel> Product</InputLabel>
          <Field
            as={Select}
            name="product_id"
            label="Product"
            sx={{ mb: 3 }}
            onChange={(e) =>
              dispatch(
                uiActions.setModalData({
                  ...modalData,
                  product_id: Number(e.target.value),
                })
              )
            }
            value={modalData.product_id}
          >
            {products.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Field>
        </FormControl>

        <FormControl fullWidth sx={{my:2}}>
          <TextField label="Quantity" name="quantity" variant="outlined" value={modalData.quantity}
            type="number" InputProps={{inputProps: {min:0}}}   
             onChange={(e) =>
              dispatch(
                uiActions.setModalData({
                  ...modalData,
                  quantity: Number(e.target.value),
                })
              )
            }
          />
        </FormControl>

        <FormControl fullWidth sx={{my:2}}>
          <TextField label="Price" name="price" variant="outlined" value={modalData.price}
            type="number" InputProps={{inputProps: {min:0}}}   
             onChange={(e) =>
              dispatch(
                uiActions.setModalData({
                  ...modalData,
                  price: e.target.value,
                })
              )
            }
          />
        </FormControl>

      </UiModal>
    </Page>
  );
};

export default Sales;