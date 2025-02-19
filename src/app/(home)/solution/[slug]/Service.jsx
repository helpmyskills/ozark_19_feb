"use client"

import { useEffect, useState } from 'react';
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import { Autoplay, Navigation } from 'swiper/modules';
import api from '@/_config/config';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Loader from '@/_components/Loader';

function Service() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [solutionData, setSolutionData] = useState();
    const [testimonialData, setTestimonialData] = useState();
    const [solutionList, setSolutionList] = useState();
    const [allTestimonial, setAllTestimonial] = useState();
    const [activeTestimonialId, setActiveTestimonialId] = useState(1);
    const [loading, setLoading] = useState(true);

    const pathname = usePathname();
    const solution_slug = pathname.split("/")[2];


    const handleToggle = (index) => {
        setActiveIndex(activeIndex == index ? null : index);
    };

    useEffect(() => {
        getSolutionData();
        getTestimonialData();
        getSolutionList();
    }, [])

    const getSolutionData = async () => {
        try {
            const res = await api.post("/solution/get_solution_by_slug", {
                solution_slug: solution_slug
            })
            setSolutionData(res.data.data);
            setLoading(false);
        } catch (err) {
            setLoading(false)
            console.log(err);
        }
    }

    const getTestimonialData = async () => {
        try {
            const res = await api.post("/testimonials/get_active_testimonial_data");
            setTestimonialData(res.data.data);
            setAllTestimonial(res.data.data);
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
                        <div className="simpleParallax"> <img src="/assets/images/page-header-default.jpg" alt="bg_image"
                            className="cover-parallax" /> </div>
                    </div>
                    <div className="page_header_content">
                        <div className="auto-container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="banner_title_inner">
                                        <h1 className="title_page">{solutionData?.solution_name}</h1>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="breadcrumbs creote">
                                        <ul className="breadcrumb m-auto">
                                            <li><Link href="/">Home</Link></li>
                                            <li className="active">{solutionData?.solution_name}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="auto-container">
                    <div className="row default_row">
                        <aside id="secondary" className="widget-area all_side_bar col-lg-4 col-md-12 col-sm-12">
                            <div className="service_siderbar side_bar">
                                <div className="pd_top_45"></div>
                                <div className="widgets_grid_box">
                                    <div className="widget creote_widget_service_list">
                                        <h4 className="widget-title">Our Services</h4>
                                        <ul className="service_list_box">
                                            {
                                                solutionData?.solutionList?.map((ele, ind) => (
                                                    <li key={ind}><Link href={ele.solution_slug}>{ele.solution_name}</Link> </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div className="widgets_grid_box">
                                    <div id="creote-contactus-3" className="widget widget_contactus">
                                        <div className="contact_box_widget widget_box">
                                            <div className="widget_content"> <img src={solutionData?.image1}
                                                alt="backgroundimage" />
                                                <div className="top_section">
                                                    <h3>Have Questions?</h3>
                                                    <p>We're here to help! Reach out to us for any inquiries</p>
                                                </div>
                                                <div className="bottom_section"> <a href="tel:+91-8743877462"
                                                    className="phone_number">+91-8743877462</a> <a href="mailto:info@theozarkco.com"
                                                        className="mailid">info@theozarkco.com</a> </div>
                                            </div>
                                            <Link href="/contact/contact-us" className="theme-btn one">Appointment</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="pd_bottom_15"></div>
                            </div>
                        </aside>

                        <div id="primary" className="content-area service col-lg-8 col-md-12 col-sm-12 col-xs-12">
                            <main id="main" className="site-main" role="main">
                                <div className="pd_top_45"></div>
                                <article className="clearfix service type-service status-publish has-post-thumbnail hentry">
                                    <div className="title_all_box style_one dark_color">
                                        <div className="title_sections left">
                                            {/* <div className="before_title">{solutionData?.solution_slug}</div> */}
                                            <h2 className="title">{solutionData?.heading}</h2>
                                            <p>{solutionData?.content}</p>
                                            <p dangerouslySetInnerHTML={{ __html: solutionData?.solution_description || '' }}></p>
                                        </div>
                                    </div>
                                    <div className="row no-space">
                                        <div
                                            className="col-xl-6 col-12 mb-5 mb-lg-5 mb-xl-0 ps-0 ps-lg-0 pe-0 pe-lg-0 pe-xl-3">
                                            <div className="icon_box_all style_one d-flex align-items-center">
                                                <div className="icon_content ">
                                                    <div className="icon"> <img src={solutionData?.icon1} className="img-fluid svg_image"
                                                        alt="" /> </div>
                                                    <div className="txt_content">
                                                        <h3> <a href="#" target="_blank" rel="nofollow">{solutionData?.sub_heading1}</a> </h3>
                                                        <p>{solutionData?.content1}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="col-xl-6 col-12 mb-5 mb-lg-5 mb-xl-0 ps-0 ps-lg-0 pe-0 pe-lg-0 pe-xl-3">
                                            <div className="icon_box_all style_one d-flex align-items-center">
                                                <div className="icon_content ">
                                                    <div className="icon"> <img src={solutionData?.icon2} className="img-fluid svg_image"
                                                        alt="" /> </div>
                                                    <div className="txt_content">
                                                        <h3> <a href="#" target="_blank" rel="nofollow">{solutionData?.sub_heading2}</a> </h3>
                                                        <p>{solutionData?.content2}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pd_bottom_45"></div>
                                    <div className="row no-space">
                                        <div
                                            className="col-xl-8 col-lg-8 col-md-8 col-12 mb-5 mb-lg-5 mb-xl-0 ps-0 ps-lg-0 pe-0 pe-lg-0 pe-xl-3">
                                            <h3 style={{ marginBottom: "10px" }}>Why choose to outsourcing us?</h3>
                                            <div className="content_box_cn style_one" dangerouslySetInnerHTML={{ __html: solutionData?.why_choose_description || '' }}></div>
                                        </div>
                                        <div
                                            className="col-xl-4 col-lg-4 col-md-4 col-12 mb-5 mb-lg-5 mb-xl-0 ps-0 ps-lg-0 pe-0 pe-lg-0 pe-xl-3">
                                            <div className="simple_image_boxes"> <img src={solutionData?.image2}
                                                className="object-fit-cover-center height_570px" alt="image" /> </div>
                                        </div>
                                    </div>
                                    <div className="pd_bottom_45"></div>
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 ps-0 ps-lg-0 pe-0 pe-lg-0 ps-xl-3">
                                        <h3>Service Benefits</h3>
                                        <div className="pd_bottom_25"></div>
                                        <div className="faq_section type_two">
                                            <div className="block_faq">
                                                <div className="accordion">
                                                    <dl>
                                                        {
                                                            solutionData?.benefits?.map((ele, ind) => (
                                                                <div key={ind}>
                                                                    <dt
                                                                        className={`faq_header ${activeIndex === ind ? 'active' : ''}`}
                                                                        onClick={() => handleToggle(ind)}

                                                                    >
                                                                        {ele.heading}
                                                                        <span className="icon-play"></span>
                                                                    </dt>
                                                                    <dd
                                                                        className={`accordion-content ${activeIndex === ind ? 'show' : 'hide'}`}
                                                                        style={{ display: activeIndex === ind ? 'block' : 'none' }}
                                                                    >
                                                                        <p>
                                                                            {ele.content}
                                                                        </p>
                                                                    </dd>
                                                                </div>
                                                            ))
                                                        }
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                                <div className="pd_bottom_65"></div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>

            <section className="testimonial-section testimonial-section project_all filt_style_two filter_enabled">
                <div className="pd_top_50"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 m-auto">
                            <div className="title_all_box style_six text-center dark_color">
                                <div className="title_sections">

                                    <div className="title">Words From Our Customers</div>
                                    <p>See how our services have helped businesses succeed.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="fliter_group" style={{ textAlign: "center!important" }}>
                                <ul className="project_filter dark clearfix">
                                    <li data-filter=".project_category-coaching" className={`img-fluid ${activeTestimonialId == 1 ? "current" : ""}`} onClick={() => filterTestimonialData(1)}>All</li>
                                    {
                                        solutionList?.map((ele, ind) => (
                                            <li data-filter=".project_category-coaching" className={`img-fluid ${activeTestimonialId == ele._id ? "current" : ""}`} key={ind} onClick={() => filterTestimonialData(ele._id)}>{ele.solution_name}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="testimonial_all owl_new_one ">
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={30}
                                    breakpoints={{
                                        992: {
                                            slidesPerView: 2
                                        }
                                    }}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    navigation={true}
                                    modules={[Autoplay, Navigation]}
                                    className="mySwiper"

                                >
                                    {
                                        testimonialData?.map((ele, ind) => (
                                            <SwiperSlide key={ind}>
                                                <div className="owl-item cloned">
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
                                                                        ) : (
                                                                            <i className="fa fa-star empty" key={i}></i>
                                                                        )
                                                                    )
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="pd_bottom_90"></div>
            </section>

        </>
    )
}

export default Service