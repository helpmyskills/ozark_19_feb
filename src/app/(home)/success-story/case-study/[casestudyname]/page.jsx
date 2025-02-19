import React from 'react'
import CaseStudyDetail from './CaseStudyDetail'
import api from '@/_config/config'


export const generateMetadata = async ({ params }) => {
   try {
      const casestudyname = (await params).casestudyname
      const res = await api.post("/case_study/get_case_study_by_slug", {
         slug: casestudyname
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
         <CaseStudyDetail />
      </>
   )
}

export default page