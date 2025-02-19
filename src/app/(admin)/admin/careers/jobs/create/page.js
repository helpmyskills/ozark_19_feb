"use client"
import api from "@/_config/config";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function page() {

    const [inputData, setInputData] = useState();
    const router = useRouter();


    const [skills, setSkills] = useState([]);

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputData({ ...inputData, [name]: value });
    }

    const createJob = async (e) => {
        try {
            e.preventDefault();

            const res = await api.post(`/jobs/create_job`, {
                job_title: inputData?.job_title,
                job_description: inputData?.job_description,
                available_posts: inputData?.available_posts,
                skills: skills
            });

            if (res.data.status === 1) {
                toast.success(res.data.message);
                router.push("/admin/careers/jobs/view")
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }


    const handleAddSkill = (e) => {
        e.preventDefault();
        if (inputData?.skill) {
            setSkills([...skills, { name: inputData?.skill }])
            setInputData({ job_title: inputData?.job_title, skill: "", job_description: inputData?.job_description, available_posts: inputData?.available_posts });
        }
    }

    const removeSkills = (e, id) => {
        e.preventDefault();
        const skillAfterFilter = skills?.filter((ele, ind) => ind != id);
        setSkills(skillAfterFilter);
    }


    return (
        <>
            <div className="app-main__inner">

                <div className="row">
                    <div className="col-md-12 col-xl-12">
                        <div className="main-card mb-3 card">
                            <div className="card-header">
                                Create Job
                            </div>

                            <div className="card-body">
                                <form >
                                    <div className="form-row">

                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Job title
                                                </label>
                                                <input
                                                    name="job_title"
                                                    placeholder="Enter the job title"
                                                    type="text"
                                                    className="form-control"
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Available posts
                                                </label>
                                                <input
                                                    name="available_posts"
                                                    placeholder="Enter the available posts"
                                                    type="number"
                                                    min="1"
                                                    className="form-control"
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Job description
                                                </label>
                                                <textarea
                                                    name="job_description"
                                                    placeholder="Enter the job description"
                                                    type="text"
                                                    className="form-control"
                                                    onChange={handleInputChange}
                                                ></textarea>
                                            </div>
                                        </div>

                                        <div className="col-md-5">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Skills
                                                </label>
                                                <input
                                                    placeholder="Enter the skill"
                                                    type="text"
                                                    className="form-control"
                                                    onChange={handleInputChange}
                                                    name="skill"
                                                    value={inputData?.skill}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-1 d-flex align-items-center mt-2 ">
                                            <button className="btn btn-primary" style={{
                                                padding: "8px",
                                                marginTop: "3px"
                                            }} onClick={handleAddSkill}>Add</button>
                                        </div>
                                        <div className="col-md-6">

                                        </div>
                                        <div className="col-6">
                                            {
                                                skills?.map((ele, ind) =>
                                                    <div className="d-flex align-items-center justify-content-between" key={ind}>
                                                        <p className="my-auto mr-2" style={{ maxWidth: "300px" }}>{ele.name}</p>
                                                        <button className="btn btn-primary my-1" onClick={(e) => removeSkills(e, ind)}>Remove</button>
                                                    </div>
                                                )
                                            }
                                        </div>

                                    </div>
                                    <button className="mt-2 btn btn-primary" onClick={createJob}>Create </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div >
            </div >

        </>
    );
}
