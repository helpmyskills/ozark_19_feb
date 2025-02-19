import React from 'react'
import dynamic from 'next/dynamic'

const CaseStudy = dynamic(() => import("./CaseStudy"), { ssr: false });
const page = () => {
    return (
        <CaseStudy/>
    )
}

export default page