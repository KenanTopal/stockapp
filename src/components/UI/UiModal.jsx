import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { Form, Formik } from "formik";
import React from "react";
import { uiActions } from "../../store/uiSlice";
import { setData } from "../../store/stock/stockActions";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#efefef",
  boxShadow: 24,
  p: 4,
};

const UiModal = ({ title, initialValues, request, children }) => {
  const modalOpen = useSelector((state) => state.ui.modalOpen);
  const modalData = useSelector(state=> state.ui.modalData)
  
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) =>{
    actions.resetForm();
    actions.setSubmitting(false);
    console.log(request);
    if(request.edit)
      dispatch(setData('put', request.endpoint, modalData, navigate, request.to))
    else 
      dispatch(setData('post', request.endpoint, modalData, navigate, request.to))
    dispatch(uiActions.closeModal())
    dispatch(uiActions.setModalData({}))
  }

  const handleCancel = ()=>{
      dispatch(uiActions.closeModal())
      dispatch(uiActions.setModalData({}))
  }
  return (
    <Modal open={modalOpen}>
      <Box sx={style}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              {children}
              <Stack direction="row" justifyContent="space-between">
                <Button type="submit" variant="contained" size="large">
                  {request.edit? `Update ${title}` : `Add new ${title}`}
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  size="large"
                  color="error"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Stack>
            </Form>
          </Formik>
        </Box>
      </Box>
    </Modal>
  );
};

export default UiModal;