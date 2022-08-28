import React, { useState } from 'react'
import HeroSection from '../components/HeroSection'
import InputSection from '../components/InputSection'
import Navbar from '../components/Navbar'
import OutputSection from '../components/OutputSection'

function Home() {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }


  return (
    <>
        <Navbar toggle={toggle}/>
        <HeroSection />
        <InputSection />
        <OutputSection />
    </>
  )
}

export default Home