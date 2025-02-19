"use client"
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useForm } from "react-hook-form";
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import toast from 'react-hot-toast';
import api from '@/_config/config';
import Link from 'next/link';
import Loader from '@/_components/Loader';
import DateFormatter from '@/_utils/DateFormatter';

export default function Home() {

  const [tabId, setTabId] = useState(1)
  const [activeTab, setActiveTab] = useState(1);
  const [loading, setLoading] = useState(true);

  const handleTabId = (id) => {
    setTabId(id)
  }
  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const [homePageData, setHomePageData] = useState();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/contact_enquiry/post_contact_enquiry_data", data);

      if (res.data.status == 1) {
        toast.success(res.data.message);
        reset();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }



  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    try {
      const res = await api.get("/home/home_page_api");
      setHomePageData(res.data.data);
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
      <div id="content" className="site-content " 
      // onContextMenu={(e) => {
      //   e.preventDefault();
      // }}
      >
        <section className="slider style_page_thirteen nav_position_one position-relative">
          <div>

            <Swiper navigation={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop
              modules={[Navigation, Autoplay]} className="mySwiper">
              {
                homePageData?.banner?.map((ele, ind) =>
                  <SwiperSlide key={ind}>
                    <div className="slide-item-content">
                      <div className="slide-item content_center">
                        <div className="image-layer"
                          style={{ backgroundImage: `url(${ele.image})` }}>
                        </div>
                        <div className="medium-container">
                          <div className="row align-items-center">
                            <div className="col-lg-10 col-md-12 col-sm-12 col-xs-12 m-auto">
                              <div className="slider_content">
                                <h6 className="animate_left text-uppercase">
                                  {ele.title}
                                </h6>
                                <h1 className="animate_up">
                                  {ele.heading}
                                </h1>
                                <p className="animate_right pd_bottom_40">
                                  {ele.content}
                                </p>
                                <ul className="animate_down">
                                  {/* <li className="theme_btn_all color_two">
                                    <a href="#" className="theme-btn one">Get Quote</a>
                                  </li> */}
                                  <li className="theme_btn_all">
                                    <Link href="/contact/contact-us" className="theme-btn one color_white">Get A Quote</Link>
                                  </li>
                                </ul>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>)
              }
            </Swiper>
          </div>

        </section >

        <section className="service_section bg_light_1" id="service">

          <div className="pd_top_80"></div>
          <div className="container">
            <div className="row">
              <div className="title_all_box style_one text-center dark_color">
                <div className="title_sections">

                  <h2>Benefits of choosing Ozark & Co.</h2>
                  <p>We deliver the highest quality of work, on time, everytime.</p>
                </div>
              </div>
              <div className="pd_bottom_20"></div>
              <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <div className="service_box style_two dark_color">
                  <div className="service_content_two ">
                    <div className="content_inner"
                      style={{ backgroundImage: "url(/assets/images/service/service-image-1.png)" }}>
                      <div className="content_inner_in">
                        <div className="icon_image">
                          <img src="assets/images/010-job-search.png" className="img-fluid"
                            alt="Service Image" />
                        </div>
                        <h2>
                          <a href="#">A solution that works for you</a>
                        </h2>
                        <p>Pay for what you need and never more.</p>
                        <ul>
                          <li>Year-round availability</li>
                          <li>Flexible and Convenient</li>
                          <li>Available On-Demand</li>
                        </ul>
                      </div>
                    </div>
                    <div className="ovarlay_link">
                      <Link href="/contact/contact-us">
                        <i className="icon-right-arrow"></i>
                      </Link>
                    </div>
                    <div className="overlay_content">
                      <h2>
                        <a href="#">Unique Solution</a>
                      </h2>
                      <p>We provide unique solutions as your needs, ensuring innovative approaches that deliver exceptional results.</p>
                    </div>
                  </div>
                </div>
                <div className="mr_bottom_20"></div>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <div className="service_box style_two dark_color">
                  <div className="service_content_two  active_ser">
                    <div className="content_inner"
                      style={{ backgroundImage: "url(/assets/images/service/service-image-2.png)" }}>
                      <div className="content_inner_in">
                        <div className="icon_image">
                          <img src="assets/images/service-ico-1.png" className="img-fluid" alt="Service Image" />
                        </div>
                        <h2>
                          <a href="">Increase your profit margins</a>
                        </h2>
                        <p>Indignation sed dislike men who are beguiled and demoralized.</p>
                        <ul>
                          <li>
                            Improving Communication
                          </li>
                          <li>
                            Employee issue resolution
                          </li>
                          <li>
                            Proper Documentation Process
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="ovarlay_link">
                      <Link href="/contact/contact-us">
                        <i className="icon-right-arrow"></i>
                      </Link>
                    </div>
                    <div className="overlay_content">
                      <h2>
                        <a href="#">Excellence</a>
                      </h2>
                      <p>We strive for excellence by delivering high-quality solutions that exceed expectations and drive success
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mr_bottom_20"></div>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <div className="service_box style_two dark_color">
                  <div className="service_content_two ">
                    <div className="content_inner"
                      style={{ backgroundImage: "url(/assets/images/service/service-image-3.png)" }}>
                      <div className="content_inner_in">
                        <div className="icon_image">
                          <img src="assets/images/service-ico-2.png" className="img-fluid" alt="Service Image" />
                        </div>
                        <h2>
                          <a href="#">Low prices, quick turnaround</a>
                        </h2>
                        <p>Where competitive fixed fee pricing meets quality work.</p>
                        <ul>
                          <li>
                            Efficiency
                          </li>
                          <li>
                            Cost-effective
                          </li>
                          <li>
                            Resourceful
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="ovarlay_link">
                      <Link href="/contact/contact-us">
                        <i className="icon-right-arrow"></i>
                      </Link>
                    </div>
                    <div className="overlay_content">
                      <h2>
                        <a href="#">Reliability</a>
                      </h2>
                      <p>We ensure reliability by delivering consistent, high-quality results you can count on</p>
                    </div>
                  </div>
                </div>
                <div className="mr_bottom_20"></div>
              </div>
            </div>
          </div>
          <div className="pd_bottom_70"></div>
        </section>

        <section className="project-section bg_dark_3">
          <div className="pd_top_85"></div>
          <div className="container-fluid pd_zero">
            <div className="title_all_box style_one text-center dark_color">
              <div className="title_sections text-white">

                <h2 className="text-white">Our Solutions</h2>
                <p>We deliver the highest quality of work, on time, everytime.</p>
              </div>
            </div>

            <Swiper
              slidesPerView={1}
              spaceBetween={40}
              grabCursor={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: true,
              }}
              loop
              breakpoints={{
                680: {
                  slidesPerView: 2
                },
                1000: {
                  slidesPerView: 3
                },
                1366: {
                  slidesPerView: 4,
                },
              }}

              modules={[Autoplay]}
              className="mySwiper m-5"
            >

              {
                homePageData?.solution?.map((ele, ind) =>
                  <SwiperSlide key={ind} >
                    <div >
                      <div className="project_post style_seven">
                        <div className="image_box">
                          <img src={ele.solution_image} className="img-fluid" alt="img" />
                        </div>
                        <div className="content_box">
                          <h2 className="title_pro"><Link href={`/solution/${ele.solution_slug}`} rel="bookmark" style={{ color: "white" }}>{ele.solution_name}</Link></h2>
                          <a className="quote-btn" href="#">Get A Quote</a>
                          <div className="image_zoom_box ">
                            <Link href={`/solution/${ele.solution_slug}`} data-fancybox="gallery" ><span
                              className="fa fa-plus zoom_icon" style={{ color: "white" }}></span></Link>
                          </div>
                        </div>
                        <div className="overlay ">
                          <Link href={`/solution/${ele.solution_slug}`}>
                            <div className="text d-flex flex-column justify-content-center">
                              <h2 className="title_pro"><Link href={`/solution/${ele.solution_slug}`} rel="bookmark">{ele.solution_name}</Link></h2>
                              <p className="short_desc">{ele.content}</p>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                )
              }

            </Swiper>
          </div>
          <div className="pd_bottom_65"></div>
        </section>

        <section className="about-section">
          <div className="pd_top_85"></div>
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-12 col-md-12 mb-sm-5 mb-md-5 mb-lg-5 mb-xl-0">
                <div className="image_boxes style_seven">
                  <div className="image_box">
                    <img
                      src={homePageData?.why_choose_us?.image}
                      className="img-fluid height_600px object-fit-cover"
                      alt="about"
                    />

                    <div className="experience">
                      <div className="experience_inner">
                        <h2> 25+ Years Of Experience </h2>
                      </div>
                    </div>
                  </div>
                  <div className="pattern_imag">
                    <img src="/assets/images/pattern-n1.png" alt="img" />
                  </div>
                </div>
              </div>

              <div className="col-xl-5 col-lg-9 col-md-11 offset-1">
                <div className="title_all_box style_one dark_color">
                  <div className="title_sections left">
                    <div className="before_title">Why Choose Us</div>
                    <h2>{homePageData?.why_choose_us?.heading}</h2>

                    <div className="description_box" dangerouslySetInnerHTML={{ __html: homePageData?.why_choose_us?.description || '' }}></div>
                  </div>
                </div>

                <div className="pd_top_20"></div>
                <div className="tabs_all_box tabs_all_box_start type_three">
                  <div className="tab_over_all_box">
                    <div className="tabs_header clearfix">
                      <ul className="showcase_tabs_btns nav-pills nav clearfix">
                        <li className="nav-item">
                          <a
                            className={`s_tab_btn nav-link ${activeTab === 1 ? 'active' : ''}`}
                            onClick={() => handleTabClick(1)}
                          >
                            Mission
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={`s_tab_btn nav-link ${activeTab === 2 ? 'active' : ''}`}
                            onClick={() => handleTabClick(2)}
                          >
                            Vision
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={`s_tab_btn nav-link ${activeTab === 3 ? 'active' : ''}`}
                            onClick={() => handleTabClick(3)}
                          >
                            Values
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className="s_tab_wrapper">
                      <div className="s_tabs_content">
                        <div className={`s_tab fade ${activeTab === 1 ? 'active-tab show' : ''}`} id="tabtabone">
                          <div className="tab_content one">
                            <div className="content_bx">
                              <p>
                                {homePageData?.why_choose_us?.mission_content}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className={`s_tab fade ${activeTab === 2 ? 'active-tab show' : ''}`} id="tabtabtwo">
                          <div className="tab_content one">
                            <div className="content_bx">
                              <p>
                                {homePageData?.why_choose_us?.vision_content}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className={`s_tab fade ${activeTab === 3 ? 'active-tab show' : ''}`} id="tabtabthree">
                          <div className="tab_content one">
                            <div className="content_bx">
                              <p>
                                {homePageData?.why_choose_us?.values_content}
                              </p>
                            </div>
                          </div>
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

        <section className="content-section">
          <div className="pd_top_50"></div>
          <div className="auto-container">
            <div className="row">
              <div className="col-lg-8 m-auto">
                <div className="title_all_box style_six text-center">
                  <div className="title_sections">

                    <div className="title">Our Expertise</div>
                    <p className="description_text">We deliver the highest quality of work, on time, everytime.
                    </p>
                  </div>
                  <div className="pd_bottom_20"></div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                <div className="choose_box  type_one">
                  <div className="image_box">
                    <img src={homePageData?.our_expertise?.icon1} className="img-fluid svg_image" alt="icon png" />
                  </div>
                  <div className="content_box">
                    <span className="step_no">01</span>
                    <div className="text_box">
                      <h2>
                        <a href="#">
                          {homePageData?.our_expertise?.subheading1} </a>
                      </h2>
                      <p>{homePageData?.our_expertise?.content1}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                <div className="choose_box  type_one">
                  <div className="image_box">
                    <img src={homePageData?.our_expertise?.icon2} className="img-fluid svg_image" alt="icon png" />
                  </div>
                  <div className="content_box">
                    <span className="step_no">02</span>
                    <div className="text_box">
                      <h2>
                        <a href="#">
                          {homePageData?.our_expertise?.subheading2} </a>
                      </h2>
                      <p>{homePageData?.our_expertise?.content2}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                <div className="choose_box  type_one">
                  <div className="image_box">
                    <img src={homePageData?.our_expertise?.icon3} className="img-fluid svg_image" alt="icon png" />
                  </div>
                  <div className="content_box">
                    <span className="step_no">03</span>
                    <div className="text_box">
                      <h2>
                        <a href="#">
                          {homePageData?.our_expertise?.subheading3} </a>
                      </h2>
                      <p>{homePageData?.our_expertise?.content3}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                <div className="choose_box  type_one">
                  <div className="image_box">
                    <img src={homePageData?.our_expertise?.icon4} className="img-fluid svg_image" alt="icon png" />
                  </div>
                  <div className="content_box">
                    <span className="step_no">04</span>
                    <div className="text_box">
                      <h2>
                        <a href="#">
                          {homePageData?.our_expertise?.subheading4} </a>
                      </h2>
                      <p>{homePageData?.our_expertise?.content4}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className="pd_bottom_65"></div>
        </section>

        <section className="contact-client-carousel-section">
          <div className="row">
            <div className="col-xxl-5 col-xl-5 col-lg-12 bg_op_1"
              style={{ background: "url(/assets/images/testimonialbg.jpg)" }}>
              <div className="videobtns text-center d-flex align-items-center flex-column justify-content-center">
                <h4 className="color_white">How can we help you?</h4>
                <h5 className="color_white">+91 - 8743877462</h5>
                <div className="pd_top_100"></div>
              </div>
            </div>
            <div className="col-xl-7 col-lg-7 col-md-12 bg_op_1"
              style={{ backgroundImage: "url(/assets/images/home-12-testi.jpg)" }}>
              <div className="pd_top_90"></div>
              <div className="row">
                <div className="col-lg-1"></div>
                <div className="col-lg-9 col-md-12">
                  <div className="client-brand-wrapper">
                    <div className="title_all_box style_one light_color">
                      <div className="title_sections left">
                        <h2>Your Success, Our Priority</h2>
                        <p>We provide expert financial services designed to help your business grow. From tax compliance to virtual CFO services, our solutions are crafted to meet your goals and ensure long-term success.</p>
                      </div>
                    </div>
                    {/* <div className="pd_bottom_15"></div>
                    <div className="software-div">
                      <img src="assets/images/softwares/1.png" alt="softwares" />
                    </div>
                    <div className="pd_bottom_40"></div>
                    <div className="software-div">
                      <img src="assets/images/softwares/2.png" alt="softwares" />
                    </div> */}
                  </div>
                </div>
                <div className="col-lg-2"></div>
              </div>
              <div className="pd_bottom_60"></div>
            </div>
          </div>
        </section>


        <section className="tab-section bg_op_1" style={{ backgroundImage: "url(assets/images/tab-sec-bg.jpg)" }}>
          <div className="pd_top_100"></div>
          <div className="container">
            <div className="row">
              <div className="tabs_all_box  tabs_all_box_start type_one">
                <div className="tab_over_all_box">
                  <div className="tabs_header clearfix">
                    <ul className="showcase_tabs_btns nav-pills nav   clearfix">
                      <li className="nav-item">
                        <a className={`s_tab_btn nav-link ${tabId == 1 ? "active" : ""}`} onClick={() => handleTabId(1)}>01. Affordable</a>
                      </li>
                      <li className="nav-item">
                        <a className={`s_tab_btn nav-link ${tabId == 2 ? "active" : ""}`} onClick={() => handleTabId(2)}>02. Knowledge</a>
                      </li>
                      <li className="nav-item">
                        <a className={`s_tab_btn nav-link ${tabId == 3 ? "active" : ""}`} onClick={() => handleTabId(3)}>03. Saves Time</a>
                      </li>
                      <li className="nav-item">
                        <a className={`s_tab_btn nav-link ${tabId == 4 ? "active" : ""}`} onClick={() => handleTabId(4)}>04. Fast &amp; Quality</a>
                      </li>
                      <li className="nav-item">
                        <a className={`s_tab_btn nav-link ${tabId == 5 ? "active" : ""}`} onClick={() => handleTabId(5)}>05. Experienced</a>
                      </li>
                    </ul>
                    <div className="toll_free">
                      <a href="tel:+916398798204"> <i className="icon-phone-call"></i>Call For Free
                        Consultation</a>
                    </div>
                  </div>
                  <div className="s_tab_wrapper">
                    <div className="s_tabs_content">
                      <div className={tabId == 1 ? "s_tab fade active-tab show" : "s_tab fade"} id="tabtabone">
                        <div className="tab_content one"
                          style={{ backgroundImage: "url(assets/images/tab-image.jpg)" }}>
                          <div className="content_image">
                            <h6>Why Ozark</h6>

                            <h2>Affordable &amp; Flexible</h2>

                            <p>At Ozark & Co., we offer financial solutions that are both affordable and flexible, ensuring that businesses of all sizes can access the support they need without breaking the bank.</p>

                            {/* <a href="#" target="_blank" rel="nofollow" className="rd_more">Read More <i
                              className="icon-right-arrow"></i></a> */}
                          </div>
                        </div>
                      </div>
                      <div className={tabId == 2 ? "s_tab fade active-tab show" : "s_tab fade"} id="tabtabtwo">
                        <div className="tab_content one"
                          style={{ backgroundImage: "url(/assets/images/blog/blog-image-8.jpg)" }}>
                          <div className="content_image">
                            <h6>Why Knowledge Matters</h6>

                            <h2>Expertise &amp; Innovation</h2>

                            <p>At Knowledge Inc., we pride ourselves on delivering solutions driven by deep expertise and innovative thinking, empowering organizations to achieve their goals with clarity and confidence.</p>

                          </div>
                        </div>
                      </div>
                      <div className={tabId == 3 ? "s_tab fade active-tab show" : "s_tab fade"} id="tabtabthree">
                        <div className="tab_content one"
                          style={{ backgroundImage: "url(/assets/images/about/about-4.jpg)" }}>
                          <div className="content_image">
                            <h6>Why Save Time</h6>

                            <h2>Efficient &amp; Reliable</h2>

                            <p>At SaveTime Solutions, we focus on streamlining processes and reducing inefficiencies,
                              helping you achieve your goals faster while maintaining top-notch quality and reliability.</p>

                          </div>
                        </div>
                      </div>
                      <div className={tabId == 4 ? "s_tab fade active-tab show" : "s_tab fade"} id="tabtabtfour">
                        <div className="tab_content one"
                          style={{ backgroundImage: "url(/assets/images/about/about-2.jpg)" }}>
                          <div className="content_image">
                            <h6>Excellence at Speed</h6>

                            <h2>Fast &amp; High-Quality Solutions</h2>

                            <p>Our approach combines rapid delivery with uncompromising quality, ensuring your projects are completed on time and exceed expectations every step of the way.</p>

                          </div>
                        </div>
                      </div>
                      <div className={tabId == 5 ? "s_tab fade active-tab show" : "s_tab fade"} id="tabtabfive">
                        <div className="tab_content one"
                          style={{ backgroundImage: "url(/assets/images/about/about-3.jpg)" }}>
                          <div className="content_image">
                            <h6>The Power of Experience</h6>
                            <h2>Expertise You Can Trust</h2>
                            <p>With years of proven experience, we bring deep knowledge and reliable solutions to every project, ensuring consistent excellence and satisfaction for our clients.</p>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pd_bottom_90"></div>
        </section>

        <section className="testimonial-section pd_left_100 pd_right_100">
          <div className="pd_top_85"></div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="title_all_box style_two text-center dark_color">
                  <div className="title_sections two">

                    <h2>Customers Experience</h2>
                  </div>
                  <div className="mr_bottom_20"></div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 m-auto">
                <div className="testimonial_sec dark_color style_two">
                  <div
                    className="swiper single_swiper swiper-initialized swiper-horizontal swiper-backface-hidden">
                    <div>
                      {
                        homePageData?.testimonial?.length > 0 && (
                          <Swiper
                            slidesPerView={1}
                            spaceBetween={30}
                            navigation={true}
                            modules={[Navigation]}
                            className="mySwiper"
                            initialSlide={1}
                            centeredSlides={true}
                            loop
                            breakpoints={{
                              1000: {
                                slidesPerView: 2
                              },
                              1366: {
                                slidesPerView: 3,
                              },
                            }}
                          >

                            {
                              homePageData?.testimonial?.map((ele, ind) =>
                                <SwiperSlide key={ind}>
                                  <div className="testimonial_box">
                                    <div className="authour_image">
                                      <i className="icon-quote"></i>
                                      <img src={ele.image} alt="image" />
                                    </div>
                                    <div className="c_content">
                                      <div className="content_in">
                                        <h4>{ele.name}</h4>
                                        <span>{ele.designation}</span>
                                      </div>
                                    </div>
                                    <div className="pd_bottom_20"></div>
                                    <div className="comment">
                                      {ele.content}
                                    </div>
                                    <div className="rating">
                                      <ul>
                                        <li>
                                          {
                                            [1, 2, 3, 4, 5].map((e, i) => (
                                              ele.rating >= e ? <span className="fa fa-star fill" key={i}></span> : <span
                                                className="fa fa-star empty" key={i}></span>
                                            ))
                                          }
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </SwiperSlide>)
                            }
                          </Swiper>
                        )
                      }
                    </div>

                  </div>


                  <div
                    className="swiper single_swiper_tab swiper-initialized swiper-horizontal swiper-free-mode swiper-watch-progress swiper-backface-hidden swiper-thumbs">
                    <div className="swiper-wrapper" id="swiper-wrapper-dadfd711360e46e9" aria-live="polite"
                      style={{ transform: "translate3d(0px, 0px, 0px)", transitionDuration: "0ms" }}>

                    </div>

                    <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className="pd_bottom_80"></div>
        </section>

        <section className="blog-post" id="blog" style={{ backgroundColor: "#f7f7f7" }}>
          <div className="pd_top_80"></div>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 m-auto">
                <div className="title_all_box style_six text-center  dark_color">
                  <div className="title_sections">
                    <h2>Latest Blogs</h2>

                  </div>
                </div>
                <div className="pd_bottom_10"></div>
              </div>
            </div>
            <div className="blog_all_styles grid ">


              <div className="row">

                {
                  homePageData?.blogs?.map((ele, ind) => <div key={ind} className="col-xl-4 col-md-6 col-sm-6  col-xs-12">

                    <div className="news_box type_one clearfix">
                      <div className="news_inner">
                        <div className="image_box">
                          <img src={ele.main_image} className="img-fluid" alt="img" />
                          <div className="overlay"></div>
                          {/* <div className="post-category">
                          <a href="blog-single.html" className="categories">
                            <i className="icon-folder"></i>
                            Compliance Audits
                          </a>
                        </div> */}
                        </div>
                        <div className="content_box">
                          <ul className="post-info clearfix">

                            <li className="date">
                              <Link href={`/blogs/${ele.slug}`}>
                                <span className="icon-calendar me-2"></span>
                                <DateFormatter Date={ele.blog_date} />
                              </Link>
                            </li>
                          </ul>
                          <h2 className="entry-title" style={{ height: "110px", display: "flex", alignItems: "center" }}><Link href={`/blogs/${ele.slug}`}>{ele.heading}</Link></h2>
                          <p className="short_desc">{ele.content.substring(0, 90)}...</p>
                          <div className="bottom_content clearfix">
                            <div className="continure_reading">
                              <Link href={`/blogs/${ele.slug}`} className="read_more type_one">
                                Continue Reading <span className="icon-arrow-right"></span></Link>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>

                  </div>)
                }

              </div>
            </div>
          </div>
          <div className="pd_bottom_70"></div>
        </section>


        <section className="banner-section bg_op_1" style={{ backgroundImage: "url(/assets/images/sliders/banner-9.jpg)" }}>
          <div className="pd_top_100"></div>
          <div className="auto-container">
            <div className="row align-items-center">
              <div className="col-xl-7 col-lg-6 col-md-12">
                <div className="title_all_box style_one dark_color">
                  <div className="title_sections">
                    <div className="before_title">Solutions for your business</div>
                    <h2 className="title_big">Have Questions? We're Here to Help!</h2>
                    <p>Have questions or need assistance? Our team is here to help with answers, guidance, and support. Reach out today, and we’ll ensure you get the solutions you need.</p>
                  </div>
                </div>
                <div className="pd_bottom_20"></div>
                <div className="theme_btn_all color_one">
                  {/* <a href="#" target="_blank" rel="nofollow" className="theme-btn one">Enroll Now</a> */}
                </div>
                <div className="pd_bottom_40"></div>
              </div>
              <div className="col-xl-1 hidden-lg"></div>
              <div className="col-xl-4 col-lg-6 col-md-12">
                <div className="contact_form_box_all type_five">
                  <div className="contact_form_box_inner simple_form">
                    <div className="title_all_box style_one dark_color">
                      <div className="title_sections">
                        <div className="before_title">We here to help you</div>
                        <h6 className="font_24">Book Appointment</h6>
                      </div>
                    </div>
                    <div className="pd_bottom_10"></div>
                    <div className="contact_form_shortcode">
                    </div>
                    <form>
                      <p>
                        <label>
                          <input type="text" name="your-name" size="40" placeholder="Enter Your Name"  {...register("name", {
                            required: {
                              value: true,
                              message: "Name is required"
                            }
                          })} style={errors.name ? { borderColor: "red" } : {}} />
                          <br />
                          <i className="fa fa-user"></i>
                        </label>

                      </p>
                      {errors.name && (
                        <p style={{ color: "red", marginTop: "-25px" }}>{errors.name.message}</p>
                      )}
                      <p>
                        <label>
                          <input type="email" name="your-email" size="40" placeholder="Enter Your Email" {...register("email", {
                            required: {
                              value: true,
                              message: "Email is required"
                            },
                            pattern: {
                              value: /^\S+@\S+\.\S+$/,
                              message: "Invalid Email"
                            }
                          })} style={errors.email ? { borderColor: "red" } : {}} />
                          <br />
                          <i className="fa fa-envelope"></i>
                        </label>
                      </p>
                      {errors.email && (
                        <p style={{ color: "red", marginTop: "-25px" }}>{errors.email.message}</p>
                      )}
                      <p>
                        <label>
                          <input type="text" name="your-subject" size="40" placeholder="Enter Your Subject" />
                          <br />
                          <i className="fa fa-folder"></i>
                        </label>

                        <input type="submit" onClick={handleSubmit(onSubmit)} disabled={isSubmitting} value={isSubmitting ? "Sending..." : "Submit"} style={isSubmitting ? { opacity: "0.5" } : {}} />
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pd_bottom_100"></div>
        </section>
      </div >
    </>

  );
}
