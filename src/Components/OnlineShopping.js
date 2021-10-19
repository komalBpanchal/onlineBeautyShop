import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import TextField from '@mui/material/TextField';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Checkbox from '@mui/material/Checkbox';


// import DashboardSharpIcon from '@mui/mui-material/DashboardSharp';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
// import { maxWidth } from '@mui/system';
// import Button from '@mui/material/Button';
import ShowOrder from './ShowOrder'
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});
let discount = [
  { id: 'flatDiscount', discount: 30 },
  { id: 'axisBank', discount: 10 },
  { id: 'bigdeal', discount: 25 },
  { id: 'craditCard', discount: 20 },
]
let coins = [500, 200, 100, 50, 20, 10];
let Products = [
  { pid: '1', pimage: '/Images/LakmeCCcream.jpg', pname: 'CCcream', price: 1000 },
  { pid: '2', pimage: '/Images/LakmeCompack.jpg', pname: 'Compack', price: 1100 },
  { pid: '3', pimage: '/Images/LakmeEyeLinear.jpg', pname: 'EyeLinear', price: 400 },
  { pid: '4', pimage: '/Images/LakmeFoundation.jpeg', pname: 'Foundation', price: 400 },
]
export default function Demo() {

  let [id, setPid] = useState('');
  let [amount, setAmount] = useState('');
  let [discounts, setDiscounts] = useState('');
  const [result, setRsult] = useState([]);
  const [details, setDetails] = useState(true);
  const [emptyError, setEmptyError] = useState('');
  const [check, setcheck] = useState([]); 
  const [productId, setProductId] = useState([]); 
  const textInput = React.useRef();

  let totalDis = '';
  let arr = [];
  let sumOfPrice = '';
  let remPrice = '';
 
  const handleClick = (Products) => {
   
    sumOfPrice = check.reduce((a,b) => a+b,0);
            if ( amount === '') {
              return setEmptyError('Please Enter amount!!')
            }
            if (amount) {
              if (parseInt(amount) < sumOfPrice) {
                return setEmptyError("No enough money for this product!!");
              }
              if (amount >= sumOfPrice) {
      
                discount.map((dis, index) => {
                  if (discounts === dis.id) {
                    totalDis = sumOfPrice - (sumOfPrice * dis.discount) / 100;
                    return remPrice = amount - totalDis;
                  } if (discounts === '') {
                    return remPrice = amount - sumOfPrice;
                  }
                })
                while (remPrice !== 0) {
                  let totalCoins = coins.find((ele) => ele <= remPrice);
                  remPrice = remPrice - totalCoins;
                  arr.push(totalCoins);
                }
               
                setRsult(arr);
                setDetails(details ? false : true);
              }
            }
        }
       
  const checkboxclick = (lakme,id) => {
    let newarr = [];
    let newarr1 = [];
      if(productId.includes(lakme.pid)){  
        newarr=  productId.filter((r) => {
          if (r!== lakme.pid) {
            return r 
          }
        })
        newarr1= check.filter((r1) => {
          if(r1!==lakme.price){
            return r1 
          }
        }) 
        setcheck(newarr1);
        setProductId(newarr);
      }
      else{
        setcheck([...check,lakme.price]);
        setProductId([...productId,lakme.pid]);
      }
       
  } 
  return (<>
    <Box sx={{ flexGrow: 1 }} style={{ marginBottom: '0%', }}>
      <AppBar position="static" style={{ backgroundColor: '#316B83' }}>
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Lakme Beauty Products
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    <Paper sx={{ p: 2, maxWidth: 500, marginLeft: '5%', marginTop: '10px', flexGrow: 1, backgroundColor: '#6D8299' }}>
      
      {
        Products?.map((lakme) => {
          return <>
            <Grid container spacing={2} marginBottom='15px'>
              <Grid item>
                <ButtonBase sx={{ width: 128, height: 128 }}>
                  <Img src={process.env.PUBLIC_URL + lakme.pimage} style={{ width: '400px', height: '400px' }} />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1" component="div">
                      ID: {lakme.pid}
                    </Typography>
                    <Typography variant="body2" gutterBottom color="text.secondary">
                      Name:{lakme.pname}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price:{lakme.price}
                    </Typography>
                    <Grid item>
                      <Typography variant="subtitle1" component="div">
                        <Checkbox
                          id="chk" 
                          icon={<BookmarkBorderIcon />}
                          checkedIcon={<BookmarkIcon />}
                       
                          onClick={() => checkboxclick(lakme,id)}
                        />
                      </Typography>
                    </Grid>

                  </Grid>
                </Grid>
              </Grid>
            </Grid></>
        })}
    </Paper>

    <Box style={{ marginBottom: '4%', marginLeft: '5%', marginTop: '0px', backgroundColor: '#8CA1A5', maxWidth: '31.5%' }}>
      <Typography>
        <TextField id="filled-basic" label="Amount" variant="filled" style={{ backgroundColor: 'azure',marginTop: '20px' }}
          onChange={(e) => setAmount(e.target.value)} ref={textInput} />
      </Typography>
      <Typography>
        <TextField id="filled-basic" label="GetDiscount" variant="filled" style={{ backgroundColor: 'azure' }}
          onChange={(e) => setDiscounts(e.target.value)} />
      </Typography>
      <Toolbar variant="dense" >
        <IconButton color="primary" aria-label="add to shopping cart" size="large"  >
          <AddShoppingCartIcon style={{ marginLeft: '200', size: 'large' }} onClick={() => handleClick(Products)} />
        </IconButton>
      </Toolbar>
    </Box>
{emptyError ?
      <Box style={{
        width: 600,
        height: 400,
        position: "absolute",
        zIndex: 999,
        top: "8%",
        marginLeft: "50%",
        textAlign: "center", backgroundColor: '#8CA1A5'
      }}>
        <AppBar position="static" style={{ backgroundColor: '#316B83' }}>
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div">
              Opps somthing is wrong!!
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper sx={{ p: 2, maxWidth: 500, marginLeft: '8%', marginTop: '25px', flexGrow: 1, backgroundColor: '#6D8299' }}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  <h2>{emptyError}</h2>
                </Typography>

              </Grid>
            </Grid>
          </Grid>
        </Paper></Box> : ''}

    {
        !details ? <ShowOrder setDetails={Products} id={productId} notes={result} /> : ""}

  </>);
}



