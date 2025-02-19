import React from 'react'
import BlogName from './BlogName'
import api from '@/_config/config'


export const generateMetadata = async ({ params }) => {
   try {
      const blogname = (await params).blogname
      const res = await api.post("/blog/get_blog_by_slug", {
         slug: blogname
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
      <BlogName />
   )
}

export default page