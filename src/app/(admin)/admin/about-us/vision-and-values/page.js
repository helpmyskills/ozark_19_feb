"use client"

import { useState, useRef, useEffect } from "react";
import api from "@/_config/config";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false })
import { useForm } from "react-hook-form"


const page = () => {
    const editor1 = useRef(null);
    const editor2 = useRef(null);

    const [description1, setDescription1] = useState();
    const [description2, setDescription2] = useState();

    const [image1, setImage1] = useState();
    const [image2, setImage2] = useState();
    const [image3, setImage3] = useState();
    const [image4, setImage4] = useState();

    const [data, setData] = useState();

    const config = {
        height: 300,
        readonly: false
    };

    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm()

    const onSubmit = async (data) => {
        try {
            const formdata = new FormData();

            formdata.append("main_heading", data.main_heading);
            formdata.append("main_content", data.main_content);
            formdata.append("main_description", description2 ? description2 : "");
            formdata.append("subheading1", data.subheading1);
            formdata.append("content1", data.content1);
            formdata.append("subheading2", data.subheading2);
            formdata.append("content2", data.content2);
            formdata.append("subheading3", data.subheading3);
            formdata.append("description1", description1 ? description1 : "");
            formdata.append("image1", image1);
            formdata.append("image2", image2);
            formdata.append("image3", image3);
            formdata.append("image4", image4);
            formdata.append("title", data.title);
            formdata.append("keyword", data.keyword);
            formdata.append("meta_description", data.meta_description);
            formdata.append("id", data._id)

            const res = await api.post("/vision_and_value/update_vision_and_values", formdata);
            console.log(res.data);
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
        getData()
    }, [])


    useEffect(() => {
        if (data) {
            reset(data)
        }
    }, [data, reset])
    const getData = async () => {
        try {
            const res = await api.get("/vision_and_value/get_vision_value");
            if (res.data.status == 1) {
                setData(res.data.data);
                setDescription1(res.data.data.description1)
                setDescription2(res.data.data.main_description)
            }
            console.log(res.data);
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
                            vision & values
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <fieldset class="border rounded p-3 px-4 mb-4">
                                    <legend class="float-none w-auto px-3">
                                        Section
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
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Content 1
                                                </label>
                                                <textarea
                                                    {...register("content1")}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter the content"
                                                ></textarea>
                                            </div>
                                        </div>



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
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Content 2
                                                </label>
                                                <textarea
                                                    {...register("content2")}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter the content"
                                                ></textarea>
                                            </div>
                                        </div>



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


                                        <div className="col-md-12">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Description 1
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

                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image 1
                                                </label>
                                                <input
                                                    onChange={(e) => setImage1(e.target.files[0])}
                                                    type="file"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center">
                                            {
                                                image1 ? <img src={URL.createObjectURL(image1)} alt="" width={50} /> : <img src={data?.image1} alt="" width={70} />
                                            }
                                        </div>
                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image 2
                                                </label>
                                                <input
                                                    onChange={(e) => setImage2(e.target.files[0])}
                                                    type="file"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center">

                                            {
                                                image2 ? <img src={URL.createObjectURL(image2)} alt="" width={50} /> : <img src={data?.image2} alt="" width={70} />
                                            }
                                        </div>

                                    </div>
                                </fieldset>

                                <fieldset class="border rounded p-3 px-4 mb-4">
                                    <legend class="float-none w-auto px-3">
                                        Section
                                    </legend>
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Heading
                                                </label>
                                                <input
                                                    {...register("main_heading")}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter the heading"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Content
                                                </label>
                                                <textarea
                                                    {...register("main_content")}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter the content"
                                                ></textarea>
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Description
                                                </label>
                                                <JoditEditor
                                                    ref={editor2}
                                                    value={description2}
                                                    config={config}
                                                    tabIndex={1}
                                                    onBlur={(newContent) => setDescription2(newContent)}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image 1
                                                </label>
                                                <input
                                                    onChange={(e) => setImage3(e.target.files[0])}
                                                    type="file"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center">
                                                {
                                                    image3 ? <img src={URL.createObjectURL(image3)} alt="" width={50}/> : <img src={data?.image3} alt="" width={70}/>
                                                }
                                        </div>
                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image 2
                                                </label>
                                                <input
                                                    onChange={(e) => setImage4(e.target.files[0])}
                                                    type="file"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center">
                                                {
                                                    image4 ? <img src={URL.createObjectURL(image4)} alt="" width={50}/> : <img src={data?.image4} alt="" width={70}/>
                                                }
                                        </div>
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