import * as React from 'react';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AddressForm from './AdressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { useContext, useState } from "react";
import { DataContext, SERVERURL } from '../client/data-context'
import dayjs from "dayjs";
import { useEffect } from 'react';
import moment from 'moment';

const steps = ['אופן המסירה', 'פרטי תשלום', 'סקירה על ההזמנה', 'סיום'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    case 3:
      break;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const [orderId, setOrderId] = useState(0);
  const currentDate = dayjs(); // Get the current date
  const ctx = useContext(DataContext)
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  useEffect(() => {
    if (activeStep === 3) {
      let order = {
        Id: 0, UserId: ctx.cart.userId, DeliveryPrice: ctx.deliveryPrice, DateOrder: currentDate,
        FromDate: moment(ctx.cart.fromDate).format("YYYY-MM-DDTHH:mm"), ToDate: moment(ctx.cart.toDate).format("YYYY-MM-DDTHH:mm"), PaidUp: true, Receipt: true, TotalPrice: ctx.deliveryPrice + ctx.cart.totalPrice, CartId: ctx.cart.id
      }
      console.log(order)
      axios.post(`${SERVERURL}/api/Order/addorder`, order
        , { headers: { Authorization: `Bearer ${ctx.token}` } })
        .then(ans => {
          console.log(ans);
          if (ans.data != 1) {
            setOrderId(ans.data)
            order.Id = ans.data
            axios.post(`${SERVERURL}/api/Email/confirmorder`, { order: order, user: ctx.user, products: [] }
              , { headers: { Authorization: `Bearer ${ctx.token}` } })
            ctx.addOrder()
          }

        })
    }
  }, [activeStep])
  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === 3 ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                תודה על ההזמנה!
              </Typography>
              <Typography variant="subtitle1" >
                ההזמנה הושלמה בהצלחה!
              </Typography>
              <Typography>
                מספר הזמנה: {orderId}
                שמור את מספר ההזמנה למקרה הצורך!
              </Typography>
              <Typography>
                אישור הזמנה למייל נשלח אליך בדקות הקרובות
              </Typography>
              <Typography>
                תודה שהזמנת מורשת ☺️
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    חזור
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === 2 ? 'בצע הזמנה' : 'הבא'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
}