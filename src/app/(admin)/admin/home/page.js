"use client"

import { useState, useRef, useEffect } from "react";
import api from "@/_config/config";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false })
import { useForm } from "react-hook-form"


const page = () => {
    const editor1 = useRef(null);

    const [description1, setDescription1] = useState();

    const [image, setImage] = useState();
    const [icon1, setIcon1] = useState();
    const [icon2, setIcon2] = useState();
    const [icon3, setIcon3] = useState();
    const [icon4, setIcon4] = useState();


    const [data, setData] = useState();

    const config = {
        height: 300,
        readonly: false
    };


    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm()

    const onSubmit = async (data) => {
        try {
            const formdata = new FormData();

            formdata.append("heading", data.heading);
            formdata.append("image", image);
            formdata.append("description", description1 ? description1 : "");
            formdata.append("mission_content", data.mission_content);
            formdata.append("vision_content", data.vision_content);
            formdata.append("values_content", data.values_content);
            formdata.append("subheading1", data.subheading1);
            formdata.append("content1", data.content1);
            formdata.append("subheading2", data.subheading2);
            formdata.append("content2", data.content2);
            formdata.append("subheading3", data.subheading3);
            formdata.append("content3", data.content3);
            formdata.append("subheading4", data.subheading4);
            formdata.append("content4", data.content4);
            formdata.append("icon1", icon1);
            formdata.append("icon2", icon2);
            formdata.append("icon3", icon3);
            formdata.append("icon4", icon4);
            formdata.append("title", data.title);
            formdata.append("keyword", data.keyword);
            formdata.append("meta_description", data.meta_description);
            formdata.append("id", data._id)

            const res = await api.post("/home/update_home_page_data", formdata);
            if (res.data.status == 1) {
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        if (data) {
            reset(data);
        }
    }, [data, reset])

    const getData = async () => {
        try {
            const res = await api.get("/home/get_home_page_data");
            setData(res.data.data);
            setDescription1(res.data.data.description);
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
                            HOME PAGE
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <fieldset class="border rounded p-3 px-4 mb-4">
                                    <legend class="float-none w-auto px-3">
                                        Why choose us
                                    </legend>
                                    <div className="form-row">


                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Heading
                                                </label>
                                                <input
                                                    {...register("heading")}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter the heading"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image
                                                </label>
                                                <input
                                                    type="file"
                                                    onChange={(e) => setImage(e.target.files[0])}
                                                    className="form-control"
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {image ? (
                                                <img src={URL.createObjectURL(image)} alt="" width="100px"/>
                                            ) : <img src={data?.image} alt="" width="100px" />}

                                        </div>

                                        <div className="col-md-12">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Description
                                                </label>
                                                <JoditEditor
                                                    ref={editor1}
                                                    value={description1}
                                                    config={config}
                                                    tabIndex={1}
                                                    onBlur={(newContent) => setDescription1(newContent)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Vision content
                                                </label>
                                                <textarea type="text"
                                                    {...register("vision_content")}
                                                    className="form-control"
                                                    placeholder="Enter the content">
                                                </textarea>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Mission content
                                                </label>
                                                <textarea type="text"
                                                    {...register("mission_content")}
                                                    className="form-control"
                                                    placeholder="Enter the content">
                                                </textarea>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Values content
                                                </label>
                                                <textarea type="text"
                                                    {...register("values_content")}
                                                    className="form-control"
                                                    placeholder="Enter the content">
                                                </textarea>
                                            </div>
                                        </div>



                                    </div>
                                </fieldset>

                                <fieldset class="border rounded p-3 px-4 mb-4">
                                    <legend class="float-none w-auto px-3">
                                        Our expertise
                                    </legend>
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Subheading 1
                                                </label>
                                                <input
                                                    {...register("subheading1")}
                                                    type="text"
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
                                                    onChange={(e) => setIcon1(e.target.files[0])}
                                                    className="form-control"
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {icon1 ? (
                                                <img src={URL.createObjectURL(icon1)} alt="" width="100px" />
                                            ) : <img src={data?.icon1} alt="" width="100px" />}

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
                                                    Subheading 2
                                                </label>
                                                <input
                                                    {...register("subheading2")}
                                                    type="text"
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
                                                    onChange={(e) => setIcon2(e.target.files[0])}
                                                    className="form-control"
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {icon2 ? (
                                                <img src={URL.createObjectURL(icon2)} alt="" width="100px" />
                                            ) : <img src={data?.icon2} alt="" width="100px" />}

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
                                                    Subheading 3
                                                </label>
                                                <input
                                                    {...register("subheading3")}
                                                    type="text"
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
                                                    onChange={(e) => setIcon3(e.target.files[0])}
                                                    className="form-control"
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {icon3 ? (
                                                <img src={URL.createObjectURL(icon3)} alt="" width="100px" />
                                            ) : <img src={data?.icon3} alt="" width="100px" />}

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
                                                    Subheading 4
                                                </label>
                                                <input
                                                    {...register("subheading4")}
                                                    type="text"
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
                                                    onChange={(e) => setIcon4(e.target.files[0])}
                                                    className="form-control"
                                                    accept="image/*"
                                                   
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {icon4 ? (
                                                <img src={URL.createObjectURL(icon4)} alt="" width="100px" />
                                            ) : <img src={data?.icon4} alt="" width="100px" />}

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
        </div >
    )
}

export default page