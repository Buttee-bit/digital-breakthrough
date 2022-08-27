import React, { useState } from 'react'
import HeroSection from '../components/HeroSection'
import InfoSection from '../components/InfoSection'
import { homeObjOne } from '../components/InfoSection/Data'
import InputSection from '../components/InputSection'
import Navbar from '../components/Navbar'

const Home = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
        <Navbar toggle={toggle}/>
        <HeroSection />
        <InputSection />
        <InfoSection {...homeObjOne} />
    </>
  )
}

export default Home