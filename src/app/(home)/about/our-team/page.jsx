

import api from '@/_config/config';
import React from 'react'
import OurTeam from './OurTeam';

export const dynamic = 'force-dynamic'


export const generateMetadata = async () => {
    try {
        const res = await api.get("/leadership_team/get_leadership_page_data");
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

async function page() {

    return (
        <>
            <OurTeam />
        </>
    )
}

export default page