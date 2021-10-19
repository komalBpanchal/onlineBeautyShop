import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
// import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

let result = [
    { pid: 500, image: '/Images/500Rupees.jpeg', quantity: 0 },
    { pid: 200, image: '/Images/200Rupees.jpg', quantity: 0 },
    { pid: 100, image: '/Images/100Rupees.jpeg', quantity: 0 },
    { pid: 50, image: '/Images/50Rupees.jpeg', quantity: 0 },
    { pid: 20, image: '/Images/20Rupees.jpg', quantity: 0 },
    { pid: 10, image: '/Images/10Rupees.jpeg', quantity: 0 },
];
export default function ShowOrder({ setDetails, id, notes, seterror }) {
    const [ruppes, setruppes] = React.useState(result);

    React.useEffect(() => {


        const temp = ruppes.map((rup) => {

            for (let i = 0; i < notes.length; i++) {
                if (rup.pid == notes[i]) {
                    //  console.log("res",notes,ruppes)
                    rup.quantity += 1;
                }
            }
            return { ...rup }
        })
        setruppes(temp)
    }, [notes])

    return (
        <div>
            <Box style={{
                width: 700,
                height: 800,
                position: "absolute",
                zIndex: 999,
                top: "8%",
                marginLeft: "50%",
                textAlign: "center", backgroundColor: '#8CA1A5'
            }}>
                <AppBar position="static" style={{ backgroundColor: '#316B83' }}>
                    <Toolbar variant="dense">
                        <Typography variant="h6" color="inherit" component="div">
                            Your orderd details
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Paper sx={{ p: 2, maxWidth: 500, marginLeft: '8%', marginTop: '25px', flexGrow: 1, backgroundColor: '#6D8299' }}>
                    {


                        setDetails?.map((order) => {
                            // console.log(id);
                            for (let i = 0; i < id.length; i++) {
                                if (order.pid === id[i]) {
                                    return <>
                                        <Grid container spacing={2} marginBottom='15px'>
                                            <Grid item>
                                                <ButtonBase sx={{ width: 128, height: 128 }}>
                                                    <Img src={process.env.PUBLIC_URL + order.pimage} style={{ width: '400px', height: '400px' }} />
                                                </ButtonBase>
                                            </Grid>
                                            <Grid item xs={12} sm container>
                                                <Grid item xs container direction="column" spacing={2}>
                                                    <Grid item xs>
                                                        <Typography gutterBottom variant="subtitle1" component="div">
                                                            ID: {order.pid}
                                                        </Typography>
                                                        <Typography variant="body2" gutterBottom color="text.secondary">
                                                            Name:{order.pname}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Price:{order.price}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </>
                                }
                            }}
                        )}
                </Paper>
                {
                    ruppes.map((val) => {
                        for (let i = 0; i < notes.length; i++) {
                            if (val.pid == notes[i]) {
                                return (
                                    <><Box>
                                        <Img
                                            src={val.image}
                                            id="itemImg"
                                            style={{
                                                marginTop: "5%",
                                                height: "20%",
                                                width: "20%",
                                            }}
                                        />
                                        *{val.quantity}</Box>
                                    </>
                                );
                            }
                        }
                    })
                }
            </Box>
        </div>
    )
}
