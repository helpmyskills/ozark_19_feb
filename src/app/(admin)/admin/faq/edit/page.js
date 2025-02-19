import React from 'react'
import dynamic from 'next/dynamic'

const FaqEdit = dynamic(()=>import("./FaqEdit"),{ssr:false})

const page = () => {
  return (
    <>
      <FaqEdit/>
    </>
  )
}

export default page