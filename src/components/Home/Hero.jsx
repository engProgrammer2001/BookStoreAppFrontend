import React from 'react'
import img1 from '../../assets/heroImg/slider1.png'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className='lg:flex justify-center align-center py-40'>
      <div className="align-center w-[100%] lg:h-[50vh]">
        <div className="p-8 ">
          <p className='text-3xl text-[#fc575cdd] justify-start'>Wel-Come 📖</p>
          <h1 className='text-7xl py-4 text-[#fc575cdd] justify-start font-serif'>ECWA BookStore</h1>
          <p className=' text-[#fc575cdd] justify-start'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ipsum pariatur perspiciatis, laudantium similique, reprehenderit deserunt, nobis ex nesciunt ab dolorem quaerat dolores quae aliquid repellendus ad perferendis rerum quas asperiores ipsam?</p>
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