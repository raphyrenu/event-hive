import React from 'react'
import Header from './components/Header'
import HelloSection from './components/HelloSection'
import Footer from './components/Footer'


function page() {
  return (
    <div className='h-screen flex flex-col bg-background'>
          <Header />
          <HelloSection />
          <Footer/>
    </div>
  )
}

export default page
