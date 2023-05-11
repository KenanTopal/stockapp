import { Box, Card } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/uiSlice";
import { setData } from "../../store/stock/stockActions";
import { useNavigate } from "react-router-dom";

const UiCard = ({item, type, children}) => {
  const [editVisible, setEditVisible] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();



  const handleDelete = (id)=>{
    dispatch(setData('delete', type, id, navigate, `/stock/${type}` ))
  }
  const handleEdit = (data)=>{
    console.log(data)
    dispatch(uiActions.setModalData(data))
    dispatch(uiActions.openModal())
  }

  return (
    <Card
      sx={{ position: "relative" }}
      onMouseOver={() => setEditVisible(true)}
      onMouseOut={() => setEditVisible(false)}
    >
      {children}
      {editVisible&&(
        <Box sx={{position:'absolute', top:'10px', right:'10px'}}>
            <EditIcon sx={{cursor:'pointer', color: 'orange'}} onClick={()=> handleEdit(item)}/>
            <DeleteOutlineIcon sx={{cursor:'pointer' , color: 'red'}} onClick={()=> handleDelete(item.id)}/>
        </Box>
      )}
    </Card>
  );
};

export default UiCard;