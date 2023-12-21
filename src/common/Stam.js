// import React from 'react';
// // import { makeStyles } from '@mui/material';
// import { Box, Grid, Paper, Typography } from '@mui/material';

// const useStyles = makeStyles((theme) => ({
//   container: {
//     padding: theme.spacing(2),
//   },
//   hourCell: {
//     borderRight: '1px solid #ccc',
//   },
//   event: {
//     background: 'lightblue',
//     border: '1px solid blue',
//   },
// }));

// const events = [
//   {
//     title: 'Event 1',
//     start: '2023-12-10T09:00:00',
//     end: '2023-12-10T11:00:00',
//   },
//   {
//     title: 'Event 2',
//     start: '2023-12-10T14:00:00',
//     end: '2023-12-10T17:00:00',
//   },
//   // Add more events as needed
// ];

// export const Calendar = () => {
//   const classes = useStyles();

//   // Generate an array of hours from 00:00 to 23:00
//   const hours = Array.from({ length: 24 }, (_, i) => `${i < 10 ? '0' + i : i}:00`);

//   return (
//     <Box className={classes.container}>
//       <Grid container spacing={1}>
//         {/* Hour column */}
//         <Grid item xs={1}>
//           {hours.map((hour) => (
//             <Paper key={hour} className={classes.hourCell}>
//               <Typography variant="subtitle2">{hour}</Typography>
//             </Paper>
//           ))}
//         </Grid>

//         {/* Days column */}
//         <Grid item container xs={11}>
//           {events.map((event) => {
//             const startHour = Number(event.start.slice(11, 13));
//             const endHour = Number(event.end.slice(11, 13));

//             return (
//               <Grid item xs={1} key={event.title}>
//                 <Box
//                   className={classes.event}
//                   style={{ gridRow: `${startHour + 1} / span ${endHour - startHour}` }}
//                 >
//                   <Typography variant="body2">{event.title}</Typography>
//                 </Box>
//               </Grid>
//             );
//           })}
//         </Grid> </Grid></Box>)
// }
// {/* <Collapse in={openAlert} sx={{
//     height: "80%",
//     width: "80%"
//   }}>
//     <Alert severity="info"
//       action={
//         <IconButton
//           aria-label="close"
//           color="inherit"
//           size="small"
//           onClick={() => {
//             setOpenAlert(false);
//           }}
//         >
//           <CloseIcon fontSize="inherit" />
//         </IconButton>
//       }
//       sx={{
//         position: 'fixed',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         zIndex: 9999,
//         mb: 2,

//       }}
//     >
//       שים לב, לא בחרת תאריך להזמנה!
//     </Alert>
//   </Collapse> */}