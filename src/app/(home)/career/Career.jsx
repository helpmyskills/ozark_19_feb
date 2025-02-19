"use client"

import Loader from '@/_components/Loader';
import api from '@/_config/config';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';

function Career() {
    const [careerPageData, setCareerPageData] = useState(false);
    const [jobData, setJobData] = useState();
    const [activeIndex, setActiveIndex] = useState(0);
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
    const [loading, setLoading] = useState(true);


    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    useEffect(() => {
        getCareerPageData();
        getJobData()
    }, []);

    const getCareerPageData = async () => {
        try {
            const res = await api.get("/career/get_career_page");
            setCareerPageData(res.data.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    const getJobData = async () => {
        try {
            const res = await api.get("/jobs/get_all_active_job");
            setJobData(res.data.data);
        } catch (err) {
            console.log(err);
        }
    }


    const onSubmit = async (data) => {
        try {
            const fromdata = new FormData();
            fromdata.append("name", data.name);
            fromdata.append("email", data.email);
            fromdata.append("phone", data.phone);
            fromdata.append("experience", data.experience);
            fromdata.append("position", data.position);
            fromdata.append("notice_period", data.notice_period);
            fromdata.append("resume", data.resume[0]);

            const res = await api.post("/jobs/post_job_enquiry", fromdata);
            if (res.data.status == 1) {
                toast.success(res.data.message);
                reset();
            } else {
                toast.error("Internal server error !")
            }
        } catch (err) {
            console.log(err);
        }
    }

    if (loading) {
        return <Loader />
    }

    return (
        <>
            <div id="content" className="site-content " onContextMenu={(e) => {
        e.preventDefault();
      }}>
                <div className="page_header_default style_one ">
                    <div className="parallax_cover">
                        <div className="simpleParallax"> <img src="/assets/images/page-header-default.jpg" alt="bg_image" className="cover-parallax" /> </div>
                    </div>
                    <div className="page_header_content">
                        <div className="auto-container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="banner_title_inner">
                                        <h1 className="title_page"> Career </h1>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="breadcrumbs creote">
                                        <ul className="breadcrumb m-auto">
                                            <li><Link href="/">Home</Link></li>
                                            <li className="active">Career</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="creote-icon-box">
                    <div className="pd_top_90"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-4 mb-lg-4 mb-xl-0">
                                <div className="icon_box_all style_five dark_color_one">
                                    <div className="icon_content">
                                        <div className="icon"> <span className="fa fa-deaf"></span> </div>
                                        <small>01</small>
                                        <div className="text_box">
                                            <h2>{careerPageData?.subheading1}</h2>
                                            <p>{careerPageData?.content1}</p>
                                        </div>
                                        <div className="hover_content">
                                            <div className="content">
                                                <div className="inner">
                                                    <p>{careerPageData?.hover_content1}</p>
                                                    {/* <a href="#" className="read_more">Read More <span className="icon-right-arrow-long"></span></a>  */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-4 mb-lg-4 mb-xl-0">
                                <div className="icon_box_all style_five dark_color_one">
                                    <div className="icon_content">
                                        <div className="icon"> <span className="fa fa-dropbox"></span> </div>
                                        <small>02</small>
                                        <div className="text_box">
                                            <h2>{careerPageData?.subheading2}</h2>
                                            <p>{careerPageData?.content2}</p>
                                        </div>
                                        <div className="hover_content">
                                            <div className="content">
                                                <div className="inner">
                                                    <p>{careerPageData?.hover_content2}</p>
                                                    {/* <a href="#" className="read_more">Read More <span className="icon-right-arrow-long"></span></a>  */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div className="icon_box_all style_five dark_color_one">
                                    <div className="icon_content">
                                        <div className="icon"> <span className="icon-world"></span> </div>
                                        <small>03</small>
                                        <div className="text_box">
                                            <h2>{careerPageData?.subheading3}</h2>
                                            <p>{careerPageData?.content2}</p>
                                        </div>
                                        <div className="hover_content">
                                            <div className="content">
                                                <div className="inner">
                                                    <p>{careerPageData?.hover_content3}</p>
                                                    {/* <a href="#" className="read_more">Read More <span className="icon-right-arrow-long"></span></a>  */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="pd_top_90"></div>
                <section className="expertise">
                    <div className="area_of_expertise">
                        <div className="simpleParallax"> <img src="/assets/images/areaof-ecp-1.jpg" className="cover-parallax" alt="image" /> </div>
                        <div className="title_and_video">
                            <div className="auto-container">
                                <div className="row d-flex justify-content-end">
                                    <div className="col-lg-6">
                                        <div className="title_all_box style_one text-end">
                                            <div className="title_sections">
                                                <h2>Create Meaningful Experiences for employees</h2>
                                                <p>we are dedicated to fostering an environment where employees are not just part of the team, but integral to our mission. We focus on providing meaningful experiences that promote both professional and personal growth.</p>
                                            </div>
                                            {/* <div className="theme_btn"> <a href="service-default.html" className="theme-btn one">Read more</a> </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="expertise">
                            <div className="auto-container">
                                <div className="row">
                                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 expertise_box">
                                        <div className="step_number">
                                            <h1>01.</h1>
                                        </div>
                                        <h2 className="title"><a href="#">Submit Application</a> </h2>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 expertise_box">
                                        <div className="step_number">
                                            <h1>02.</h1>
                                        </div>
                                        <h2 className="title"> <a href="#">Interview Process</a> </h2>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 expertise_box">
                                        <div className="step_number">
                                            <h1>03.</h1>
                                        </div>
                                        <h2 className="title"> <a href="#">Embrace Opportunity</a> </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="faqs-section">
                    <div className="pd_top_90"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="title_all_box style_one text-start dark_color">
                                    <div className="title_sections">
                                        <div className="before_title">Join Our team</div>
                                        <h2>Current Openings</h2>
                                    </div>
                                    <div className="pd_top_15"></div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="faq_section type_two">
                                    <div className="block_faq">
                                        <div className="accordion">
                                            <dl>
                                                {
                                                    jobData?.map((job, index) =>
                                                        <div key={index}>
                                                            <dt
                                                                className={`faq_header ${activeIndex === index ? 'active' : ''}`}
                                                                onClick={() => handleToggle(index)}
                                                            >
                                                                {job.job_title} - {job.available_posts} Posts
                                                                <span className="icon-chevron-down"></span>
                                                            </dt>
                                                            <dd className={`accordion-content ${activeIndex === index ? 'show' : ''}`}>
                                                                <h6>Job Description:</h6>
                                                                <p>{job.job_description}</p>
                                                                <h6>Desired Skills:</h6>
                                                                <ul>
                                                                    {
                                                                        job?.skills?.map((ele, ind) =>
                                                                            <li key={ind}>{ele.name}</li>
                                                                        )
                                                                    }
                                                                </ul>
                                                            </dd>
                                                        </div>
                                                    )
                                                }

                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div id="secondary" class="widget-area all_side_bar">
                                    <div class="side_bar">
                                        <div class="widgets_grid_box mt-0">
                                            <div class="about_authour_widget"> <i class="icon-mail2 h1 text-white"></i>
                                                <h3>Opportunities with us</h3>
                                                <p>If you are unable to find a suitable opening please do not worry. We are always up to discover new talents, kindly mail us your resume and portfolio link to <a class="sidebar-link" href="mailto:info@theozarkco.com">info@theozarkco.com</a></p>
                                                <Link href="/contact/contact-us">Contact Us</Link> </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </section>
                <div className="pd_bottom_90"></div>
                <section className="contact-section bg_op_1" style={{ backgroundImage: "url(/assets/images/contact-bg-7.jpg)" }}>
                    <div className="pd_top_80"></div>
                    <div className="container">
                        <div className="row d-flex justify-content-center">

                            <div className="col-xl-10 col-lg-10 d-flex justify-content-center">
                                <div className="contact_form_box_all type_two">
                                    <div className="contact_form_box_inner">
                                        <div className="contact_form_shortcode">
                                            <div className="heading">
                                                <h2>Apply <span> Now</span></h2>
                                            </div>
                                            <div className="_form">
                                                <div role="form" className="wpcf7" id="wpcf7-f2367-p2076-o1" lang="en-US" dir="ltr">
                                                    <div className="screen-reader-response">
                                                        <p role="status" aria-live="polite" aria-atomic="true"></p>
                                                        <ul>
                                                        </ul>
                                                    </div>
                                                    <form action="#" method="post" className="wpcf7-form init">
                                                        <div className="row">
                                                            <div className="col-lg-6">

                                                                <p className="form-row form-row-first validate-required" id="billing_first_name_field">
                                                                    <label>Your Name&nbsp;</label>

                                                                    <input type="text" className="input-text"
                                                                        id="billing_first_name" placeholder="Name"
                                                                        {...register("name", {
                                                                            required: {
                                                                                value: true,
                                                                                message: "Name is required !"
                                                                            }
                                                                        })}
                                                                        style={errors.name ? {
                                                                            borderColor: "red"
                                                                        } : {}} />
                                                                </p>
                                                                {errors.name && <p style={{ color: "red", marginTop: "-25px" }}>{errors.name.message}</p>}
                                                            </div>
                                                            <div className='col-ld-6'></div>
                                                            <div className="col-lg-6">
                                                                <p className="form-row form-row-wide validate-required validate-email" id="billing_email_field">
                                                                    <label> Email&nbsp;</label>

                                                                    <input type="email" className="input-text " {...register("email", {
                                                                        required: {
                                                                            value: true,
                                                                            message: "Email is required !"
                                                                        },
                                                                        pattern: {
                                                                            value: /^\S+@\S+\.\S+$/,
                                                                            message: "Invalid Email !"
                                                                        }
                                                                    })} id="billing_email" placeholder="Email" 
                                                                        style={errors.email ? {
                                                                            borderColor: "red"
                                                                        } : {}} />

                                                                </p>
                                                                {errors.email && <p style={{ color: "red", marginTop: "-25px" }}>{errors.email.message}</p>}
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <p className="form-row form-row-wide validate-required validate-phone" id="billing_phone_field">
                                                                    <label>Phone Number</label>

                                                                    <input type="tel" className="input-text"
                                                                        {...register("phone", {
                                                                            required: {
                                                                                value: true,
                                                                                message: "Phone number is required !"
                                                                            },
                                                                            pattern: {
                                                                                value: /^[+]?\d+$/,
                                                                                message: "Invalid phone number !"
                                                                            }
                                                                        })} id="billing_phone" placeholder="Phone Number" autoComplete="tel" style={errors.phone ? {
                                                                            borderColor: "red"
                                                                        } : {}} />
                                                                </p>
                                                                {errors.phone && <p style={{ color: "red", marginTop: "-25px" }}>{errors.phone.message}</p>}
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <p className="form-row form-row-wide validate-required validate-phone" id="billing_phone_field-2">
                                                                    <label>Total Experience</label>

                                                                    <input type="number" min="0"
                                                                        defaultValue={0} className="input-text" id="billing_phone-2" placeholder="Total Experience" autoComplete="tel"
                                                                        {...register("experience", {
                                                                            min: {
                                                                                value: 0,
                                                                                message: "can't be less than 0",
                                                                            },
                                                                        })}
                                                                        style={errors.experience ? {
                                                                            borderColor: "red"
                                                                        } : {}} />

                                                                </p>
                                                                {errors.experience && <p style={{ color: "red", marginTop: "-25px" }}>{errors.experience.message}</p>}
                                                            </div>

                                                            <div className="col-lg-6">
                                                                <p className="form-row form-row-wide validate-required validate-phone" id="billing_phone_field-3">
                                                                    <label>Notice Period</label>

                                                                    <input type="tel" className="input-text"
                                                                        {...register("notice_period")}
                                                                        id="billing_phone-3" placeholder="Notice Period" autoComplete="tel" />

                                                                </p>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <p className="form-row address-field validate-required validate-state form-row-wide" id="billing_state_field">
                                                                    <label>Position</label>

                                                                    <select name="billing_state" id="billing_state" className="state_select select2-hidden-accessible" data-placeholder="Select an option…" data-input-classnamees="" data-label="State" tabIndex="-1" aria-hidden="true"
                                                                        {...register("position", {
                                                                            required: {
                                                                                value: true,
                                                                                message: "Positon is required !"
                                                                            }
                                                                        })}
                                                                        style={errors.position ? {
                                                                            borderColor: "red"
                                                                        } : {}}>
                                                                        <option hidden defaultChecked value={""}>Position</option>

                                                                        {
                                                                            jobData?.map((ele, ind) =>
                                                                                <option value={ele.job_title} key={ind}>{ele.job_title}</option>)
                                                                        }
                                                                    </select>

                                                                </p>
                                                                {errors.position && <p style={{ color: "red", marginTop: "-25px" }}>{errors.position.message}</p>}
                                                            </div>
                                                            <div className="col-lg-6 text_area">
                                                                <p className="form-row address-field form-row-wide">
                                                                    <label>Resume</label>
                                                                    <input type="file" className="input-text" accept=".pdf"
                                                                        {...register("resume", {
                                                                            required: {
                                                                                value: true,
                                                                                message: "Resume is required !"
                                                                            }
                                                                        })} style={errors.resume ? {
                                                                            borderColor: "red"
                                                                        } : {}} /></p>
                                                                {errors.resume && <p style={{ color: "red", marginTop: "-25px" }}>{errors.resume.message}</p>}
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <input type="submit" value={isSubmitting ? "submitting..." : "Submit"} className="wpcf7-form-control has-spinner wpcf7-submit theme-btn one" onClick={handleSubmit(onSubmit)} disabled={isSubmitting} />
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pd_bottom_80"></div>
                </section>
            </div>
        </>
    )
}


export default Career 