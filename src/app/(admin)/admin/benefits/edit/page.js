import React from 'react'
import dynamic from 'next/dynamic'

const BenefitEdit = dynamic(()=>import("./BenefitEdit"),{ssr:false})

const page = () => {
  return (
    <>
      <BenefitEdit/>
    </>
  )
}

export default page