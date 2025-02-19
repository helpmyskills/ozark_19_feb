"use client"

import { useState, useRef, useEffect } from "react";
import api from "@/_config/config";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false })
import { useForm } from "react-hook-form"


const page = () => {
    const editor1 = useRef(null);
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [description1, setDescription1] = useState();

    const [main_image, setMainImage] = useState();
    const [soltionList, setSolutionList] = useState();
    const [data, setData] = useState();

    const config = {
        height: 300,
        readonly: false
    };

    const router = useRouter();
    const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm()

    const onSubmit = async (data) => {
        try {
            const formdata = new FormData();
            formdata.append("solution_id", data.solution_id);
            formdata.append("heading", data.heading);
            formdata.append("slug", data.slug);
            formdata.append("description", description1 ? description1 : "");
            formdata.append("image", main_image);
            formdata.append("title", data.title);
            formdata.append("keyword", data.keyword);
            formdata.append("meta_description", data.meta_description);
            formdata.append("id", id);

            const res = await api.post("/case_study/update_case_study", formdata);
           
            if (res.data.status == 1) {
                toast.success(res.data.message);
                router.push("/admin/case-study/view");
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getSolutionList();
        getData();
    }, []);

    useEffect(() => {
        if (data) {
            reset(data);
        }
    }, [data])

    const getSolutionList = async (req, res) => {
        try {
            const res = await api.get("/solution/get_solution_list");
            if (res.data.status == 1) {
                setSolutionList(res.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    }
    const getData = async (req, res) => {
        try {
            const res = await api.post("/case_study/get_case_study_data", {
                id: id
            });
           console.log(res.data);
            if (res.data.status == 1) {
                setData(res.data.data);
                setDescription1(res.data.data.description);
            }
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
                            Update Case study
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
                                                    Solution Name
                                                </label>
                                                <select {...register("solution_id", { required: { value: true, message: "Please provide the solution name" } })}
                                                    className="form-control"
                                                >

                                                    <option hidden defaultChecked value={""}>Select solution</option>
                                                    {
                                                        soltionList?.map((ele) =>
                                                            <option value={ele._id}>{ele.solution_name}</option>
                                                        )
                                                    }
                                                </select>
                                                {errors.solution_id ? <p style={{ color: "red" }}>{errors.solution_id.message}</p> : null}

                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Slug
                                                </label>
                                                <input
                                                    {...register("slug", {
                                                        required: {
                                                            value: true,
                                                            message: "Please provide the casestudy slug"
                                                        }
                                                    })}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter the casestudy slug"
                                                />
                                                {errors.slug ? <p style={{ color: "red" }}>{errors.slug.message}</p> : null}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Heading
                                                </label>
                                                <input
                                                    {...register("heading", {
                                                        required: {
                                                            value: true,
                                                            message: "Please provide the casestudy heading"
                                                        }
                                                    })}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter the casestudy heading"
                                                />
                                                {errors.heading ? <p style={{ color: "red" }}>{errors.heading.message}</p> : null}
                                            </div>
                                        </div>


                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Main Image
                                                </label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    onChange={(e) => setMainImage(e.target.files[0])}
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center">
                                            {
                                                main_image ?
                                                    <img src={URL.createObjectURL(main_image)} alt="" width={100} /> : <img src={data?.image} alt="" width={100}/>

                                            }
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