import React from 'react'

const Loader = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-screen flex justify-center items-center z-[99999] bg-white'>
        <video src="/loader.mp4" autoPlay muted></video>
    </div>
  )
}

export default Loader