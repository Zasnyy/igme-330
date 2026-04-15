import { useState, useEffect } from 'react'
import './App.css'

const wait = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const App = () => {
  const [theJoke, setJoke] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState('dadjoke');

  const requestNewJoke = () => {
    //setIsLoading(true);

    return wait(1000)
      .then(() => {
        return fetch('https://icanhazdadjoke.com/', {
          headers: {
            'Accept': 'application/json'
          }
        })
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        const { joke } = data;

        setIsLoading(false);
        setJoke(joke);
      })
  }

  useEffect(() => {
    requestNewJoke();
  }, [category]);
    
  return (
    <div className='app'>
      <h1>Dad Joke Generator</h1>
      <p className='subtitle'>React useEffect + fetch API</p>

      <div className='joke-box'>
        <p>{isLoading ? 'Loading joke...' : theJoke}</p>
      </div>

      <button>Get Another Joke</button>
    </div>
  )
}

export default App
