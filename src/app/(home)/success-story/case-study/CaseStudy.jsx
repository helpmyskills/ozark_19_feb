"use client"

import Loader from '@/_components/Loader';
import api from '@/_config/config';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function CaseStudy() {

    const [solutionList, setSolutionList] = useState();
    const [caseStudyData, setCaseStudyData] = useState();
    const [allCaseStudyData, setAllCaseStudyData] = useState();
    const [active, setActive] = useState(1);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        getSolutionList();
        getCaseStudyData();
    }, [])

    const getSolutionList = async () => {
        try {
            const res = await api.get("/solution/get_solution_list");
            setSolutionList(res.data.data);
        } catch (err) {
            console.log(err);
        }
    }
    const getCaseStudyData = async () => {
        try {
            const res = await api.get("/case_study/get_active_case_study")
            setCaseStudyData(res.data.data);
            setAllCaseStudyData(res.data.data);
            setLoading(false)
        } catch (err) {
            console.log(err);
        }
    }

    const filterCaseStudyData = (id) => {
        if (id == 1) {
            setCaseStudyData(allCaseStudyData);
            setActive(id)
            return;
        }
        const filterdCaseStudy = allCaseStudyData?.filter((ele) => ele.solution_id == id)
        setCaseStudyData(filterdCaseStudy);
        setActive(id)
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
                                            Case Studies
                                        </h1>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="breadcrumbs creote">
                                        <ul className="breadcrumb m-auto">
                                            <li><Link href="/">Home</Link></li>
                                            <li className="active">Case Studies</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="project-section">
                    <div className="pd_top_80"></div>
                    <div className="container">
                        <div className="project_all filt_style_eight filter_enabled">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="fliter_group" style={{ textAlign: "center!important" }}>

                                        <ul className="project_filter dark clearfix">
                                            <li data-filter=".project_category-coaching" className={`img-fluid ${active == 1 ? "current" : ""}`} onClick={() => filterCaseStudyData(1)}>All</li>
                                            {
                                                solutionList?.map((ele, ind) => (
                                                    <li data-filter=".project_category-coaching" className={`img-fluid ${active == ele._id ? "current" : ""}`} key={ind} onClick={() => filterCaseStudyData(ele._id)} style={{fontSize:"15px",padding:"0 3px"}}>{ele.solution_name}</li>
                                                ))
                                            }
                                        </ul>

                                    </div>
                                </div>
                            </div>
                            <div className="project_container clearfix">
                                <div className="row clearfix">

                                    {
                                        caseStudyData?.map((ele, ind) =>
                                            <div className="project-wrapper grid-item col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12  project_category-coaching" key={ind}>
                                                <div className="project_post style_eight">
                                                    <div className="inner_box">
                                                        <div className="image_box ">
                                                            <img width="746" height="497" src={ele.image} className="attachment-creote_project_caro_image_style_one size-creote_project_caro_image_style_one wp-post-image" alt="img" /> <Link data-fancybox="gallery" href={`/success-story/case-study/${ele.slug}`}>
                                                                <span className="icon-plus zoom_icon"></span>
                                                            </Link>
                                                        </div>
                                                        <div className="content_box ">
                                                            <h2 className="title_pro"><Link href={`/success-story/case-study/${ele.slug}`} rel="bookmark">{ele.heading}</Link></h2>
                                                            {/* <p>coaching</p> */}
                                                            <Link href={`/success-story/case-study/${ele.slug}`} className="arrow_btn "><span className="icon-right-arrow-long"></span></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>)
                                    }

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

export default CaseStudy