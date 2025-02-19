"use client"

import Loader from '@/_components/Loader';
import api from '@/_config/config';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
const SCR = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            const res = await api.get("/social_responsibility/get_social_responsibility");
            setData(res.data.data)
            setLoading(false)
        } catch (err) {
            setLoading(false)
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
                        <div className="simpleParallax">
                            <img src="/assets/images/page-header-default.jpg" alt="bg_image" className="cover-parallax" />
                        </div>
                    </div>
                    <div className="page_header_content">
                        <div className="auto-container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="banner_title_inner">
                                        <div className="title_page">
                                            Corporate Social Responsibility
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="breadcrumbs creote">
                                        <ul className="breadcrumb m-auto">
                                            <li><a href="index-2.html">Home</a></li>
                                            <li className="active">Corporate Social Responsibility</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pd_top_120"></div>
                <section className="video-section">
                    <div className="container-fluid pd_zero">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 overflow-hidden pd_zero bg_op_1 rounded_top_right_30 rounded_bottom_right_30" style={{
                                backgroundImage: `url(${data?.image1})`
                            }}>
                                <div className="pd_top_240"></div>
                                <div className="pd_top_60"></div>

                                <div className="pd_bottom_240"></div>
                                <div className="pd_bottom_50"></div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 pd_zero pd_left_100 pd_right_100 md_pd_left_15 md_pd_right_15">
                                <div className="pd_top_110"></div>
                                <div className="title_all_box style_one  dark_color">
                                    <div className="title_sections">
                                        <div className="before_title">
                                            {data?.heading1}
                                        </div>
                                        <div dangerouslySetInnerHTML={{ __html: data?.description1 || '' }}></div>
                                    </div>
                                </div>

                                <div className="pd_bottom_90"></div>
                            </div>

                        </div>
                    </div>

                </section>

                <section id="content" className="site-content bg-light pd_top_80 pd_bottom_80">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 m-auto">
                                <div className="title_all_box style_six text-center">
                                    <div className="title_sections">

                                        <div className="title">The Smiles We Shared This Season</div>
                                        <p className="description_text"> We spread smiles by making a lasting impact in communities.
                                        </p>
                                    </div>
                                    <div className="pd_bottom_20"></div>
                                </div>
                            </div>
                        </div>
                        <div className="row default_row">
                            <div className="full_width_box">

                                <div className="row">
                                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12">
                                        <div className="csr_boxes">
                                            <img src={data?.gallery1} className="simp_img_1 img-fluid " alt="image" />
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12">
                                        <div className="csr_boxes">
                                            <img src={data?.gallery2} className="simp_img_1 img-fluid " alt="image" />
                                        </div>
                                    </div>                           <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12">
                                        <div className="csr_boxes">
                                            <img src={data?.gallery3} className="simp_img_1 img-fluid " alt="image" />
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12">
                                        <div className="csr_boxes">
                                            <img src={data?.gallery4} className="simp_img_1 img-fluid " alt="image" />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="pd_bottom_70"></div>
                                <div className="row">
                                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                                        <div className="csr_boxes">
                                            <img src={data?.gallery5} className="simp_img_2 img-fluid " alt="image" />
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                                        <div className="csr_boxes">
                                            <img src={data?.gallery6} className="simp_img_2 img-fluid " alt="image" />
                                        </div>
                                    </div>   <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                                        <div className="csr_boxes">
                                            <img src={data?.gallery7} className="simp_img_2 img-fluid " alt="image" />
                                        </div>
                                    </div>
                                </div>
                                <div className="pd_bottom_70"></div>
                                <div className="row">
                                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12">
                                        <div className="csr_boxes">
                                            <img src={data?.gallery8} className="simp_img_1 img-fluid " alt="image" />
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12">
                                        <div className="csr_boxes">
                                            <img src={data?.gallery9} className="simp_img_1 img-fluid " alt="image" />
                                        </div>
                                    </div>                           <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12">
                                        <div className="csr_boxes">
                                            <img src={data?.gallery10} className="simp_img_1 img-fluid " alt="image" />
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12">
                                        <div className="csr_boxes">
                                            <img src={data?.gallery11} className="simp_img_1 img-fluid " alt="image" />
                                        </div>
                                    </div>
                                </div>
                                <div className="pd_bottom_70"></div>
                                <div className="row">
                                    <div className="col-xl-34col-lg-4 col-md-4 col-sm-12">
                                        <div className="csr_boxes">
                                            <img src={data?.gallery12} className="simp_img_2 img-fluid " alt="image" />
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                                        <div className="csr_boxes">
                                            <img src={data?.gallery13} className="simp_img_2 img-fluid " alt="image" />
                                        </div>
                                    </div>   <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                                        <div className="csr_boxes">
                                            <img src={data?.gallery14} className="simp_img_2 img-fluid " alt="image" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="pd_top_80"></div>
                <section className="content-section">

                    <div className="row">
                        <div className="col-xxl-5 col-xl-4 col-lg-4 col-md-12 pd_zero bg_op_1 text-center" style={{ backgroundImage: "url(/assets/images/banner-four-bg.jpg)" }}>

                            {/* <div className="video_btn_all">
                                <div className="pd_top_200"></div>
                                <div className="pd_top_70"></div>
                                <div className="video_box">
                                    <a href="https://www.youtube.com/71EZb94AS1k" className="lightbox-image"><i className="icon-play"></i></a>
                                </div>
                                <div className="pd_top_80"></div>
                            </div> */}

                        </div>

                        <div className="col-xxl-7 col-xl-8 col-lg-8 col-md-12 bg_op_1" style={{ backgroundImage: "url(/assets/images/home-10-content-1.jpg)" }}>
                            <div className="row">
                                <div className="col-xxl-1 col-xl-1 col-md-12"></div>
                                <div className="col-xxl-9 col-xl-9 col-md-12">
                                    <div className="content-wrapper">
                                        <div className="pd_top_80"></div>
                                        <div className="title_all_box style_one light_color">
                                            <div className="title_sections left">
                                                <div className="before_title">Together,</div>
                                                <h2>We Make an Impact</h2>
                                                <p>We know that meaningful change happens when we come together. Through partnerships with local organizations and direct contributions to those in need, we ensure that our efforts make a lasting and positive impact.</p>
                                                <p>We focus on empowering communities by supporting education, health, and well-being, and ensuring that those who need it most receive the resources and opportunities to thrive.</p>
                                            </div>
                                        </div>
                                        <div className="pd_bottom_20"></div>
                                        {/* <div className="row gutter_15px">
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div className="icon_box_all style_seven light_color">
                                                    <div className="icon_content">
                                                        <div className="icon">
                                                            <span className="icon-dollar"></span>
                                                        </div>
                                                        <div className="text_box">
                                                            <h2><a href="#" target="_blank" rel="nofollow"> Employee Compensation</a>
                                                            </h2>
                                                            <p>Holds in these matters principles selection right rejects.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div className="icon_box_all style_seven light_color">
                                                    <div className="icon_content">
                                                        <div className="icon">
                                                            <span className="icon-pharmacy"></span>
                                                        </div>
                                                        <div className="text_box">
                                                            <h2><a href="#" target="_blank" rel="nofollow"> Health Care Benefits</a>
                                                            </h2>
                                                            <p>The great explorer of the truth the master builders human happiness.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                        {/* <div className="pd_bottom_30"></div> */}
                                        <div className="row gutter_15px">
                                            <div className="col-lg-4 col-md-4 col-sm-12">
                                                <div className="theme_btn_all">
                                                    <Link href="/contact/contact-us" target="_blank" rel="nofollow" className="theme-btn two special-btn">Contact us</Link>
                                                </div>
                                                <div className="pd_bottom_30"></div>
                                            </div>
                                            {/* <div className="col-lg-8 col-md-8 col-sm-12">
                                                <div className="extra_content authour_box light_color">
                                                    <div className="authour_box_content">
                                                        <div className="image">
                                                            <img src="/assets/images/signature.png" className="img-fluid sign_image" alt="authour Image" />
                                                        </div>
                                                        <div className="text">
                                                            <h6>Liam Oliver, Founder &amp; CEO of Qetus
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                        <div className="pd_bottom_70"></div>
                                    </div>
                                </div>
                                <div className="col-xxl-2 col-xl-2 col-md-12"></div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default SCR