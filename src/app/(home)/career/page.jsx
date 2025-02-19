import React from 'react'
import Career from './Career'
import api from '@/_config/config';

export const dynamic = 'force-dynamic'

export const generateMetadata = async () => {
  try {
    const res = await api.get("/career/get_career_page");
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

function page() {
  return (
    <Career/>
  )
}

export default page