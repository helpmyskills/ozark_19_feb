"use client"

import { useState, useRef, useEffect } from "react";
import api from "@/_config/config";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false })
import { useForm } from "react-hook-form"


const page = () => {

    const [data, setData] = useState();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const config = {
        height: 300,
        readonly: false
    };

    const router = useRouter();
    const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm()

    const onSubmit = async (data) => {
        try {
            const res = await api.post("/page_title_data/update_page_title", data);
            console.log(res.data);
            if (res.data.status == 1) {
                toast.success(res.data.message);
                router.push("/admin/page-title");
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getData();
    }, []);


    const getData = async () => {
        try {
            const res = await api.post("/page_title_data/get_page_title_data", {
                id: id
            });
            if (res.data.status == 1) {
                setData(res.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        if (data) {
            reset(data);
        }
    }, [data, reset]);

    return (
        <div className="app-main__inner">
            <div className="row">
                <div className="col-md-12 col-xl-12">
                    <div className="main-card mb-3 card">
                        <div className="card-header">
                            Update type {data?.type}
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>

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

                                <button className="mt-2 px-3 btn btn-primary" onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>{isSubmitting ? "Update..." : "Update"}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page