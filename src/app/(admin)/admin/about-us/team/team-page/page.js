"use client"

import { useState, useRef, useEffect } from "react";
import api from "@/_config/config";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false })
import { useForm } from "react-hook-form"


const page = () => {
   

    const [image, setImage] = useState();
    // const [image2, setImage2] = useState();

    const [icon1, setIcon1] = useState();
    const [icon2, setIcon2] = useState();
    const [icon3, setIcon3] = useState();
    const [icon4, setIcon4] = useState();

    const [teamPageData, setTeamPageData] = useState();


    const config = {
        height: 300,
        readonly: false
    };

    const router = useRouter();
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm()

    const onSubmit = async (data) => {
        try {
            const formdata = new FormData();


            formdata.append("subheading1", data.subheading1);
            formdata.append("content1", data.content1);
            formdata.append("subheading2", data.subheading2);
            formdata.append("content2", data.content2);
            formdata.append("subheading3", data.subheading3);
            formdata.append("content3", data.content3);
            formdata.append("subheading4", data.subheading4);
            formdata.append("content4", data.content4);
            formdata.append("image", image);
            // formdata.append("image2", image2);
            formdata.append("icon1", icon1);
            formdata.append("icon2", icon2);
            formdata.append("icon3", icon3);
            formdata.append("icon4", icon4);
            formdata.append("title", data.title);
            formdata.append("keyword", data.keyword);
            formdata.append("meta_description", data.meta_description);
            formdata.append("id", data._id)

            // console.log(res.data);
            const res = await api.post("/leadership_team/update_leadership_page", formdata);
            if (res.data.status == 1) {
                toast.success(res.data.message);

            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }





    useEffect(() => {
        getTeamPageData();
    }, [])

    useEffect(() => {
        if (teamPageData) {
            reset(teamPageData);
        }
    }, [teamPageData, reset])

    const getTeamPageData = async () => {
        try {
            const res = await api.get("/leadership_team/get_leadership_page_data");
            console.log(res.data);
            setTeamPageData(res.data.data);
        } catch (err) {
            console.log(err);
        }
    }



    return (
        <div className="app-main__inner">
            <div className="row">
                <div className="col-md-12 col-xl-12">
                    <div className="main-card mb-3 card">
                        <div className="card-header">
                            LEADERSHIP TEAM PAGE
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>

                                {/* <fieldset class="border rounded p-3 px-4 mb-4">
                                    <legend class="float-none w-auto px-3">
                                        Images
                                    </legend>
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image
                                                </label>
                                                <input
                                                    type="file"
                                                    onChange={(e) => setImage(e.target.files[0])}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6 d-flex align-items-center justify-content-center">
                                            {image ? (
                                                <img src={URL.createObjectURL(image)} alt="" width="100px" />
                                            ) : <img src={teamPageData?.image} alt="" width="100px" />}
                                        </div>

                                    </div>
                                </fieldset> */}

                                <fieldset class="border rounded p-3 px-4 mb-4">
                                    <legend class="float-none w-auto px-3">
                                        Section
                                    </legend>
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Sub heading 1
                                                </label>
                                                <input
                                                    type="text"
                                                    {...register("subheading1")}
                                                    className="form-control"
                                                    placeholder="Enter the subheading"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Icon1
                                                </label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    onChange={(e) => setIcon1(e.target.files[0])}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {icon1 ? (
                                                <img src={URL.createObjectURL(icon1)} alt="" width="50px" />
                                            ) : <img src={teamPageData?.icon1} alt="" width="50px" />}

                                        </div>

                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Content 1
                                                </label>
                                                <textarea type="text"
                                                    {...register("content1")}
                                                    className="form-control"
                                                    placeholder="Enter the content">
                                                </textarea>
                                            </div>
                                        </div>

                                        <div className="col-md-6"></div>

                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Sub heading 2
                                                </label>
                                                <input
                                                    type="text"
                                                    {...register("subheading2")}
                                                    className="form-control"
                                                    placeholder="Enter the subheading"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Icon2
                                                </label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    onChange={(e) => setIcon2(e.target.files[0])}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {icon2 ? (
                                                <img src={URL.createObjectURL(icon2)} alt="" width="50px" />
                                            ) : <img src={teamPageData?.icon2} alt="" width="50px" />}

                                        </div>

                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Content 2
                                                </label>
                                                <textarea type="text"
                                                    {...register("content2")}
                                                    className="form-control"
                                                    placeholder="Enter the content">
                                                </textarea>
                                            </div>
                                        </div>

                                        <div className="col-md-6"></div>

                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Sub heading 3
                                                </label>
                                                <input
                                                    type="text"
                                                    {...register("subheading3")}
                                                    className="form-control"
                                                    placeholder="Enter the subheading"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Icon3
                                                </label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    onChange={(e) => setIcon3(e.target.files[0])}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {icon3 ? (
                                                <img src={URL.createObjectURL(icon3)} alt="" width="50px" />
                                            ) : <img src={teamPageData?.icon3} alt="" width="50px" />}

                                        </div>

                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Content 3
                                                </label>
                                                <textarea type="text"
                                                    {...register("content3")}
                                                    className="form-control"
                                                    placeholder="Enter the content">
                                                </textarea>
                                            </div>
                                        </div>

                                        <div className="col-md-6"></div>

                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Sub heading 4
                                                </label>
                                                <input
                                                    type="text"
                                                    {...register("subheading4")}
                                                    className="form-control"
                                                    placeholder="Enter the subheading"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Icon4
                                                </label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    onChange={(e) => setIcon4(e.target.files[0])}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {icon4 ? (
                                                <img src={URL.createObjectURL(icon4)} alt="" width="50px" />
                                            ) : <img src={teamPageData?.icon4} alt="" width="50px" />}

                                        </div>

                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Content 4
                                                </label>
                                                <textarea type="text"
                                                    {...register("content4")}
                                                    className="form-control"
                                                    placeholder="Enter the content">
                                                </textarea>
                                            </div>
                                        </div>

                                        <div className="col-md-6"></div>

                                    </div>
                                </fieldset>

                                <fieldset class="border rounded p-3 px-4 mb-4">
                                    <legend class="float-none w-auto px-3">
                                        SEO section
                                    </legend>
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Title
                                                </label>
                                                <input
                                                    {...register("title")}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter the title"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Keyword
                                                </label>
                                                <textarea
                                                    {...register("keyword")}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter the keyword"
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Description
                                                </label>
                                                <textarea
                                                    {...register("meta_description")}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter the keyword"
                                                ></textarea>
                                            </div>
                                        </div>

                                    </div>
                                </fieldset>

                                <button className="mt-2 px-3 btn btn-primary" onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>{isSubmitting ? "Updating..." : "Update"}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page