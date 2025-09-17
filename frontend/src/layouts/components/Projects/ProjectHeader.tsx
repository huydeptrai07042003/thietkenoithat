import React from 'react'
import { FcSearch } from "react-icons/fc";

const ProjectHeader:React.FC = () => {
  return (
    <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold pt-10 md:pt-20 text-center text-white italic">Các dự án nhà Kiến <span className='inline-flex text-center items-center'><FcSearch /></span></h1>
  )
}

export default ProjectHeader