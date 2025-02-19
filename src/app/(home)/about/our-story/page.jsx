import React from 'react'
import OurStory from './OurStory';
import api from '@/_config/config';

export const dynamic = 'force-dynamic'

export const generateMetadata = async () => {
    try {
        const res = await api.get("/ourstory/get_story_data");
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

async function Story() {
    return (
        <>
            <OurStory />
        </>
    )
}

export default Story