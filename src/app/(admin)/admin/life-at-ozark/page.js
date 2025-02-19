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
    const editor2 = useRef(null);

    const [description1, setDescription1] = useState();
    const [description2, setDescription2] = useState();

    // const [breadcrumb_image, setBreadCrumbImage] = useState();
    const [image1, setImage1] = useState();
    const [image2, setImage2] = useState();
    const [image3, setImage3] = useState();
    const [image4, setImage4] = useState();
    const [image5, setImage5] = useState();
    const [image6, setImage6] = useState();
    const [image7, setImage7] = useState();
    const [image8, setImage8] = useState();
    const [image9, setImage9] = useState();
    const [image10, setImage10] = useState();
    const [image11, setImage11] = useState();
    const [image12, setImage12] = useState();
    const [image13, setImage13] = useState();


    const [data, setData] = useState();


    const config = {
        height: 300,
        readonly: false
    };


    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm()

    const onSubmit = async (data) => {
        try {
            const formdata = new FormData();
            formdata.append("description1", description1 ? description1 : "");
            formdata.append("description2", description2 ? description2 : "");
            formdata.append("subheading1", data.subheading1);
            formdata.append("content1", data.content1);
            formdata.append("subheading2", data.subheading2);
            formdata.append("content2", data.content2);
            formdata.append("subheading3", data.subheading3);
            formdata.append("content3", data.content3);
            formdata.append("image1", image1);
            formdata.append("image2", image2);
            formdata.append("image3", image3);
            formdata.append("image4", image4);
            formdata.append("image5", image5);
            formdata.append("image6", image6);
            formdata.append("image7", image7);
            formdata.append("image8", image8);
            formdata.append("image9", image9);
            formdata.append("image10", image10);
            formdata.append("image11", image11);
            formdata.append("image12", image12);
            formdata.append("image13", image13);
            // formdata.append("breadcrumb_image", breadcrumb_image);

            formdata.append("title", data.title);
            formdata.append("keyword", data.keyword);
            formdata.append("meta_description", data.meta_description);
            formdata.append("id", data._id)


            const res = await api.post("/life/update_life_ozark", formdata);
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
        getData();
    }, [])

    useEffect(() => {
        if (data) {
            reset(data);
        }
    }, [data, reset])

    const getData = async () => {
        try {
            const res = await api.get("/life/get_life_ozark_data");
            console.log(res.data);
            setData(res.data.data);
            setDescription1(res.data.data.description1);
            setDescription2(res.data.data.description2);
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
                            Life @ Ozark
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>

                                {/* <fieldset class="border rounded p-3 px-4 mb-4">
                                    <legend class="float-none w-auto px-3">
                                        Image
                                    </legend>
                                    <div className="form-row">
                                        <div className="col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Bread crumb image
                                                </label>
                                                <input
                                                    type="file"
                                                    name="breadcrumb_image"
                                                    className="form-control"
                                                    onChange={(e) => setBreadCrumbImage(e.target.files[0])}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-2 d-flex align-items-center justify-content-center">
                                            {breadcrumb_image ? (
                                                <img src={URL.createObjectURL(breadcrumb_image)} alt="" width="100px" />
                                            ) : <img src={data?.breadcrumb_image} alt="" width="100px" />}
                                        </div>

                                        <div className="col-md-6"></div>
                                    </div>
                                </fieldset> */}

                                <fieldset class="border rounded p-3 px-4 mb-4">
                                    <legend class="float-none w-auto px-3">
                                        Section
                                    </legend>
                                    <div className="form-row">

                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image 1
                                                </label>
                                                <input
                                                    type="file"
                                                    name="image1"
                                                    className="form-control"
                                                    onChange={(e) => setImage1(e.target.files[0])}
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {image1 ? (
                                                <img src={URL.createObjectURL(image1)} alt="" width="100px" />
                                            ) : <img src={data?.image1} alt="" width="100px" />}
                                        </div>


                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image 2
                                                </label>
                                                <input
                                                    type="file"
                                                    name="image2"
                                                    className="form-control"
                                                    onChange={(e) => setImage2(e.target.files[0])}
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {image2 ? (
                                                <img src={URL.createObjectURL(image2)} alt="" width="100px" />
                                            ) : <img src={data?.image2} alt="" width="100px" />}
                                        </div>


                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image 3
                                                </label>
                                                <input
                                                    type="file"
                                                    name="image3"
                                                    className="form-control"
                                                    onChange={(e) => setImage3(e.target.files[0])}
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {image3 ? (
                                                <img src={URL.createObjectURL(image3)} alt="" width="100px" />
                                            ) : <img src={data?.image3} alt="" width="100px" />}
                                        </div>


                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image 4
                                                </label>
                                                <input
                                                    type="file"
                                                    name="image4"
                                                    className="form-control"
                                                    onChange={(e) => setImage4(e.target.files[0])}
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {image4 ? (
                                                <img src={URL.createObjectURL(image4)} alt="" width="100px" />
                                            ) : <img src={data?.image4} alt="" width="100px" />}
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

                                       

                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image 1
                                                </label>
                                                <input
                                                    type="file"
                                                    name="image5"
                                                    className="form-control"
                                                    onChange={(e) => setImage5(e.target.files[0])}
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {image5 ? (
                                                <img src={URL.createObjectURL(image5)} alt="" width="100px" />
                                            ) : <img src={data?.image5} alt="" width="100px" />}
                                        </div>


                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image 2
                                                </label>
                                                <input
                                                    type="file"
                                                    name="image6"
                                                    className="form-control"
                                                    onChange={(e) => setImage6(e.target.files[0])}
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {image6 ? (
                                                <img src={URL.createObjectURL(image6)} alt="" width="100px" />
                                            ) : <img src={data?.image6} alt="" width="100px" />}
                                        </div>

                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image 3
                                                </label>
                                                <input
                                                    type="file"
                                                    name="image13"
                                                    className="form-control"
                                                    onChange={(e) => setImage13(e.target.files[0])}
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {image13 ? (
                                                <img src={URL.createObjectURL(image13)} alt="" width="100px" />
                                            ) : <img src={data?.image13} alt="" width="100px" />}
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
                                                    Sub heading
                                                </label>
                                                <input
                                                    type="text"
                                                    {...register("subheading2")}
                                                    className="form-control"
                                                    placeholder="Enter the subheading"
                                                />
                                            </div>
                                        </div>


                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Content
                                                </label>
                                                <textarea type="text"
                                                    {...register("content2")}
                                                    className="form-control"
                                                    placeholder="Enter the content">
                                                </textarea>
                                            </div>
                                        </div>

                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image 1
                                                </label>
                                                <input
                                                    type="file"
                                                    name="image7"
                                                    className="form-control"
                                                    onChange={(e) => setImage7(e.target.files[0])}
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {image7 ? (
                                                <img src={URL.createObjectURL(image7)} alt="" width="100px" />
                                            ) : <img src={data?.image7} alt="" width="100px" />}
                                        </div>


                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image 2
                                                </label>
                                                <input
                                                    type="file"
                                                    name="image8"
                                                    className="form-control"
                                                    onChange={(e) => setImage8(e.target.files[0])}
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {image8 ? (
                                                <img src={URL.createObjectURL(image8)} alt="" width="100px" />
                                            ) : <img src={data?.image8} alt="" width="100px" />}
                                        </div>


                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image 3
                                                </label>
                                                <input
                                                    type="file"
                                                    name="image9"
                                                    className="form-control"
                                                    onChange={(e) => setImage9(e.target.files[0])}
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {image9 ? (
                                                <img src={URL.createObjectURL(image9)} alt="" width="100px" />
                                            ) : <img src={data?.image9} alt="" width="100px" />}
                                        </div>


                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image 4
                                                </label>
                                                <input
                                                    type="file"
                                                    name="image10"
                                                    className="form-control"
                                                    onChange={(e) => setImage10(e.target.files[0])}
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {image10 ? (
                                                <img src={URL.createObjectURL(image10)} alt="" width="100px" />
                                            ) : <img src={data?.image10} alt="" width="100px" />}
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
                                                    Sub heading
                                                </label>
                                                <input
                                                    type="text"
                                                    {...register("subheading3")}
                                                    className="form-control"
                                                    placeholder="Enter the subheading"
                                                />
                                            </div>
                                        </div>


                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Content
                                                </label>
                                                <textarea type="text"
                                                    {...register("content3")}
                                                    className="form-control"
                                                    placeholder="Enter the content">
                                                </textarea>
                                            </div>
                                        </div>

                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image 1
                                                </label>
                                                <input
                                                    type="file"
                                                    name="image11"
                                                    className="form-control"
                                                    onChange={(e) => setImage11(e.target.files[0])}
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {image11 ? (
                                                <img src={URL.createObjectURL(image11)} alt="" width="100px" />
                                            ) : <img src={data?.image11} alt="" width="100px" />}
                                        </div>


                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image 2
                                                </label>
                                                <input
                                                    type="file"
                                                    name="image12"
                                                    className="form-control"
                                                    onChange={(e) => setImage12(e.target.files[0])}
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {image12 ? (
                                                <img src={URL.createObjectURL(image12)} alt="" width="100px" />
                                            ) : <img src={data?.image12} alt="" width="100px" />}
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