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
    const [description2, setDescription2] = useState();

    const [image1, setImage1] = useState();
   

    const [gallery1, setGallery1] = useState();
    const [gallery2, setGallery2] = useState();
    const [gallery3, setGallery3] = useState();
    const [gallery4, setGallery4] = useState();
    const [gallery5, setGallery5] = useState();
    const [gallery6, setGallery6] = useState();
    const [gallery7, setGallery7] = useState();
    const [gallery8, setGallery8] = useState();
    const [gallery9, setGallery9] = useState();
    const [gallery10, setGallery10] = useState();
    const [gallery11, setGallery11] = useState();
    const [gallery12, setGallery12] = useState();
    const [gallery13, setGallery13] = useState();
    const [gallery14, setGallery14] = useState();


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

            formdata.append("heading1", data.heading1);
      
            formdata.append("image1", image1);
            
            formdata.append("gallery1", gallery1);
            formdata.append("gallery2", gallery2);
            formdata.append("gallery3", gallery3);
            formdata.append("gallery4", gallery4);
            formdata.append("gallery5", gallery5);
            formdata.append("gallery6", gallery6);
            formdata.append("gallery7", gallery7);
            formdata.append("gallery8", gallery8);
            formdata.append("gallery9", gallery9);
            formdata.append("gallery10", gallery10);
            formdata.append("gallery11", gallery11);
            formdata.append("gallery12", gallery12);
            formdata.append("gallery13", gallery13);
            formdata.append("gallery14", gallery14);


            formdata.append("title", data.title);
            formdata.append("keyword", data.keyword);
            formdata.append("meta_description", data.meta_description);
            formdata.append("id", data._id)

            const res = await api.post("/social_responsibility/update_social_responsibility", formdata);
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
            const res = await api.get("/social_responsibility/get_social_responsibility");
            setData(res.data.data);
            setDescription1(res.data.data.description1);
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
                            Social corporate responsibility
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
                                                    Heading
                                                </label>
                                                <input
                                                    type="text"
                                                    {...register("heading1")}
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
                                                    name="image1"
                                                    className="form-control"
                                                    onChange={(e) => setImage1(e.target.files[0])}
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {image1 ? (
                                                <img src={URL.createObjectURL(image1)} alt="" width="50px" />
                                            ) : <img src={data?.image1} alt="" width="50px" />}
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
                                        Gallery section
                                    </legend>
                                    <div className="form-row">
                                        
                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image 1
                                                </label>
                                                <input
                                                    type="file"
                                                    name="gallery1"
                                                    className="form-control"
                                                    onChange={(e) => setGallery1(e.target.files[0])}
                                                    accept="image/*"
                                                    
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {gallery1 ? (
                                                <img src={URL.createObjectURL(gallery1)} alt="" width="50px" />
                                            ) : <img src={data?.gallery1} alt="" width="50px" />}
                                        </div>


                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image 2
                                                </label>
                                                <input
                                                    type="file"
                                                    name="gallery2"
                                                    className="form-control"
                                                    onChange={(e) => setGallery2(e.target.files[0])}
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {gallery2 ? (
                                                <img src={URL.createObjectURL(gallery2)} alt="" width="50px" />
                                            ) : <img src={data?.gallery2} alt="" width="50px" />}
                                        </div>


                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image 3
                                                </label>
                                                <input
                                                    type="file"
                                                    name="gallery3"
                                                    className="form-control"
                                                    onChange={(e) => setGallery3(e.target.files[0])}
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {gallery3 ? (
                                                <img src={URL.createObjectURL(gallery3)} alt="" width="50px" />
                                            ) : <img src={data?.gallery3} alt="" width="50px" />}
                                        </div>


                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image 4
                                                </label>
                                                <input
                                                    type="file"
                                                    name="gallery4"
                                                    className="form-control"
                                                    onChange={(e) => setGallery4(e.target.files[0])}
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {gallery4 ? (
                                                <img src={URL.createObjectURL(gallery4)} alt="" width="50px" />
                                            ) : <img src={data?.gallery4} alt="" width="50px" />}
                                        </div>

                                        <div className="col-12"> 
                                            <hr />
                                        </div>
                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image 5
                                                </label>
                                                <input
                                                    type="file"
                                                    name="gallery5"
                                                    className="form-control"
                                                    onChange={(e) => setGallery5(e.target.files[0])}
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {gallery5 ? (
                                                <img src={URL.createObjectURL(gallery5)} alt="" width="50px" />
                                            ) : <img src={data?.gallery5} alt="" width="50px" />}
                                        </div>


                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image 6
                                                </label>
                                                <input
                                                    type="file"
                                                    name="gallery6"
                                                    className="form-control"
                                                    onChange={(e) => setGallery6(e.target.files[0])}
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {gallery6 ? (
                                                <img src={URL.createObjectURL(gallery6)} alt="" width="50px" />
                                            ) : <img src={data?.gallery6} alt="" width="50px" />}
                                        </div>


                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image 7
                                                </label>
                                                <input
                                                    type="file"
                                                    name="gallery7"
                                                    className="form-control"
                                                    onChange={(e) => setGallery7(e.target.files[0])}
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {gallery7 ? (
                                                <img src={URL.createObjectURL(gallery7)} alt="" width="50px" />
                                            ) : <img src={data?.gallery7} alt="" width="50px" />}
                                        </div>
                                        <div className="col-md-6"></div>

                                        <div className="col-12"> 
                                            <hr />
                                        </div>

                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image 8
                                                </label>
                                                <input
                                                    type="file"
                                                    name="gallery8"
                                                    className="form-control"
                                                    onChange={(e) => setGallery8(e.target.files[0])}
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {gallery8 ? (
                                                <img src={URL.createObjectURL(gallery8)} alt="" width="50px" />
                                            ) : <img src={data?.gallery8} alt="" width="50px" />}
                                        </div>

                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image 9
                                                </label>
                                                <input
                                                    type="file"
                                                    name="gallery9"
                                                    className="form-control"
                                                    onChange={(e) => setGallery9(e.target.files[0])}
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {gallery9 ? (
                                                <img src={URL.createObjectURL(gallery9)} alt="" width="50px" />
                                            ) : <img src={data?.gallery9} alt="" width="50px" />}
                                        </div>

                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image 10
                                                </label>
                                                <input
                                                    type="file"
                                                    name="gallery10"
                                                    className="form-control"
                                                    onChange={(e) => setGallery10(e.target.files[0])}
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {gallery10 ? (
                                                <img src={URL.createObjectURL(gallery10)} alt="" width="50px" />
                                            ) : <img src={data?.gallery10} alt="" width="50px" />}
                                        </div>

                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image 11
                                                </label>
                                                <input
                                                    type="file"
                                                    name="gallery11"
                                                    className="form-control"
                                                    onChange={(e) => setGallery11(e.target.files[0])}
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {gallery11 ? (
                                                <img src={URL.createObjectURL(gallery11)} alt="" width="50px" />
                                            ) : <img src={data?.gallery11} alt="" width="50px" />}
                                        </div>

                                        <div className="col-12"> 
                                            <hr />
                                        </div>

                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image 12
                                                </label>
                                                <input
                                                    type="file"
                                                    name="gallery12"
                                                    className="form-control"
                                                    onChange={(e) => setGallery12(e.target.files[0])}
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {gallery12 ? (
                                                <img src={URL.createObjectURL(gallery12)} alt="" width="50px" />
                                            ) : <img src={data?.gallery12} alt="" width="50px" />}
                                        </div>


                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image 13
                                                </label>
                                                <input
                                                    type="file"
                                                    name="gallery13"
                                                    className="form-control"
                                                    onChange={(e) => setGallery13(e.target.files[0])}
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {gallery13 ? (
                                                <img src={URL.createObjectURL(gallery13)} alt="" width="50px" />
                                            ) : <img src={data?.gallery13} alt="" width="50px" />}
                                        </div>


                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image 14
                                                </label>
                                                <input
                                                    type="file"
                                                    name="gallery14"
                                                    className="form-control"
                                                    onChange={(e) => setGallery14(e.target.files[0])}
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {gallery14 ? (
                                                <img src={URL.createObjectURL(gallery14)} alt="" width="50px" />
                                            ) : <img src={data?.gallery14} alt="" width="50px" />}
                                        </div>


                                    </div>
                                </fieldset>

                                {/* <fieldset class="border rounded p-3 px-4 mb-4">
                                    <legend class="float-none w-auto px-3">
                                        Section
                                    </legend>
                                    <div className="form-row">

                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image
                                                </label>
                                                <input
                                                    type="file"
                                                    name="image2"
                                                    className="form-control"
                                                    onChange={(e) => setImage2(e.target.files[0])}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {image2 ? (
                                                <img src={URL.createObjectURL(image2)} alt="" width="100px" />
                                            ) : <img src={data?.image2} alt="" width="100px" />}
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
                                                    onBlur={newContent => setDescription2(newContent)}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Sub heading 1
                                                </label>
                                                <input
                                                    type="text"
                                                    {...register("subheading3")}
                                                    className="form-control"
                                                    placeholder="Enter the heading"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Sub heading 2
                                                </label>
                                                <input
                                                    type="text"
                                                    {...register("subheading4")}
                                                    className="form-control"
                                                    placeholder="Enter the heading"
                                                />
                                            </div>
                                        </div>


                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Content 1
                                                </label>
                                                <textarea type="text"
                                                    {...register("content3")}
                                                    className="form-control"
                                                    placeholder="Enter the content">
                                                </textarea>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Content 2
                                                </label>
                                                <textarea type="text"
                                                    {...register("content4")}
                                                    className="form-control"
                                                    placeholder="Enter the content">
                                                </textarea>
                                            </div>
                                        </div>

                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Icon 1
                                                </label>
                                                <input
                                                    type="file"
                                                    name="icon3"
                                                    className="form-control"
                                                    onChange={(e) => setIcon3(e.target.files[0])}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {icon3 ? (
                                                <img src={URL.createObjectURL(icon3)} alt="" width="100px" />
                                            ) : <img src={data?.icon3} alt="" width="100px" />}
                                        </div>
                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Icon 2
                                                </label>
                                                <input
                                                    type="file"
                                                    name="icon4"
                                                    className="form-control"
                                                    onChange={(e) => setIcon4(e.target.files[0])}
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
                                                    Sub heading 3
                                                </label>
                                                <input
                                                    type="text"
                                                    {...register("subheading5")}
                                                    className="form-control"
                                                    placeholder="Enter the heading"
                                                />
                                            </div>
                                        </div>
                                        <div className=" col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Sub heading 4
                                                </label>
                                                <input
                                                    type="text"
                                                    {...register("subheading6")}
                                                    className="form-control"
                                                    placeholder="Enter the heading"
                                                />
                                            </div>
                                        </div>


                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Content 3
                                                </label>
                                                <textarea type="text"
                                                    {...register("content5")}
                                                    className="form-control"
                                                    placeholder="Enter the content">
                                                </textarea>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Content 4
                                                </label>
                                                <textarea type="text"
                                                    {...register("content6")}
                                                    className="form-control"
                                                    placeholder="Enter the content">
                                                </textarea>
                                            </div>
                                        </div>

                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Icon 3
                                                </label>
                                                <input
                                                    type="file"
                                                    name="icon5"
                                                    className="form-control"
                                                    onChange={(e) => setIcon5(e.target.files[0])}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {icon5 ? (
                                                <img src={URL.createObjectURL(icon5)} alt="" width="100px" />
                                            ) : <img src={data?.icon5} alt="" width="100px" />}
                                        </div>
                                        <div className="col-7 col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Icon 4
                                                </label>
                                                <input
                                                    type="file"
                                                    name="icon6"
                                                    className="form-control"
                                                    onChange={(e) => setIcon6(e.target.files[0])}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
                                            {icon6 ? (
                                                <img src={URL.createObjectURL(icon6)} alt="" width="100px" />
                                            ) : <img src={data?.icon6} alt="" width="100px" />}
                                        </div>

                                    </div>
                                </fieldset> */}

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