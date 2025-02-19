"use client"
import Loader from '@/_components/Loader';
import api from '@/_config/config';
import { useEffect, useState } from 'react';
import React from 'react'

function Faq() {
    const [activeFAQ, setActiveFAQ] = useState(0);
    const [solutionList, setSolutionList] = useState();
    const [faqData, setFaqData] = useState();
    const [allFaq, setAllfaq] = useState();
    const [activeFaqId, setActiveFaqId] = useState(1);
    const [loading, setLoading] = useState(true);

    const toggleFAQ = (index) => {
        if (activeFAQ === index) {
            setActiveFAQ(null);
        } else {
            setActiveFAQ(index);
        }
    };

    useEffect(() => {
        getSolutionList()
        getFaqData()
    }, [])



    const getSolutionList = async () => {
        try {
            const res = await api.get("/solution/get_solution_list")
            setSolutionList(res.data.data);
        } catch (err) {
            console.log(err)
        }
    }

    const getFaqData = async () => {
        try {
            const res = await api.get("/faq/get_all_active_faq")
            setFaqData(res.data.data);
            setAllfaq(res.data.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err)
        }
    }

    const filterFaqData = (id) => {
        if (id == 1) {
            setFaqData(allFaq)
            setActiveFaqId(id);
            return;
        }
        const filterdFAQ = allFaq?.filter((ele) => ele.solution_id == id);
        setFaqData(filterdFAQ);
        setActiveFaqId(id);
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
                                            FAQ's
                                        </h1>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="breadcrumbs creote">
                                        <ul className="breadcrumb m-auto">
                                            <li><a href="index-2.html">Home</a></li>
                                            <li className="active">FAQS</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="faqs-section project_all filt_style_two filter_enabled">
                    <div className="pd_top_90"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="title_all_box style_one text-center dark_color">
                                    <div className="title_sections">
                                        <h2>Useful Question &amp; Answer</h2>
                                        <p>Check our FAQs for quick answers to frequently asked questions we receive.</p>
                                    </div>
                                    <div className="pd_top_15"></div>
                                </div>
                            </div>
                        </div>
                        <div className="pd_top_35"></div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="fliter_group" style={{ textAlign: "center!important" }}>
                                    <ul className="project_filter dark clearfix">
                                        <li data-filter=".project_category-coaching" className={`img-fluid ${activeFaqId == 1 ? "current" : ""}`} onClick={() => filterFaqData(1)}>All</li>
                                        {
                                            solutionList?.map((ele, ind) => (
                                                <li data-filter=".project_category-coaching" className={`img-fluid ${activeFaqId == ele._id ? "current" : ""}`} key={ind} onClick={() => filterFaqData(ele._id)}>{ele.solution_name}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* <div className="row">
                            <div className="col-lg-6" > */}
                        <div className="faq_section type_two">
                            <div className="block_faq">
                                <div className="accordion row">
                                    <div className='col-12 col-lg-6'>
                                        {
                                            faqData?.map((ele, ind) =>
                                                ind < (faqData.length / 2)
                                                && (
                                                    <div key={ind}>
                                                        <dt
                                                            className={`faq_header ${activeFAQ === ind ? 'active' : ''}`}
                                                            onClick={() => toggleFAQ(ind)}
                                                        >
                                                            {ele.heading}
                                                            <span className={`icon-play ${activeFAQ === ind ? 'rotate' : ''}`}></span>
                                                        </dt>
                                                        <dd
                                                            className={`accordion-content ${activeFAQ === ind ? 'show' : 'hide'}`}
                                                            style={{ display: activeFAQ === ind ? 'block' : 'none' }}
                                                        >
                                                            <p>{ele.content}</p>
                                                        </dd>
                                                    </div>
                                                )
                                            )
                                        }
                                    </div>


                                    <div className='col-12 col-lg-6'>
                                        {
                                            faqData?.map((ele, ind) =>
                                                ind >= (faqData.length / 2)
                                                && (
                                                    <div key={ind}>
                                                        <dt
                                                            className={`faq_header ${activeFAQ === ind ? 'active' : ''}`}
                                                            onClick={() => toggleFAQ(ind)}
                                                        >
                                                            {ele.heading}
                                                            <span className={`icon-play ${activeFAQ === ind ? 'rotate' : ''}`}></span>
                                                        </dt>
                                                        <dd
                                                            className={`accordion-content ${activeFAQ === ind ? 'show' : 'hide'}`}
                                                            style={{ display: activeFAQ === ind ? 'block' : 'none' }}
                                                        >
                                                            <p>{ele.content}</p>
                                                        </dd>
                                                    </div>
                                                )
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            {/* </div>
                            </div> */}

                        </div>
                    </div>
                    <div className="pd_bottom_60"></div>
                </section>
            </div>
        </>
    )
}

export default Faq