
import api from '@/_config/config';
import VisionAndValue from './VisionAndValue';


export const dynamic = 'force-dynamic'

export const generateMetadata = async () => {
    try {
        const res = await api.get("/vision_and_value/get_vision_value");
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

export default async function page() {

    return (
        <VisionAndValue/>
    )
}
