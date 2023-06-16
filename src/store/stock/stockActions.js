import axios from "axios";
import notify from "../../utils/notify";
import { stockActions } from "./stockSlice";

const url = "https://13134.fullstack.clarusway.com";

export const getData = (type) => {
  return async (dispatch) => {
    const token = atob(sessionStorage.getItem("token"));
    try {
      const res = await axios(`${url}/stock/${type}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      if (res.status === 200) {
        switch (type) {
          case "firms":
            dispatch(stockActions.getFirms(res.data));
            break;
          case "products":
            dispatch(stockActions.getProducts(res.data));
            break;
          case "brands":
            dispatch(stockActions.getBrands(res.data));
            break;
          case "categories":
            dispatch(stockActions.getCategories(res.data));
            break;
          case 'sales':
            dispatch(stockActions.getSales(res.data));
            break;
          default:
            return null;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const getTransactions = () => {
  return async (dispatch) => {
    const token = atob(sessionStorage.getItem("token"));
    try {
      const res = await axios(`${url}/stock/purchases/`, {
        headers: { Authorization: `Token ${token}` },
      });

      const resSale = await axios(`${url}/stock/sales/`, {
        headers: { Authorization: `Token ${token}` },
      });

      if (res.data && resSale.data) {
        dispatch(
          stockActions.getTransactions({
            sales: resSale.data,
            purchases: res.data,
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const setData = (method, type, info, navigate, path) => {
  return async (dispatch) => {
    type = type.toLowerCase();
    method = method.toLowerCase();
    const token = atob(sessionStorage.getItem("token"));

    const config = {
      method: method,
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    };
    let action;
    switch (method) {
      case "put":
        config.url = `${url}/stock/${type}/${info.id}/`;
        config.data = info;
        action = "Updated";
        break;
      case "post":
        config.url = `${url}/stock/${type}/`;
        config.data = info;
        action = "Added";
        break;
      case "delete":
        config.url = `${url}/stock/${type}/${info}/`;
        action='Deleted';
        break;
      default:
        return null;
    }

    try{
        const res = await axios(config);

        if(res.status ===201 || 204 || 200){
            notify(`${type[0].toUpperCase()+ type.slice(1)} successfully ${action}`  , 'success')
            dispatch(getData(type))
            navigate(path);
        }

    }catch(err){
        console.log(err)
        notify(' Please check your authorization', 'error')

    }
  };
};