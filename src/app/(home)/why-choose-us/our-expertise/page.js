import React from 'react'
import OurExpertise from './OurExpertise'
import api from '@/_config/config';

export const dynamic = 'force-dynamic'

export const generateMetadata = async () => {
  try {
      const res = await api.get("/our_expertise/get_our_expertise");
      const data = res.data.data
      return {
          title: data?.title,
          keywords: data?.keyword,
          description: data?.meta_description
      }
  } catch (err) {
      console.log(err);
  }
}

const page = () => {
  return (
    <>
      <OurExpertise/>
    </>
  )
}

export default page