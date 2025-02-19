"use client"

import Loader from '@/_components/Loader';
import api from '@/_config/config';
import DateFormatter from '@/_utils/DateFormatter';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'


function BlogList() {

    const [blogList, setBlogList] = useState();
    const [allBlog, setAllBlog] = useState();
    const [latestBlog, setBlogLatest] = useState();
    const [solutionList, setSolutionList] = useState();
    const [activeBlogFilter, setActiveBlogFilter] = useState(1);
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        getAllBlog();
        getLatestBlogs();
        getSolutionList();
    }, []);

    const getAllBlog = async () => {
        try {
            const res = await api.get("/blog/get_all_active_blogs");
            setBlogList(res.data.data);
            setAllBlog(res.data.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    }
    const getLatestBlogs = async () => {
        try {
            const res = await api.get("/blog/get_latest_blogs");
            setBlogLatest(res.data.data);
        } catch (err) {
            console.log(err);
        }
    }

    const getSolutionList = async () => {
        try {
            const res = await api.get("/solution/get_solution_list");
            setSolutionList(res.data.data);
        } catch (err) {
            console.log(err);
        }
    }


    const filterBlogs = (e,id) => {
        e.preventDefault()
        if (id == 1) {
            setBlogList(allBlog);
            setActiveBlogFilter(id);
            return;
        }
        const filteredBlogs = allBlog?.filter((ele) => ele.solution_id == id);
        setBlogList(filteredBlogs);
        setActiveBlogFilter(id);
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
                                            Blogs
                                        </h1>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="breadcrumbs creote">
                                        <ul className="breadcrumb m-auto">
                                            <li><Link href="/">Home</Link></li>
                                            <li className="active">Blogs</li>
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

                                    <div className="widgets_grid_box">
                                        <h2 className="widget-title">Post Categories</h2>
                                        <ul className="wp-block-categories">
                                            <li><a href="#" onClick={(e) => filterBlogs(e,1)} style={activeBlogFilter == 1 ? {
                                                color: "#078586"
                                            } : {}}>All blogs</a></li>
                                            {
                                                solutionList?.map((ele, ind) =>
                                                    <li key={ind}><a href="#" onClick={(e) => filterBlogs(e,ele._id)} style={activeBlogFilter == ele._id ? {
                                                        color: "#078586"
                                                    } : {}}>{ele.solution_name}</a> </li>)
                                            }
                                        </ul>
                                    </div>

                                    <div className="widgets_grid_box">
                                        <h2 className="widget-title">Recent Posts</h2>
                                        <div className="widget_post_box">

                                            {
                                                latestBlog?.map((ele, ind) =>
                                                    <div className="blog_in clearfix image_in" key={ind}>
                                                        <div className="image">
                                                            <img decoding="async" src={ele.main_image} alt="img" />
                                                        </div>
                                                        <div className="content_inner">
                                                            <p className="post-date"><span className="icon-calendar"></span><DateFormatter Date={ele.blog_date}/></p>
                                                            <h3><Link href={`/blogs/${ele.slug}`}>{ele.heading}</Link></h3>
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
                                <div className="pd_top_90"></div>
                                <main id="main" className="site-main" role="main">

                                    <article id="" className="clearfix service type-service status-publish has-post-thumbnail hentry">
                                        <div className="row grid_layout" >

                                            {
                                                blogList?.map((ele, ind) =>
                                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 grid_box" key={ind}>
                                                        <div className="news_box type_one clearfix">
                                                            <div className="news_inner">
                                                                <div className="image_box">
                                                                    <img src={ele.main_image} className="img-fluid" alt="img" />
                                                                    <div className="overlay"></div>

                                                                </div>
                                                                <div className="content_box">
                                                                    <ul className="post-info clearfix">

                                                                        <li className="date">
                                                                            
                                                                                <span className="icon-calendar me-2"></span>
                                                                                <DateFormatter Date={ele.blog_date}/>
                                                                        </li>
                                                                    </ul>
                                                                    <h2 className="entry-title"><Link href={`/blogs/${ele.slug}`} style={{ height: "105px",display:"flex",alignItems:"center" }}>{ele.heading}</Link></h2>
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
                                    </article>
                                </main>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pd_bottom_70"></div>
            </div>
        </>
    )
}

export default BlogList