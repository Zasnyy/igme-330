import { useEffect, useState } from 'react'
import './App.css'

type JokeObject = {
  value: number;
}

const STORAGE_KEY = 'igme-330-jokes_latest-joke';

const wait = (ms: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  })
};

const App = () => {
  console.log('App rendered');

  const [theJoke, setJoke] = useState<string | null>(
    localStorage.getItem(STORAGE_KEY)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [numTimesPressed, setNumTimesPressed] = useState<JokeObject>({
    value: 0
  });

  const requestNewJoke = async () => {
    setIsLoading(true);
    await wait(1000);
    const response = await fetch('https://icanhazdadjoke.com/', {
      headers: {
        'Accept': 'application/json'
      }
    });
    const data = await response.json();
    const { joke } = data;

    setJoke(joke);
    localStorage.setItem(STORAGE_KEY, joke);
    setIsLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (theJoke === null) requestNewJoke();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('component did mount');
  }, []);

  useEffect(() => {
    console.log('Component rendered');
  });

  const handleClick = () => {
    setNumTimesPressed({ value: numTimesPressed.value + 1 });
    requestNewJoke();
  };

  return (
    <div className='app'>
      <h1>Dad Joke Generator</h1>
      <p className='subtitle'>React useEffect + fetch API</p>

      <div className='joke-box'>
        <p>{isLoading ? 'Loading joke...' : theJoke}</p>
      </div>

      <button disabled={isLoading} onClick={handleClick}>Get {numTimesPressed.value + 1} Joke</button>
    </div>
  )
}

export default App
