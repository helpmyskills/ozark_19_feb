"use client"
import Loader from '@/_components/Loader';
import api from '@/_config/config';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const OurExpertise = () => {

    const [activeId, setActiveId] = useState(1);
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true)

    const handleToggle = (id) => {
        setActiveId(id);
    }

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            const res = await api.get("/our_expertise/get_our_expertise");
            if (res.data.status == 1) {
                setData(res.data.data);
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err)
        }
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
                                            Our Expertise
                                        </h1>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="breadcrumbs creote">
                                        <ul className="breadcrumb m-auto">
                                            <li><Link href="/">Home</Link></li>
                                            <li className="active">Our Expertise</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pd_top_120"></div>
                <section className="progress-section">

                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-5 mb-lg-0 mb-xl-0">
                                <div className="title_all_box style_one  dark_color">
                                    <div className="title_sections left">
                                        <div className="before_title">Why Choose &amp;</div>
                                        <h2>Ozark & Co.?</h2>
                                        <p>At Ozark & Co., we understand that entrusting someone with your financial future is a profound decision. In a world filled with complex choices, our commitment to transparency, tailored guidance, and unwavering integrity sets us apart.</p>
                                    </div>
                                </div>
                                {/* <div className="theme_btn_all color_one">
                                    <a href="#" target="_blank" rel="nofollow" className="theme-btn four">Read more <i
                                        className="icon-right-arrow"></i></a>
                                </div> */}
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                <div className="progress_bar style_three">
                                    <h2>Client Satisfaction Rate <span>92%</span></h2>
                                    <div className="bar">
                                        <div className="bar-inner count-bar counted" data-percent="48%" style={{ width: "92%" }}></div>
                                    </div>
                                </div>

                                <div className="progress_bar style_three">
                                    <h2>Yearly Tax Compliance Accuracy <span>98%</span></h2>
                                    <div className="bar">
                                        <div className="bar-inner count-bar counted" data-percent="79%" style={{ width: "98%" }}></div>
                                    </div>
                                </div>

                                <div className="progress_bar style_three">
                                    <h2>Processes Automated Across Clients <span>74%</span></h2>
                                    <div className="bar">
                                        <div className="bar-inner count-bar counted" data-percent="65%" style={{ width: "74%" }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pd_bottom_50"></div>
                </section>

                <section className="tab-section">
                    <div className="container">
                        <div className="row">
                            <section className="tabs_all_box tabs_all_box_start type_two">
                                <div className="tab_over_all_box">
                                    <div className="tabs_header clearfix">
                                        <ul className="showcase_tabs_btns nav-pills nav clearfix">

                                            <li className="nav-item">
                                                <a className={`s_tab_btn nav-link ${activeId == 1 ? "active" : ""}`} data-tab="#tabtabone" onClick={() => handleToggle(1)}>01.Trust</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className={`s_tab_btn nav-link ${activeId == 2 ? "active" : ""}`} data-tab="#tabtabtwo" onClick={() => handleToggle(2)}>02.Adaptability</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className={`s_tab_btn nav-link ${activeId == 3 ? "active" : ""}`} data-tab="#tabtabtwothree" onClick={() => handleToggle(3)}>03. Progress</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="s_tab_wrapper">
                                        <div className="s_tabs_content">
                                            <div className={`s_tab fade ${activeId == 1 ? "active-tab show" : ""}`} id="tabtabone">
                                                <div className="tab_content one">
                                                    <div className="row">
                                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-5 mb-lg-0 mb-xl-0">
                                                            <div className="image">
                                                                <img src={data?.benefits_image} alt="img" />
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                                            <div className="content_bx">
                                                                <h6>{data?.benefits_heading}</h6>
                                                                <div dangerouslySetInnerHTML={{ __html: data?.benefits_description || " " }}></div>
                                                                {/* <a href="#" target="_blank" rel="nofollow" className="theme-btn two">Read
                                                                    More</a> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`s_tab fade ${activeId == 2 ? "active-tab show" : ""}`} id="tabtabtwo">
                                                <div className="tab_content one">
                                                    <div className="row">
                                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-5 mb-lg-0 mb-xl-0">
                                                            <div className="image">
                                                                <img src={data?.advice_image} alt="img" />
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                                            <div className="content_bx">
                                                                <h6>{data?.advice_heading}</h6>
                                                                <div dangerouslySetInnerHTML={{ __html: data?.advice_description || " " }}></div>
                                                                {/* <a href="#" target="_blank" rel="nofollow" className="theme-btn two">
                                                                    Read More
                                                                </a> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`s_tab fade ${activeId == 3 ? "active-tab show" : ""}`} id="tabtabtwothree">
                                                <div className="tab_content one">
                                                    <div className="row">
                                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-5 mb-lg-0 mb-xl-0">
                                                            <div className="image">
                                                                <img src={data?.audit_image} alt="img" />
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                                            <div className="content_bx">
                                                                <h6>{data?.audit_heading}</h6>
                                                                <div dangerouslySetInnerHTML={{ __html: data?.audit_description || " " }}></div>
                                                                {/* <a href="#" target="_blank" rel="nofollow" className="theme-btn two">
                                                                    Read More
                                                                </a> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div className="pd_bottom_80"></div>
                </section>



                <section className="call-to-action-section">
                    <div className="auto-container">
                        <div className="call_to_action style_two">
                            <div className="image">

                                <img src="/assets/images/sliders/slider-1-2.jpg" className="img-fluid" alt="image" />

                            </div>
                            <div className="auto-container">
                                <div className="row">
                                    <div className="col-lg-8">
                                        <div className="left_content">
                                            <div className="main_content">
                                                <h1>Get in Touch!</h1>
                                                <div className="bottom_content">
                                                    <div className="call_content">
                                                        <span className="icon-phone-call1 icon"></span>
                                                        <div className="content_bx">
                                                            <h4>Reach Us At</h4>
                                                            <p><a className="text-white fw-bold" href="tel:+91-8743877462">+91-8743877462</a></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="image_right">
                                            <img decoding="async" src="/assets/images/cal-img.png" alt="image" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="pd_top_80"></div>
            </div>
        </>
    )
}

export default OurExpertise