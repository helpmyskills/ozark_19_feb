"use client"
import React, { useEffect, useState } from 'react'
import api from '@/_config/config';
import Link from 'next/link';
import Loader from '@/_components/Loader';

const OurStory = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            const res = await api.get("/ourstory/get_story_data");
            setData(res.data.data);
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
                                        Our Story
                                    </h1>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="breadcrumbs creote">
                                    <ul className="breadcrumb m-auto">
                                        <li><Link href="/">Home</Link></li>
                                        <li className="active">Our Story</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="about-section">
                <div className="pd_top_120"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-12 mb-5 mb-lg-5 mb-xl-0">
                            <div className="image_boxes style_one">
                                <div className="image one">
                                    <img src={data?.image} className="img" alt="image" />
                                </div>
                                {/* <div className="image two">
                                        <img src="/assets/images/projects/project-detail-img-2.jpg" className="img" alt="image" /> */}
                                {/* <div className="video_box">
                                            <a href="#" className="lightbox-image"><i className="icon-play"></i></a>
                                        </div> */}
                                {/* </div> */}
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-12 pd_left_40">
                            <div className="pd_left_20">
                                <div className="title_all_box style_two  dark_color">
                                    <div className="title_sections two">
                                        <div className="before_title">Make sense for your business</div>
                                        <h2>{data?.heading}</h2>
                                    </div>
                                    <div dangerouslySetInnerHTML={{ __html: data?.description || '' }}>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>


                </div>
                <div className="pd_bottom_70"></div>
            </section>

            <section className="funfact-section bg_light_1">
                <div className="pd_bottom_80"></div>
                <div className="container">
                    <div className="section__counter four_column">
                        <div className="grid_show_case grid_layout clearfix row">
                            <div className="grid_box _card col-6 col-lg-3" >
                                <div className="counter-block style_one count-box counted">
                                    <div className="icon_box  ">

                                        <div className="coun_ter">
                                            <span className="count-text" data-speed="1500" data-stop="1423">3000</span>
                                            <small>+</small>
                                        </div>
                                    </div>
                                    <div className="content_box">
                                        <h6>Global Clients</h6>

                                    </div>
                                </div>
                            </div>
                            <div className="grid_box _card col-6 col-lg-3" >
                                <div className="counter-block style_one count-box counted">
                                    <div className="icon_box  ">

                                        <div className="coun_ter">
                                            <span className="count-text" data-speed="1500" data-stop="100">500</span>
                                            <small>+</small>
                                        </div>
                                    </div>
                                    <div className="content_box">
                                        <h6>Financial Planners</h6>

                                    </div>
                                </div>
                            </div>
                            <div className="grid_box _card col-6 col-lg-3">
                                <div className="counter-block style_one count-box counted">
                                    <div className="icon_box  ">

                                        <div className="coun_ter">
                                            <span className="count-text" data-speed="1500" data-stop="82">22</span>
                                            <small>+</small>
                                        </div>
                                    </div>
                                    <div className="content_box">
                                        <h6>Awards Wins</h6>

                                    </div>
                                </div>
                            </div>
                            <div className="grid_box _card col-6 col-lg-3">
                                <div className="counter-block style_one count-box counted">
                                    <div className="icon_box  ">

                                        <div className="coun_ter">
                                            <span className="count-text" data-speed="1500" data-stop="82">92</span>
                                            <small>%</small>
                                        </div>
                                    </div>
                                    <div className="content_box">
                                        <h6>Client Satisfaction</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pd_bottom_70"></div>
            </section>

            <section className="process-section bg_light_1">

                <div className="pd_top_0"></div>

                <div className="container">
                    <div className="row">
                        <div className="col-lg-2"></div>
                        <div className="col-lg-8">
                            <div className="title_all_box style_one text-center dark_color">
                                <div className="title_sections">

                                    <h2 className="title">Our Story, Your Growth</h2>
                                    <p>See how our path of growth has empowered businesses through smart financial solutions.</p>
                                </div>

                                <div className="pd_top_20"></div>

                            </div>
                        </div>
                        <div className="col-lg-2"></div>
                    </div>

                    <div className="process-content-wapper">
                        <div className="row g-4">
                            <div className="col-xl-3 col-lg-6 col-sm-12 col-md-6 ">
                                <div className='pd_zero border_r'>
                                    <div className="icon_box_all style_six version_2">
                                        <div className="icon_content">
                                            <div className="icon">
                                                <img src={data?.icon1} className="img-fluid svg_image" alt="icon png" />
                                            </div>
                                            <div className="text_box">
                                                <h2><a href="#" rel="nofollow" className='pe-none'>{data?.subheading1} </a></h2>
                                                <p>{data?.content1} </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6 col-sm-12 col-md-6">
                                <div className='pd_zero border_r'>
                                    <div className="icon_box_all style_six version_2">
                                        <div className="icon_content">
                                            <div className="icon">
                                                <img src={data?.icon2} className="img-fluid svg_image" alt="icon png" />
                                            </div>
                                            <div className="text_box">
                                                <h2><a href="#" rel="nofollow" className='pe-none'>{data?.subheading2} </a></h2>
                                                <p>{data?.content2} </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6 col-sm-12 col-md-6">
                                <div className='pd_zero border_r'>
                                    <div className="icon_box_all style_six version_2">
                                        <div className="icon_content">
                                            <div className="icon">
                                                <img src={data?.icon3} className="img-fluid svg_image" alt="icon png" />
                                            </div>
                                            <div className="text_box">
                                                <h2><a href="#" rel="nofollow" className='pe-none'>{data?.subheading3} </a></h2>
                                                <p>{data?.content3} </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6 col-sm-12 col-md-6 ">
                                <div className='pd_zero border_r'>
                                    <div className="icon_box_all style_six version_2">
                                        <div className="icon_content">
                                            <div className="icon">
                                                <img src={data?.icon4} className="img-fluid svg_image" alt="icon png" />
                                            </div>
                                            <div className="text_box">
                                                <h2><a href="#" rel="nofollow" className='pe-none'>{data?.subheading4} </a></h2>
                                                <p>{data?.content4} </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pd_bottom_120"></div>
            </section>
        </div>
    )
}

export default OurStory