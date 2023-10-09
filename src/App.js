import React , {useEffect , useState} from 'react';
import './App.css';
import defaultImg from './img/example.png';
// import dayCloudy from './img/day/Cloudy.png';
// import dayLightrain from './img/day/Light rain.png';
// import dayOvercast from './img/day/Overcast.png';
// import dayPartlyCloudy from './img/day/Partly Cloudy.png';
// import daySunny from './img/day/Sunny.png';

// import nightCloudy from './img/night/Cloudy.png';
// import nightlightrain from './img/night/Light rain.png';
// import nightOvercast from './img/night/Overcast.png';
// import nightPartlyCloudy from './img/night/Partly Cloudy.png';
// import nightClear from './img/night/Clear.png';

const key = '60f4bf9f9bb64db8872182516230910';

// const dayCurrImg = {dayCloudy, dayLightrain, dayOvercast , dayPartlyCloudy , daySunny};
// const nightCurrImg = {nightCloudy, nightlightrain, nightOvercast , nightPartlyCloudy , nightClear};

function App() {

  // const[cityInput , setcity] = useState('Erevan');
  const[inputVal , setinputVal] = useState('Erevan');
  // const[isDay , setisDay] = useState(0);
  // const[currImage, setcurrImage]= useState(defaultImg)

  const[currentInfo , setcuurentInfo]= useState({
    city: '',
    temp: '',
    img: '',
    descTitle: ''
  })

  let changeInputState = (e)=>{
    setinputVal(e.target.value)
  }

  let ShowWeather = (e)=>{
    if(e){
      e.preventDefault()
    }
    fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${inputVal}`)
    .then((response)=> response.json())
    .then((data)=> {
      setcuurentInfo({
        city: data.location.name,
        temp: data.current.temp_c,
        img: data.current.condition.icon,
        descTitle: data.current.condition.text
      });
    })
    .catch((err)=>console.log(err))
  }

  useEffect(()=>{
    ShowWeather()
  },[])

  return (
    <div className="App">
      <header className="header">
        <h1 className="title">Weather App (Demo)</h1>
        <form className="form">
          <input className="input" value={inputVal} onChange={(e)=>{changeInputState(e)}} type="text" placeholder="input City Name" />
            <button className="btn" onClick={ShowWeather}>Show</button>
        </form>
      </header>
      <div className="card">
        <h2 className="card-city">{currentInfo.city} <span>GB</span></h2>
        <div className="card-weather">
          <div className="card-value">{currentInfo.temp}<sup>°c</sup></div>
          <img className="card-img" src={currentInfo.img} alt="Weather" />
        </div>
        <div className="card-description">{currentInfo.descTitle}</div>
      </div>
    </div>
  );
}

export default App;
