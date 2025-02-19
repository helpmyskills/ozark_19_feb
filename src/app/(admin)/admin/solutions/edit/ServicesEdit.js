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
    const editor2 = useRef(null);

    const [description1, setDescription1] = useState("");
    const [description2, setDescription2] = useState("");

    const [image1, setImage1] = useState();
    const [image2, setImage2] = useState();
    const [solution_image, setSolutionImage] = useState();
    const [icon1, setIcon1] = useState();
    const [icon2, setIcon2] = useState();


    const config = {
        height: 300,
        readonly: false
    };

    const searchParams = useSearchParams();

    const router = useRouter();

    const [solutionData, setSolutionData] = useState();
    const id = searchParams.get("id");
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({})

    useEffect(() => {
        if (solutionData) {
            reset(solutionData);
        }
    }, [solutionData, reset]);


    console.log(solutionData);

    const onSubmit = async (data) => {
        try {
            const formdata = new FormData();
            formdata.append("solution_name", data.solution_name);
            formdata.append("solution_slug", data.solution_slug);
            formdata.append("heading", data.heading);
            formdata.append("content", data.content);
            formdata.append("solution_description", description1 ? description1 : "");
            formdata.append("sub_heading1", data.sub_heading1);
            formdata.append("content1", data.content1);
            formdata.append("sub_heading2", data.sub_heading2);
            formdata.append("content2", data.content2);
            formdata.append("why_choose_description", description2 ? description2 : "");
            formdata.append("image1", image1);
            formdata.append("image2", image2);
            formdata.append("solution_image", solution_image);
            formdata.append("icon1", icon1);
            formdata.append("icon2", icon2);
            formdata.append("title", data.title);
            formdata.append("keyword", data.keyword);
            formdata.append("meta_description", data.meta_description);
            formdata.append("id", id);

            const res = await api.post("/solution/update_solution", formdata);
            console.log(res.data);
            if (res.data.status == 1) {
                toast.success(res.data.message);
                router.push("/admin/solutions/view");
            } else {
                toast.error(res.data.message);
            }

        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        getSolutionData();
    }, [])

    const getSolutionData = async () => {
        try {
            const res = await api.post("/solution/get_solution_data", {
                id: id
            });
            if (res.data.status == 1) {
                setSolutionData(res.data.data)
                setDescription1(res.data.data.solution_description)
                setDescription2(res.data.data.why_choose_description)
            }
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className="app-main__inner">
            <div className="row">
                <div className="col-md-12 col-xl-12">
                    <div className="main-card mb-3 card">
                        <div className="card-header">
                            Update Solution
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <fieldset className="border rounded p-3 px-4 mb-4">
                                    <legend className="float-none w-auto px-3">
                                        Solution
                                    </legend>
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Solution Name
                                                </label>
                                                <input
                                                    {...register("solution_name")}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter the solution name"

                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Solution Slug
                                                </label>
                                                <input
                                                    {...register("solution_slug")}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter the solution slug"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Heading
                                                </label>
                                                <input
                                                    {...register("heading")}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter the solution heading"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Content
                                                </label>
                                                <textarea type="text"
                                                    {...register("content")}
                                                    className="form-control"
                                                    placeholder="Enter the content">
                                                </textarea>
                                            </div>
                                        </div>
                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Solution Image
                                                </label>
                                                <input
                                                    type="file"
                                                    onChange={(e) => setSolutionImage(e.target.files[0])}
                                                    className="form-control"
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {solution_image ? (
                                                <img src={URL.createObjectURL(solution_image)} alt="" width="100px" />
                                            ) : <img src={solutionData?.solution_image} alt="" width="100px" />
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

                                <fieldset className="border rounded p-3 px-4 mb-4">
                                    <legend className="float-none w-auto px-3">
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
                                                    {...register("sub_heading1")}
                                                    className="form-control"
                                                    placeholder="Enter the subheading"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Sub heading 2
                                                </label>
                                                <input
                                                    {...register("sub_heading2")}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter the subheading"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    content 1
                                                </label>
                                                <textarea
                                                    type="text"
                                                    {...register("content1")}
                                                    className="form-control"
                                                    placeholder="Enter the content"
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    content 2
                                                </label>
                                                <textarea
                                                    type="text"
                                                    {...register("content2")}
                                                    className="form-control"
                                                    placeholder="Enter the content"
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Icon 1
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
                                            ) : <img src={solutionData?.icon1} alt="" width="100px" />
                                            }

                                        </div>
                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Icon 2
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
                                                <img src={URL.createObjectURL(icon2)} alt="Uploaded Image" width="100px" />
                                            ) : <img src={solutionData?.icon2} alt="" width="100px" />}

                                        </div>
                                    </div>
                                </fieldset>

                                <fieldset className="border rounded p-3 px-4 mb-4">
                                    <legend className="float-none w-auto px-3">
                                        Why choose us
                                    </legend>
                                    <div className="form-row">
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
                                    </div>
                                </fieldset>

                                <fieldset className="border rounded p-3 px-4 mb-4">
                                    <legend className="float-none w-auto px-3">
                                        Images
                                    </legend>
                                    <div className="form-row">
                                        <div className="col-7 col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image1
                                                </label>
                                                <input
                                                    type="file"
                                                    onChange={(e) => setImage1(e.target.files[0])}
                                                    className="form-control"
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-6 d-flex align-items-center justify-content-center">
                                            {image1 ? (
                                                <img src={URL.createObjectURL(image1)} alt="preview" width="50px" />
                                            ) : <img src={solutionData?.image1} alt="" width="50px" />}

                                        </div>
                                        <div className="col-7 col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image2
                                                </label>
                                                <input
                                                    type="file"
                                                    onChange={(e) => setImage2(e.target.files[0])}
                                                    className="form-control"
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-6 d-flex align-items-center justify-content-center">
                                            {image2 ? (
                                                <img src={URL.createObjectURL(image2)} alt="preview" width="50px" />
                                            ) : <img src={solutionData?.image2} alt="" width="50px" />}

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