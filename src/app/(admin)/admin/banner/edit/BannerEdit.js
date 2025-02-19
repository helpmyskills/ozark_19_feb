
"use client"
import { useState, useEffect } from "react";
import api from "@/_config/config";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";


export default function page() {
    const [inputData, setInputData] = useState({});
    const [imageData, setImageData] = useState();
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    useEffect(() => {
        getBannerData();
    }, [])

    const getBannerData = async () => {
        try {
            const res = await api.post(`/banner/get_banner_data`, { id: id });
            if (res.data.status == 1) {
                setInputData(res.data.data);
            }

        } catch (err) {
            console.log(err);
        }
    }

    console.log(imageData);
    console.log(inputData);


    const handleInputData = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputData({ ...inputData, [name]: value });
    }

    const handleImageData = (e) => {
        setImageData(e.target.files[0]);
    }


    const handleUpdateBanner = async (e) => {
        try {
            e.preventDefault();
            const formdata = new FormData();
            formdata.append("heading", inputData.heading);
            formdata.append("title", inputData.title);
            formdata.append("content", inputData.content);
            formdata.append("image", imageData);
            formdata.append("id", id);
            const res = await api.post(`/banner/update_banner`, formdata)
            if (res.data.status === 1) {
                toast.success(res.data.message);
                router.push("/admin/banner/view")
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className="app-main__inner">
                <div className="row">
                    <div className="col-md-12 col-xl-12">
                        <div className="main-card mb-3 card">
                            <div className="card-header">
                                Update Banner
                            </div>

                            <div className="card-body">
                                <form >
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Heading
                                                </label>
                                                <input
                                                    onChange={handleInputData}
                                                    name="heading"
                                                    placeholder="Enter the heading"
                                                    type="text"
                                                    className="form-control"
                                                    value={inputData?.heading}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Title
                                                </label>
                                                <input
                                                    onChange={handleInputData}
                                                    name="title"
                                                    type="text"
                                                    placeholder="Enter the title"
                                                    className="form-control"
                                                    value={inputData?.title}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Content
                                                </label>
                                                <textarea name="content" id="" className="form-control" placeholder="Content" onChange={handleInputData} value={inputData?.content}></textarea>
                                            </div>
                                        </div>
                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image
                                                </label>
                                                <input
                                                    onChange={handleImageData}
                                                    name="image"
                                                    placeholder="Enter the short description"
                                                    type="file"
                                                    accept="image/*"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center">
                                            {
                                                imageData ? <img src={URL.createObjectURL(imageData)} alt="" width={100} /> : <img src={inputData?.image} alt="" width={100} />
                                            }
                                        </div>

                                    </div>
                                    <button className="mt-2 px-3 btn btn-primary" onClick={handleUpdateBanner}>Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
