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
    const editor3 = useRef(null);

    const [description1, setDescription1] = useState();
    const [description2, setDescription2] = useState();
    const [description3, setDescription3] = useState();

    const [benefitsImage, setBenefitsImage] = useState();
    const [adviceImage, setAdviceImage] = useState();
    const [auditImage, setAuditImage] = useState();

    const [data, setData] = useState();

    const config = {
        height: 300,
        readonly: false
    };


    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm()

    const onSubmit = async (data) => {
        try {
            const formdata = new FormData();

            formdata.append("benefits_heading", data.benefits_heading);
            formdata.append("advice_heading", data.advice_heading);
            formdata.append("audit_heading", data.audit_heading);

            formdata.append("benefits_description", description1 ? description1 : "");
            formdata.append("advice_description", description2 ? description2 : "");
            formdata.append("audit_description", description3 ? description3 : "");


            formdata.append("benefits_image", benefitsImage ? benefitsImage : null);
            formdata.append("advice_image", adviceImage ? adviceImage : null);
            formdata.append("audit_image", auditImage ? auditImage : null);

            formdata.append("title", data.title);
            formdata.append("keyword", data.keyword);
            formdata.append("meta_description", data.meta_description);
            formdata.append("id", data._id)

            const res = await api.post("/our_expertise/update_our_expertise", formdata);
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
            const res = await api.get("/our_expertise/get_our_expertise");
            console.log(res.data);
            setData(res.data.data);
            setDescription1(res.data.data?.benefits_description);
            setDescription2(res.data.data?.advice_description);
            setDescription3(res.data.data?.audit_description);

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
                            Our expertise PAGE
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
                                                    Heading 1
                                                </label>
                                                <input
                                                    {...register("benefits_heading")}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter the heading"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image 1
                                                </label>
                                                <input
                                                    type="file"
                                                    onChange={(e) => setBenefitsImage(e.target.files[0])}
                                                    className="form-control"
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {benefitsImage ? (
                                                <img src={URL.createObjectURL(benefitsImage)} alt="" width="100px" />
                                            ) : <img src={data?.benefits_image} alt="" width="100px" />}

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


                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Heading 2
                                                </label>
                                                <input
                                                    {...register("advice_heading")}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter the heading"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image 2
                                                </label>
                                                <input
                                                    type="file"
                                                    onChange={(e) => setAdviceImage(e.target.files[0])}
                                                    className="form-control"
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {adviceImage ? (
                                                <img src={URL.createObjectURL(adviceImage)} alt="" width="100px" />
                                            ) : <img src={data?.advice_image} alt="" width="100px" />}

                                        </div>
                                        <div className="col-md-12">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Description 2
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


                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Heading 3
                                                </label>
                                                <input
                                                    {...register("audit_heading")}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter the heading"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image 3
                                                </label>
                                                <input
                                                    type="file"
                                                    onChange={(e) => setAuditImage(e.target.files[0])}
                                                    className="form-control"
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {auditImage ? (
                                                <img src={URL.createObjectURL(auditImage)} alt="" width="100px" />
                                            ) : <img src={data?.audit_image} alt="" width="100px" />}

                                        </div>
                                        <div className="col-md-12">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Description 3
                                                </label>
                                                <JoditEditor
                                                    ref={editor3}
                                                    value={description3}
                                                    config={config}
                                                    tabIndex={1}
                                                    onBlur={(newContent) => setDescription3(newContent)}
                                                />
                                            </div>
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
        </div >
    )
}

export default page