import React from 'react'
import img1 from '../../assets/heroImg/slider1.png'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className='lg:flex justify-center align-center py-40'>
      <div className="align-center w-[100%] lg:h-[50vh]">
        <div className="p-8 ">
          <p className='text-3xl  justify-start'>Wel-Come 📖</p>
          <h1 className='text-7xl py-4 text-[#fc575cdd] justify-start font-serif'>ECWA BookStore</h1>
          <p className='  justify-start'>Welcome to ECWA BookStore, your one-stop destination for all your reading needs. Our extensive collection features a wide variety of genres, from classic literature and contemporary fiction to educational textbooks and children's books. Whether you're an avid reader or a casual browser, we offer something for everyone. Explore our user-friendly website to discover new releases, bestsellers, and exclusive deals. At ECWA BookStore, we believe in the power of books to enlighten, entertain, and inspire. Start your literary journey with us today!</p>
          <div className="btn py-6">
            <button onClick={() => navigate('/books')} className=''>Explore More Books</button>
          </div>
        </div>
      </div>
      <div className="text-3xl align-center w-[100%] lg:h-[50vh]">
        <div className="p-8 ">
          <img className='rounded-full' src={img1} alt="main Images" />
        </div>
      </div>
    </div>
  )
}

export default Hero