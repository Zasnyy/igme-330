import { useEffect, useState } from 'react'
import './App.css'

type NumberBox = {
  value: number;
}

const wait = (ms: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  })
};

const App = () => {
  console.log('App rendered');

  const [theJoke, setJoke] = useState<string | null>(
    localStorage.getItem('igme-330-jokes_latest-joke')
  );
  const [isLoading, setIsLoading] = useState(false);
  const [numTimesPressed, setNumTimesPressed] = useState<NumberBox>({
    value: 0
  });

  const requestNewJoke = () => {
    setIsLoading(true);

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
        const {joke} = data;
        
        setIsLoading(false);
        setJoke(joke);

        localStorage.setItem('igme-330-jokes_latest-joke', joke);
      })
  }

  useEffect(() => {
    if (theJoke === null) {
      requestNewJoke();
    }
  }, []);

  useEffect(() => {
    console.log('component did mount');
  }, []);

  useEffect(() => {
    console.log('Component rendered');
  });

  return (
    <div className='app'>
      <h1>Dad Joke Generator</h1>
      <p className='subtitle'>React useEffect + fetch API</p>

      <div className='joke-box'>
        <p>{isLoading ? 'Loading joke...' : theJoke}</p>
      </div>

      <button disabled={isLoading} onClick={() => {
        const newContainer = {
          value: numTimesPressed.value + 1
        }

        setNumTimesPressed(newContainer);
        requestNewJoke();
      }}>Get {numTimesPressed.value + 1} Joke</button>
    </div>
  )
}

export default App
