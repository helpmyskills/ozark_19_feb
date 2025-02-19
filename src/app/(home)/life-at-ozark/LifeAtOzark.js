"use client"

import Loader from '@/_components/Loader';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import api from '@/_config/config';

const LifeAtOzark = () => {
    const [data,setData] = useState(false)
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        getData();
    },[])

    const getData = async () => {
        try {
            const res = await api.get("/life/get_life_ozark_data");
            setData(res.data.data);
            setLoading(false)
        } catch (err) {
            setLoading(false)
            console.log(err);
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
                        <div className="simpleParallax"> <img src="/assets/images/page-header-default.jpg" alt="bg_image" className="cover-parallax" /> </div>
                    </div>
                    <div className="page_header_content">
                        <div className="auto-container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="banner_title_inner">
                                        <h1 className="title_page"> Life @ Ozark </h1>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="breadcrumbs creote">
                                        <ul className="breadcrumb m-auto">
                                            <li><Link href="/">Home</Link></li>
                                            <li className="active">Life @ Ozark</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pd_top_120"></div>
                <section className="ozark-life">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-12">
                                <div className="row default_row">
                                    <div className="full_width_box">
                                        <div className="row">
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                                <div className="simple_image_boxes"> <img src={data?.image1} className="simp_img img-fluid " alt="image" /> </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                                <div className="simple_image_boxes"> <img src={data?.image2} className="simp_img img-fluid " alt="image" /> </div>
                                            </div>
                                        </div>
                                        <div className="pd_bottom_30"></div>
                                        <div className="row">
                                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                                <div className="simple_image_boxes"> <img src={data?.image3} className="simp_img img-fluid" alt="image" /> </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                                <div className="simple_image_boxes"> <img src={data?.image4} className="simp_img img-fluid" alt="image" /> </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12">
                                <div className="light-bg d-flex align-items-center" style={{height:"100%"}}>
                                    <div dangerouslySetInnerHTML={{ __html: data?.description1 || '' }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="pd_top_60"></div>
                        <div className="row ">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-12 bg_dark_1 d-flex align-items-center justify-content-start life-text">
                                <div className="title_all_box style_five">
                                    <div className="title_sections five left">
                                        <h4 className="text-white">{data?.subheading1}</h4>
                                        <p className="text-white">{data?.content1}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="row default_row">
                                    <div className="full_width_box">
                                        <div className="row">
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                                                <div className="simple_image_boxes"> <img src={data?.image5} className="simp_img img-fluid " alt="image" /> </div>
                                            </div>
                                        </div>
                                        <div className="pd_bottom_30"></div>
                                        <div className="row">
                                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                                <div className="simple_image_boxes"> <img src={data?.image13} className="simp_img img-fluid " alt="image" /> </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                                <div className="simple_image_boxes"> <img src={data?.image6} className="simp_img img-fluid " alt="image" /> </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pd_top_60"></div>
                        <div className="row">
                            <div className="col-xl-3 col-lg-3 col-md-3 col-12">
                                <div className="simple_image_boxes-2" style={{maxHeight:"100%"}}> <img src={data?.image7} className="" alt="image" /> </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="row default_row">
                                    <div className="full_width_box">
                                        <div className="row">
                                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                                <div className="simple_image_boxes"> <img src={data?.image8} className="simp_img img-fluid " alt="image" /> </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                                <div className="simple_image_boxes"> <img src={data?.image9} className="simp_img img-fluid " alt="image" /> </div>
                                            </div>
                                        </div>
                                        <div className="pd_bottom_30"></div>
                                        <div className="row">
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                                                <div className="light-bg">
                                                    <div className="title_all_box style_five">
                                                        <div className="title_sections five left">
                                                            <h4 className="text-dark">{data?.subheading2}</h4>
                                                            <p className="text-dark">{data?.content2}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-3 col-12">
                                <div className="simple_image_boxes-2" style={{maxHeight:"100%"}}> <img src={data?.image10} className="" alt="image" /> </div>
                            </div>
                        </div>
                        <div className="pd_top_60"></div>
                        <div className="row">
                            <div className="col-xl-3 col-lg-3 col-md-3 col-12">
                                <div className=" bg_dark_1 life-text-2">
                                    <div className="title_all_box style_five">
                                        <div className="title_sections five left">
                                            <h4 className="text-white">{data?.subheading3}</h4>
                                            <p className="text-white">{data?.content3}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3">
                                <div className="row default_row">
                                    <div className="full_width_box">
                                        <div className="simple_image_boxes" style={{ maxHeight: "190px" }}> <img src={data?.image11} className="simp_img img-fluid " alt="image" /> </div>
                                        <div className="pd_bottom_30"> </div>
                                        <div className="simple_image_boxes" style={{ maxHeight: "190px" }}> <img src={data?.image12} className="simp_img img-fluid " alt="image" /> </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div className="light-bg d-flex align-items-center" style={{height:"100%"}}>
                                    <div dangerouslySetInnerHTML={{ __html: data?.description2 || '' }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="pd_top_120"></div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default LifeAtOzark