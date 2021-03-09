import React ,{useState,useEffect} from 'react';
import Axios from "axios";
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
const useStyles=makeStyles({
  root:{
    top:"110px",
    left:"510px"
  },
  heed:{
    fontSize:"70px",
    position:'fixed',
    color:"#22CB5C",
    left:"400px"
  },
  text:{
    top:"110px",
    left:"500px",
    border:"3px solid #8D3DAF",
    backgroundColor:"#CAD5E2"
  },
  caad:{
    position:"fixed",
    top:"190px",
    left:"500px",
    width:"22rem",
    height:"10rem",
    backgroundColor:"#120E43",
    color:"#CAD5E2"
  }
})

const App = ()=>{
  const [cityname, setCityname] = useState("");
  const [result, setResult] = useState({
    nameofcity: "--" ,
    description: "--",
    temp : "--",
  });
  const [isNetworkconneted , setIsNetworkconnected] = useState(true);
  const APIKEY = "bcbf51d90fa65cf8c1352f49476a7683";
  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" + APIKEY;
  
  const fetchDetails=async ()=>{
   try{ const {data,status}= await Axios.get(url);
    if (status==200) {
      var temp=data.main.temp-273.15;
    var temperature=parseFloat(temp).toFixed(2)
    const details ={
      temp:temperature,
      description:data.weather[0].description,
      nameofcity:data.name
    }
    setResult(details);
    setIsNetworkconnected(true)
    }
    else{
      setIsNetworkconnected(false)
    }
  }
  catch(err){
    setIsNetworkconnected(false);
    console.log(err);
  }
  };
  const classes = useStyles();
  return(
    <div>
      <h1 className={classes.heed}>Today's Climate</h1>
      <div style={{backgroundColor:"#242B2E"}}>
      <TextField id="outlined-basic" label="Enter city name" 
      variant="outlined" value={cityname}
      onChange={e=>setCityname(e.target.value)}
      className={classes.text}
    />
    <Button variant="contained" color="secondary"
    className={classes.root}
    onClick={fetchDetails}>
  Search
    </Button>
    </div>
    {isNetworkconneted?cityname==""?
    <Card className={classes.caad}>
    <CardContent>
      <h3>Please enter NAME of city</h3>
    </CardContent>
  </Card>
    : 
    <Card className={classes.caad}>
      <CardContent>
        <h3>Name of City {result.nameofcity}</h3>
      <h3>Temp is {result.temp} (in deg C)</h3>
      <h4>{result.description}</h4>
      </CardContent>
    </Card>
     :
     <Card className={classes.caad}>
     <CardContent>
       <h1>Check Network</h1>
       <h1> or Check City Name</h1>
       <Button variant="contained" color="primary"
       style={{alignContent:'center'}}
    onClick={window.location.reload}>Retry</Button>
     </CardContent>
   </Card>
   }
    </div>
  )
};

export default App;