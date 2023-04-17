import { useEffect, useState } from "react";
import "./App.css";

const FATC_URL = "https://catfact.ninja/fact";
const CAT_GIF_URL = `https://cataas.com/cat/says/hello=`;

function App() {
  const [fact, setFact] = useState('');
  const [gifCatUrl, setGifCatUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const getFact = () => {
    fetch(FATC_URL)
      .then((resp) => resp.json())
      .then((data) => {
        const word = data.fact.split(" ", 3);
        setFact(data.fact);
      })
      .catch((err) => {        
        setErrorMessage(err.message)
        setInterval(() => {
          setErrorMessage(null)
        }, 5000)
      })
  };

  useEffect(() => {
    getFact();
  }, []);

  const getGifCatUrl = (words) =>{
    setGifCatUrl(`${CAT_GIF_URL}${words}`);
  }

  useEffect(() => {
    const words = fact.split(" ", 3).join(" ");
    getGifCatUrl(words)
  }, [fact]);

  const generarCadenaRandom = () => {
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEF".split('')
    console.log("letters", letters[0])
    let word = ''
    for(let i = 0; i <= letters.length -10; i++){
      word = word + letters[Math.floor(Math.random() * 10) ]
    }
    return word
  }

  const onHandleChangeGif = () => {
    const nombre = generarCadenaRandom()
    console.log(nombre)
    getGifCatUrl(nombre)
  }  

  return (
    <div className="App">
      <h1>Gatelis</h1>
      {errorMessage !== null && <div className="error_message"><h2>{errorMessage}</h2></div>}
      <div className="fact_and_cat">
        <h2>{fact}</h2>
        {gifCatUrl !== null && <img src={`${gifCatUrl}`} alt="" />}
      </div>
      <div>
        <button onClick={onHandleChangeGif} >Cambiar gif</button>
      </div>
    </div>
  );
}

export default App;
