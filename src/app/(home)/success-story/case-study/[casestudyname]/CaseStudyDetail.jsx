"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import api from '@/_config/config';
import { usePathname } from 'next/navigation';
import Loader from '@/_components/Loader';



function CaseStudyDetail() {

   const pathname = usePathname();
   const slug = pathname.split("/")[3]
   const [data, setData] = useState();
   const [latestCaseStudy, setLatestCaseStudy] = useState();
   const [loading,setLoading] = useState(true);

   useEffect(() => {
      getCaseStudyData();
      getLatestCaseStudy()
   }, []);

   const getCaseStudyData = async (req, res) => {
      try {
         const res = await api.post("/case_study/get_case_study_by_slug", {
            slug: slug
         })

         setData(res.data.data);
         setLoading(false);
      } catch (err) {
         console.log(err);
      }
   }
   const getLatestCaseStudy = async () => {
      try {
         const res = await api.get("/case_study/get_latest_case_study");
         setLatestCaseStudy(res.data.data);
      } catch (err) {
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
                                 {data?.heading}
                              </h1>
                           </div>
                        </div>
                        <div className="col-lg-12">
                           <div className="breadcrumbs creote">
                              <ul className="breadcrumb m-auto">
                                 <li><Link href="/">Home</Link></li>
                                 <li><Link href="/success-story/case-study">Case Study</Link></li>
                                 <li className="active">{data?.heading}</li>
                              </ul>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div id="content" className="site-content ">
               <div className="auto-container">
                  <div className="row default_row">
                     <aside id="secondary" className="widget-area all_side_bar col-lg-4 col-md-12 col-sm-12">
                        <div className="side_bar">
                           <div className="pd_top_90"></div>

                           {/* <div className="widgets_grid_box">
                              <h2 className="widget-title">Post Categories</h2>
                              <ul className="wp-block-categories">
                                 <li><a href="#">Leadership</a> (1)</li>
                                 <li><a href="#">Management</a> (5)</li>
                                 <li><a href="#">Compliance Audits</a> (5)</li>
                                 <li><a href="#">Employee Relations</a> (8)</li>
                                 <li><a href="#">Corporate</a> (1)</li>
                                 <li><a href="#">HR Consulting</a> (7)</li>
                                 <li><a href="#">Business Skills</a> (1)</li>
                                 <li><a href="#">Recruiting</a> (6)</li>
                                 <li><a href="#">Small Business HR</a> (7)</li>
                                 <li><a href="#">Sustainability</a> (1)</li>
                              </ul>
                           </div> */}
                           <div className="widgets_grid_box">
                              <h2 className="widget-title">Recent Posts</h2>
                              <div className="widget_post_box">

                                 {
                                    latestCaseStudy?.map((ele, ind) =>
                                       <div className="blog_in clearfix image_in" key={ind}>
                                          <div className="image">
                                             <img decoding="async" src={ele.image} alt="img" />
                                          </div>
                                          <div className="content_inner">
                                             {/* <p className="post-date"><span className="icon-calendar"></span>
                                                            {ele.blog_date}</p> */}
                                             <h3><Link href={`/success-story/case-study/${ele.slug}`}>{ele.heading}</Link></h3>
                                          </div>
                                       </div>
                                    )
                                 }

                              </div>
                           </div>

                           <div className="pd_bottom_70"></div>
                        </div>
                     </aside>
                     <div id="primary" className="content-area service col-lg-8 col-md-12 col-sm-12 col-xs-12">
                        <main id="main" className="site-main" role="main">
                           <div className="pd_top_90"></div>
                           <section className="blog_single_details_outer">
                              <div className="single_content_upper">
                                 <div className="blog_feature_image">
                                    <img src={data?.image} className="wp-post-image" alt="img" />
                                 </div>
                                 <div className="pd_bottom_20"></div>
                                 <div className="post_single_content">
                                    <h2>{data?.heading}</h2>
                                    <div className="pd_bottom_15"></div>

                                    <div dangerouslySetInnerHTML={{ __html: data?.description || '' }}>
                                    </div>
                                    {/* <div className="description_box">
                                       <div className="pd_bottom_15"></div>
                                       <div className="row gutter_30px">
                                          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-5 mb-lg-5 mb-xl-0">
                                             <div className="simple_image_boxes" style={{height:"100%",maxHeight:"390px"}}>
                                                <img src={data?.image1} className="simp_img img-fluid height_540px" alt="image" />
                                             </div>
                                             <div className="pd_bottom_30"></div>
                                          </div>
                                          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                             <div className="simple_image_boxes">
                                                <img src={data?.image2} className="simp_img img-fluid height_260" alt="image" />
                                             </div>
                                             <div className="pd_bottom_30"></div>
                                             <div className="simple_image_boxes ">
                                                <img src={data?.image3} className="simp_img img-fluid height_250px" alt="image" />
                                             </div>
                                          </div>
                                       </div>
                                       <div className="invisible_normal_spacing"></div>
                                       <div className="description_box" dangerouslySetInnerHTML={{ __html: data?.description2 || ''}}>
                                          
                                       </div>
                                    </div> */}
                                 </div>

                                 {/* <div className="related_post">

                                    <div className="title_sections_inner">
                                       <h2>Related Posts</h2>
                                    </div>


                                    <div className="swiper-container swiper-initialized swiper-horizontal swiper-backface-hidden" data-swiper="{
                                       &quot;loop&quot;: true,
                                       &quot;autoplay&quot;: {
                                         &quot;delay&quot;: 5000
                                       },
                                       &quot;speed&quot;: 1000,
                                       &quot;centeredSlides&quot;: false,
                                       &quot;slidesPerView&quot;: 2,
                                       &quot;spaceBetween&quot;: 30,
                                       &quot;pagination&quot;: {
                                         &quot;el&quot;: &quot;.swiper-pagination&quot;,
                                         &quot;clickable&quot;: true
                                       },
                                       &quot;navigation&quot;: {
                                         &quot;nextEl&quot;: &quot;.related-button-next&quot;,
                                         &quot;prevEl&quot;: &quot;.related-button-prev&quot;
                                       },
                                       &quot;breakpoints&quot;: {
                                          &quot;1200&quot;: {
                                             &quot;slidesPerView&quot;: 2 
                                            },
                                          &quot;1024&quot;: {
                                           &quot;slidesPerView&quot;: 2 
                                          },
                                         &quot;768&quot;: {
                                           &quot;slidesPerView&quot;: 2 
                                         },
                                         &quot;576&quot;: {
                                           &quot;slidesPerView&quot;: 1 
                                         }
                                       }
                                     }">
                                       <div className="swiper-wrapper" id="swiper-wrapper-35a3bd1034caeeef2" aria-live="off" style={{ transitionDuration: "0ms", transform: "translate3d(-387px, 0px, 0px)" }}>
                                          <div className="swiper-slide swiper-slide-prev" role="group" aria-label="1 / 3" data-swiper-slide-index="0" style={{ width: "357px", marginRight: "30px" }}>
                                             <div className="news_box default_style list_view normal_view clearfix has_images">
                                                <div className="image img_hover-1">
                                                   <img src="/assets/images/blog/blog-image-7.jpg" className="img-fluid" alt="img" />
                                                   <a href="#" className="categories">
                                                      <i className="icon-folder"></i>Compliance Audits
                                                   </a>
                                                </div>
                                                <div className="content_box">
                                                   <div className="date">
                                                      <span className="date_in_number">October 8, 2023</span>
                                                   </div>
                                                   <div className="source">
                                                      <h2 className="title"><a href="#" rel="bookmark">How to
                                                         Handle Employee</a></h2>
                                                      <p className="short_desc">How well this mistaken ideas off denouncing
                                                         pleasure &amp; praisings will give you complete.</p>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                          <div className="swiper-slide swiper-slide-active" role="group" aria-label="2 / 3" data-swiper-slide-index="1" style={{ width: "357px", marginRight: "30px" }}>
                                             <div className="news_box default_style list_view normal_view clearfix has_images">
                                                <div className="image img_hover-1">
                                                   <img width="750" height="420" src="/assets/images/blog/blog-image-6.jpg" className="img-fluid" alt="img" />
                                                   <a href="#" className="categories">
                                                      <i className="icon-folder"></i>Coaching
                                                   </a>
                                                </div>
                                                <div className="content_box">
                                                   <div className="date">
                                                      <span className="date_in_number">October 8, 2023</span>
                                                   </div>
                                                   <div className="source">
                                                      <h2 className="title"><a href="#" rel="bookmark">Retaining
                                                         Good Employees &amp; Motivated</a></h2>
                                                      <p className="short_desc">How well this mistaken ideas off denouncing
                                                         pleasure &amp; praisings will give you complete.</p>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                          <div className="swiper-slide swiper-slide-next" role="group" aria-label="3 / 3" data-swiper-slide-index="2" style={{ width: "357px", marginRight: "30px" }}>
                                             <div className="news_box default_style list_view normal_view clearfix has_images">
                                                <div className="image img_hover-1">
                                                   <img width="750" height="420" src="/assets/images/blog/blog-image-9.jpg" className="img-fluid" alt="img" />
                                                   <a href="#" className="categories">
                                                      <i className="icon-folder"></i>Coaching
                                                   </a>
                                                </div>
                                                <div className="content_box">
                                                   <div className="date">
                                                      <span className="date_in_number">October 8, 2023</span>
                                                   </div>
                                                   <div className="source">
                                                      <h2 className="title"><a href="#" rel="bookmark">Why Should
                                                         Business Payroll Outsourcing?</a></h2>
                                                      <p className="short_desc">How well this mistaken ideas off denouncing
                                                         pleasure &amp; praisings will give you complete.</p>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>

                                       </div>

                                       <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>
                                    <div className="arrow_related">
                                       <div className="related-button-prev" tabIndex="0" role="button" aria-label="Previous slide" aria-controls="swiper-wrapper-35a3bd1034caeeef2">
                                          <i className="fa fa-angle-left"></i>
                                       </div>
                                       <div className="related-button-next" tabIndex="0" role="button" aria-label="Next slide" aria-controls="swiper-wrapper-35a3bd1034caeeef2">
                                          <i className="fa fa-angle-right"></i>
                                       </div>
                                    </div>

                                 </div> */}
                              </div>
                           </section>
                           <div className="pd_bottom_70"></div>
                        </main>
                     </div>

                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default CaseStudyDetail