import React from 'react'
import Testimonial from './Testimonial';
import api from '@/_config/config';

export const dynamic = 'force-dynamic'
export const generateMetadata = async () => {
    try {
      const res = await api.post("/page_title_data/get_page_title_by_type",{
        type:"Client Testimonials"
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


const page = () => {
    return (
        <>
            <Testimonial />
        </>
    )
}

export default page