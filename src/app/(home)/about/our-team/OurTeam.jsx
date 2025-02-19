"use client"
import Loader from '@/_components/Loader';
import api from '@/_config/config';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const OurTeam = () => {
    const [teamMemberData, setTeamMemberData] = useState();
    const [teamPageData, setTeamPageData] = useState();
    const [loading,setLoading] = useState(true)

    const getTeamMemberData = async () => {
        try {
            const res = await api.get("/team_member/get_all_active_team_member");
            setTeamMemberData(res.data.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    }

    const getTeamPageData = async () => {
        try {
            const res = await api.get("/leadership_team/get_leadership_page_data");
            setTeamPageData(res.data.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getTeamMemberData();
        getTeamPageData();
    }, [])

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
                                            Our Team
                                        </h1>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="breadcrumbs creote">
                                        <ul className="breadcrumb m-auto">
                                            <li><Link href="/">Home</Link></li>
                                            <li className="active">Our Team</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <section className="team-section bg_light_1">
                    <div className="pd_top_90"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="title_all_box style_one text-center dark_color">
                                    <div className="title_sections">
                                        <div className="before_title">Dedicated Team</div>
                                        <h2>Professional Individuals</h2>
                                    </div>
                                    <div className="pd_bottom_20"></div>
                                </div>
                            </div>
                        </div>
                        <div className="row">


                            {
                                teamMemberData?.map((ele, ind) => <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12" key={ind}>
                                    <div className="team_box style_one">
                                        <div className="team_box_outer">
                                            <div className="member_image">
                                                <img src={ele.image} alt="team image" />
                                            </div>
                                            <div className="about_member">
                                                <div className="share_media">
                                                    {/* <ul className="first">
                                                        <li className="text">Share</li>
                                                        <li><i className="fa fa-share-alt"></i></li>
                                                    </ul>
                                                    <ul>
                                                        <li className="shar_alt"><i className="fa fa-share-alt"></i></li>
                                                        <li><a href="#"> <i className="fa fa-facebook"> </i> </a></li>
                                                        <li><a href="#"> <i className="fa fa-twitter"> </i> </a></li>
                                                        <li><a href="#"> <i className="fa fa-skype"> </i> </a></li>
                                                        <li><a href="#"> <i className="fa fa-instagram"> </i> </a></li>
                                                    </ul> */}
                                                </div>
                                                <div className="authour_details">
                                                    <span>{ele.designation}</span>
                                                    <h6>{ele.name}</h6>
                                                    {/* <div className="button_view">
                                                    <a href="#" target="_blank" rel="nofollow" className="theme-btn one"> View Profile
                                                    </a>
                                                </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                            }
                        </div>
                    </div>
                    <div className="pd_bottom_70"></div>
                </section>

                <section className="image-section">
                    <div className="pd_top_90"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-4 mb-lg-4 mb-xl-0">
                                <div className="icon_box_all style_four">
                                    <div className="icon_content icon_imgs">
                                        <div className="icon">
                                            <img src={teamPageData?.icon1} className="img-fluid svg_image" alt="icon png" />
                                            <img src="/assets/images/shape-1-small.png" className="shape" alt="img" />
                                        </div>
                                        <div className="txt_content">
                                            <h3>
                                                <a href="#"  rel="nofollow" className='pe-none'>{teamPageData?.subheading1}</a>
                                            </h3>
                                            <p>{teamPageData?.content1}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-4 mb-lg-4 mb-xl-0">
                                <div className="icon_box_all style_four">
                                    <div className="icon_content icon_imgs">
                                        <div className="icon">
                                            <img src={teamPageData?.icon2} className="img-fluid svg_image" alt="icon png" />
                                            <img src="/assets/images/shape-1-small.png" className="shape" alt="img" />
                                        </div>
                                        <div className="txt_content">
                                            <h3>
                                                <a href="#" rel="nofollow" className='pe-none'>{teamPageData?.subheading2}</a>
                                            </h3>
                                            <p>{teamPageData?.content2}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-4 mb-lg-4 mb-xl-0">
                                <div className="icon_box_all style_four">
                                    <div className="icon_content icon_imgs">
                                        <div className="icon">
                                            <img src={teamPageData?.icon3} className="img-fluid svg_image" alt="icon png" />
                                            <img src="/assets/images/shape-1-small.png" className="shape" alt="img" />
                                        </div>
                                        <div className="txt_content">
                                            <h3>
                                                <a href="#" rel="nofollow" className='pe-none'>{teamPageData?.subheading3}</a>
                                            </h3>
                                            <p>{teamPageData?.content3}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-4 mb-lg-4 mb-xl-0">
                                <div className="icon_box_all style_four">
                                    <div className="icon_content icon_imgs">
                                        <div className="icon">
                                            <img src={teamPageData?.icon4} className="img-fluid svg_image" alt="icon png" />
                                            <img src="/assets/images/shape-1-small.png" className="shape" alt="img" />
                                        </div>
                                        <div className="txt_content">
                                            <h3>
                                                <a href="#" rel="nofollow" className='pe-none'>{teamPageData?.subheading4}</a>
                                            </h3>
                                            <p>{teamPageData?.content4}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className="pd_bottom_70"></div>
                </section>

                <section className="team-intro">
                    <div className="pd_top_50"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="team_intro_box">
                                    <div className="team_intro_inner">
                                        <div className="image_bg">
                                            <img src="/assets/images/team-intro-bg.jpg" className="img-fluid" alt="image" />
                                        </div>
                                        <div className="team_intro_start">
                                            <div className="row">
                                                <div className="col-lg-8">
                                                    <div className="left_content">
                                                        <div className="title">
                                                            <h6>Strong Team</h6>
                                                            <h1>Foundation of Business</h1>
                                                        </div>
                                                        <div className="quotes">
                                                            <span className="icon-quote"></span>
                                                            <h5>Teamwork is the secret that <br /> makes common people achieve <br />
                                                                uncommon results.</h5>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="image_right">
                                        <img src="/assets/images/team-head-1.png" alt="image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pd_bottom_50"></div>
                </section>
            </div>
        </>
    )
}

export default OurTeam