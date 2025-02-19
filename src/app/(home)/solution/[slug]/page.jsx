import React from 'react'
import Service from './Service'
import api from '@/_config/config'


export const generateMetadata = async ({ params }) => {
  try {
     const slug = (await params).slug
     const res = await api.post("/solution/get_solution_by_slug", {
      solution_slug: slug
     });
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
    <Service />
  )
}

export default page