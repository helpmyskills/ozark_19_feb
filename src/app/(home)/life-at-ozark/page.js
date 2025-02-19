import api from '@/_config/config';
import React from 'react'
import LifeAtOzark from './LifeAtOzark';

export const dynamic = 'force-dynamic'

export const generateMetadata = async () => {
    try {
        const res = await api.get("/life/get_life_ozark_data");
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
        <LifeAtOzark/>
    )
}

export default page