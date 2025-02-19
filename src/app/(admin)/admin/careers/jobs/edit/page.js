import React from 'react'
import dynamic from 'next/dynamic'

const JobEdit = dynamic(()=>import("./JobEdit"),{ssr:false})

const page = () => {
  return (
    <>
      <JobEdit/>
    </>
  )
}

export default page