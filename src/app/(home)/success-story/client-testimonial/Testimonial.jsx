"use client";

import Loader from "@/_components/Loader";
import api from "@/_config/config";
import Link from "next/link";
import { useEffect, useState } from "react";

function Testimonial() {

    const [testimonialData, setTestimonialData] = useState();
    const [solutionList, setSolutionList] = useState();
    const [allTestimonial, setAllTestimonial] = useState();
    const [activeTestimonialId, setActiveTestimonialId] = useState(1);
    const [loading,setloading] = useState(true);


    useEffect(() => {
        getTestimonialData();
        getSolutionList();
    }, [])

    const getTestimonialData = async () => {
        try {
            const res = await api.post("/testimonials/get_active_testimonial_data");
            setTestimonialData(res.data.data);
            setAllTestimonial(res.data.data);
            setloading(false)
        } catch (err) {
            console.log(err);
        }
    }

    const getSolutionList = async () => {
        try {
            const res = await api.get("/solution/get_solution_list")
            setSolutionList(res.data.data);
        } catch (err) {
            console.log(err)
        }
    }

    const filterTestimonialData = (id) => {
        if (id == 1) {
            setTestimonialData(allTestimonial);
            setActiveTestimonialId(1);
            return;
        }
        const filteredTestimonial = allTestimonial?.filter((ele) => ele.solution_id == id)
        setTestimonialData(filteredTestimonial);
        setActiveTestimonialId(id);
    }

    if(loading){
        return <Loader/>
    }
    return (
        <>
            <div id="content" className="site-content " onContextMenu={(e) => {
        e.preventDefault();
      }}>
                <div className="page_header_default style_one ">
                    <div className="parallax_cover">
                        <div className="simpleParallax">
                            <img src="/assets/images/page-header-default.jpg" alt="bg_image" className="cover-parallax" />
                        </div>
                    </div>
                    <div className="page_header_content">
                        <div className="auto-container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="banner_title_inner">
                                        <h1 className="title_page">
                                            Empowering Client Journeys
                                        </h1>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="breadcrumbs creote">
                                        <ul className="breadcrumb m-auto">
                                            <li><Link href="/">Home</Link></li>
                                            <li className="active">Empowering Client Journeys</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="testimonial-section testimonial-section project_all filt_style_two filter_enabled">
                    <div className="pd_top_50"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="fliter_group" style={{ textAlign: "center !important" }}>
                                    <ul className="project_filter dark clearfix">
                                        <li data-filter=".project_category-coaching" className={`img-fluid ${activeTestimonialId == 1 ? "current" : ""}`} onClick={() => filterTestimonialData(1)}>All</li>
                                        {
                                            solutionList?.map((ele, ind) => (
                                                <li data-filter=".project_category-coaching" className={`img-fluid ${activeTestimonialId == ele._id ? "current" : ""}`} key={ind} onClick={() => filterTestimonialData(ele._id)} >{ele.solution_name}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row g-3">

                            {
                                testimonialData?.map((ele, ind) =>
                                    <div className="col-12 col-lg-6 col-xl-4" key={ind}>
                                        <div className="testimonial_box type_two">
                                            <div className="upper_content">
                                                <div className="image_box">
                                                    <img src={ele.image} className="img-fluid" alt="image" />
                                                    <span className="icon-quote"></span>
                                                </div>
                                                <div className="description">
                                                    <p>
                                                        {ele.content}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="lower_content clearfix">
                                                <div className="authour_name">
                                                    <h2>{ele.name}</h2>
                                                    <h6>{ele.designation}</h6>
                                                </div>
                                                <p>
                                                {
                                                    [1, 2, 3, 4, 5].map((e, i) =>
                                                        ele.rating >= e ? (
                                                            <i className="fa fa-star fill" key={i}></i>
                                                        ):(
                                                            <i className="fa fa-star empty" key={i}></i>
                                                        )
                                                    )
                                                }
                                                </p>
                                            </div>

                                        </div>
                                    </div>)
                            }
                        </div>
                    </div>
                    <div className="pd_bottom_90"></div>
                </section>
            </div>

        </>
    )
}

export default Testimonial