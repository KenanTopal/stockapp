import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/uiSlice";

const Filter = () => {
  const { filterCategory, field, sort, showSort,filteredData  } = useSelector(
    (state) => state.ui
  );
  const { brands, products, sales } = useSelector((state) => state.stock);

  const dispatch = useDispatch();

  const getFilter = () => {
    switch (filterCategory) {
      case "choose":
        console.log("Choose");
        dispatch(uiActions.setFilterData(sales));
        break;
      case "brand":
        if (field) {
          const rows = sales.filter((sale) => sale.brand_id === field);
          dispatch(uiActions.setFilterData(rows));
        }
        break;
      case "product":
        if (field) {
          const rows = sales.filter((sale) => sale.product_id === field);
          dispatch(uiActions.setFilterData(rows));
        }
        break;
      default:
        return null;
    }
  };


  const getSort = ()=>{
    if(sort==='brand'){
       const sortData =  [...filteredData].sort((a,b)=> a.brand.localeCompare(b.brand))
       dispatch(uiActions.setFilterData(sortData))
    }else if(sort==="amount"){
        const sortData =  [...filteredData].sort((a,b)=> Number(a.price) - Number(b.price) )
        dispatch(uiActions.setFilterData(sortData))
    }else{
        if(filterCategory !=='choose'){
            getFilter()
        }
    }
  }
  useEffect(() => {
    getFilter();
    //eslint-disable-next-line
  }, [field, filterCategory]);

  useEffect(()=>{
    getSort()
        //eslint-disable-next-line
  }, [sort])

  return (
    <Box sx={{ display: "flex" }}>
      <div style={{ flexGrow: 1 }}></div>
      <FormControl sx={{ mx: 2 }}>
        <InputLabel> Filter</InputLabel>
        <Select
          label="Filter"
          size="small"
          sx={{ width: "100px" }}
          value={filterCategory}
          onChange={(e) =>
            dispatch(uiActions.setFilterCategory(e.target.value))
          }
        >
          <MenuItem value="choose"> Choose</MenuItem>
          <MenuItem value="brand"> Brand Name</MenuItem>
          <MenuItem value="product"> Product Name</MenuItem>
        </Select>
      </FormControl>

      {filterCategory !== "choose" && (
        <FormControl sx={{ mx: 2 }}>
          <InputLabel> Name</InputLabel>
          <Select
            value={field}
            label="Name"
            size="small"
            sx={{ width: "100px" }}
            onChange={(e) => dispatch(uiActions.setField(e.target.value))}
          >
            {filterCategory === "brand" &&
              brands.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {" "}
                  {item.name}
                </MenuItem>
              ))}
            {filterCategory === "product" &&
              products.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {" "}
                  {item.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      )}

      <Button
        variant="contained"
        onClick={() => dispatch(uiActions.toggleSort())}
        sx={{ mx: 2 }}
      >
        Sort
      </Button>
      {showSort && (
        <RadioGroup row>
          <FormControlLabel
            value="default"
            control={<Radio />}
            label="Default"
            checked={sort === "default"}
            onClick={() => dispatch(uiActions.setSort("default"))}
          />
          <FormControlLabel
            value="brand"
            control={<Radio />}
            label="Brand Name"
            checked={sort === "brand"}
            onClick={() => dispatch(uiActions.setSort("brand"))}
          />
          <FormControlLabel
            value="amount"
            control={<Radio />}
            label="Amount"
            checked={sort === "amount"}
            onClick={() => dispatch(uiActions.setSort("amount"))}
          />
        </RadioGroup>
      )}

      <FormControl sx={{ mx: 2 }}>
        <InputLabel> Sort</InputLabel>
        <Select
          label="Sort"
          size="small"
          sx={{ width: "100px" }}
          value={sort}
          onChange={(e) => dispatch(uiActions.setSort(e.target.value))}
        >
          <MenuItem value="default"> Default</MenuItem>
          <MenuItem value="amount"> Price Ascending</MenuItem>
          <MenuItem value="brand"> Brand's Name (A-Z)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Filter;