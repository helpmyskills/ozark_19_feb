import api from '@/_config/config';
import React from 'react'
import SCR from './SCR';

export const dynamic = 'force-dynamic'

export const generateMetadata = async () => {
    try {
        const res = await api.get("/social_responsibility/get_social_responsibility");
        const data = res.data.data;
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
        <SCR />
    )
}

export default page