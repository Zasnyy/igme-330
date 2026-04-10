import { useState } from 'react'

import './App.css'

type CardProps = {
  heading: string;
  description: string;
  isActive: boolean;
}

const Card = (props: CardProps) => {
  const {heading, description, isActive} = props;

  return (
    <div>
      <h3>{heading} {isActive ? '🤢' : '🥵'}</h3>
      <p>{description}</p>
    </div>
  )
}

function App() {
  console.log('App rendered');
  const [isActive, setIsActive] = useState(false);

  const toggleIsActive = () => {
    setIsActive(!isActive);
  }

  return (
    <>
      <Card heading="IGME-330" 
            description="A class for cool people"
            isActive={isActive} />
      <button onClick={toggleIsActive}>Toggle is active</button>
    </>
  )
}

export default App
