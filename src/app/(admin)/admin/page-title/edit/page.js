import React from 'react'
import dynamic from 'next/dynamic'

const PageTitleEdit = dynamic(() => import("./PageTitleEdit"), { ssr: false });
const page = () => {
    return (
        <PageTitleEdit/>
    )
}

export default page