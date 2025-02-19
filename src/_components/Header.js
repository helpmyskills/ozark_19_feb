"use client"

import api from '@/_config/config';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function Header() {

    const [solutionList, setSolutionList] = useState();
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const res = await api.get("/solution/get_solution_list");
            setSolutionList(res.data.data);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>

            <div className="header_area" id="header_contents" onContextMenu={(e) => {
        e.preventDefault();
      }}>

                <section className="header header_default style_five get_sticky_header ">
                    <div className="navbar d-xl-none d-md-none" id="myTopnav">
                        <div className="mob-logo-box"> <Link href="/" className="logo navbar-brand"> <img src="/assets/images/logo.png" alt="Ozark Logo" className="logo_default" /> </Link> </div>
                        <label htmlFor="togglericon" className="toggler" checked></label>
                        <input type="checkbox" id="togglericon" className="toggler" onClick={() => setToggle(!toggle)} />
                        <div className={`nav at-right ${toggle ? "navigation-visible" : ""}`}>
                            <div className="dropdown">
                                <label htmlFor="toggle-1">Solutions</label>
                                <input type="checkbox" id="toggle-1" />
                                <ul>
                                    {
                                        solutionList?.map((ele, ind) => <li key={ind}><Link href={`/solution/${ele.solution_slug}`} onClick={() => setToggle(!toggle)}>{ele.solution_name}</Link></li>)
                                    }
                                </ul>
                            </div>
                            <div className="dropdown">
                                <label htmlFor="toggle-2">About Us</label>
                                <input type="checkbox" id="toggle-2" />
                                <ul>
                                    <li><Link href="/about/our-story" onClick={() => setToggle(!toggle)}>Our Story</Link></li>
                                    <li><Link href="/about/our-team" onClick={() => setToggle(!toggle)}>Leadership Team</Link></li>
                                    <li><Link href="/about/vision-and-value" onClick={() => setToggle(!toggle)}>Vision & Value</Link></li>
                                </ul>
                            </div>
                            <div className="dropdown">
                                <label htmlFor="toggle-3">Success Story</label>
                                <input type="checkbox" id="toggle-3" />
                                <ul>
                                    <li><Link href="/success-story/client-testimonial" onClick={() => setToggle(!toggle)}>Client Testimonials</Link></li>
                                    <li><Link href="/success-story/case-study" onClick={() => setToggle(!toggle)}>Case Study</Link></li>
                                </ul>
                            </div>
                            <div className="dropdown">
                                <label htmlFor="toggle-4">Contact</label>
                                <input type="checkbox" id="toggle-4" />
                                <ul>
                                    <li><Link href="/contact/contact-us" onClick={() => setToggle(!toggle)}>Contact us</Link></li>
                                    <li><Link href="/contact/faqs" onClick={() => setToggle(!toggle)}>FAQs</Link></li>
                                </ul>
                            </div>
                            <div className="dropdown">
                                <label htmlFor="toggle-5">Why Choose Us</label>
                                <input type="checkbox" id="toggle-5" />
                                <ul>
                                    <li><Link href="/why-choose-us/our-expertise" onClick={() => setToggle(!toggle)}>Our Expertise</Link></li>
                                </ul>
                            </div>

                            <div className="dropdown">
                                <label htmlFor="toggle-6">Resource</label>
                                <input type="checkbox" id="toggle-6" />
                                <ul>
                                    <li><Link href="/blogs" onClick={() => setToggle(!toggle)}>Blogs</Link></li>
                                </ul>
                            </div>

                            <Link href="/career" onClick={() => setToggle(!toggle)}>Careers</Link>
                            <Link href="/life-at-ozark" onClick={() => setToggle(!toggle)}>Life@Ozark</Link>
                        </div>
                    </div>

                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col-2 logo_column">
                                <div className="header_logo_box">
                                    <Link href="/" className="logo navbar-brand">
                                        <img src="/assets/images/logo.png" alt="Ozark Logo" className="logo_default" />
                                        {/* <img src="/assets/images/logo.png" alt="Ozark Logo" className="logo__sticky" /> */}
                                    </Link>
                                </div>
                            </div>
                            <div className="col-10 ">
                                <div className="header_content_collapse">



                                    <div className="header_menu_box">
                                        <div className="navigation_menu">
                                            <ul id="myNavbar" className="navbar_nav">
                                                <li
                                                    className="menu-item menu-item-has-children dropdown mega_menu nav-item">
                                                    <a href="#" className="dropdown-toggle nav-link"><span>Solutions</span>
                                                        <span className="fa fa-angle-down"></span>
                                                    </a>
                                                    <ul className="dropdown-menu width_60_percentage">

                                                        {
                                                            solutionList?.map((ele, ind) => <li key={ind}><Link href={`/solution/${ele.solution_slug}`} >{ele.solution_name}</Link></li>)
                                                        }
                                                    </ul>
                                                </li>

                                                <li
                                                    className="menu-item menu-item-has-children  mega_menu nav-item">
                                                    <a href="#" className="dropdown-toggle nav-link"><span>About Us</span>
                                                        <span className="fa fa-angle-down"></span>
                                                    </a>
                                                    <ul className="dropdown-menu width_60_percentage">


                                                        <ul>
                                                            <li><Link href="/about/our-story">Our Story </Link></li>
                                                            <li><Link href="/about/our-team">Leadership Team </Link></li>
                                                            {/* <li><Link href="#">Mission </Link></li> */}
                                                            <li><Link href="/about/vision-and-value">Vision & Values</Link></li>
                                                            {/* <li><Link href="#">Partners</Link></li>
                                                            <li><Link href="#">CSR </Link></li> */}
                                                        </ul>


                                                    </ul>
                                                </li>

                                                <li
                                                    className="menu-item menu-item-has-children mega_menu nav-item">
                                                    <a href="#" className="dropdown-toggle nav-link"><span>Success Stories</span>
                                                        <span className="fa fa-angle-down"></span>
                                                    </a>
                                                    <ul className="dropdown-menu width_60_percentage">
                                                        <ul>
                                                            <li><Link href="/success-story/client-testimonial">Client Testimonials</Link></li>
                                                            <li><Link href="/success-story/case-study">Case Studies</Link></li>
                                                            {/* <li><Link href="#">Industry-Specific Results </Link></li> */}
                                                        </ul>
                                                    </ul>
                                                </li>

                                                <li
                                                    className="menu-item menu-item-has-children  mega_menu nav-item">
                                                    <a href="#" className="dropdown-toggle nav-link"><span>Contact</span>
                                                        <span className="fa fa-angle-down"></span>
                                                    </a>
                                                    <ul className="dropdown-menu width_60_percentage">
                                                        <ul>
                                                            <li><Link href="/contact/contact-us">Contact us </Link></li>
                                                            {/* <li><Link href="#">Office Locations (UK, India)</Link></li> */}
                                                            <li><Link href="/contact/faqs">FAQs </Link></li>
                                                        </ul>
                                                    </ul>
                                                </li>

                                                <li
                                                    className="menu-item menu-item-has-children  mega_menu nav-item">
                                                    <a href="#" className="dropdown-toggle nav-link"><span>Why Choose Us</span>
                                                        <span className="fa fa-angle-down"></span>
                                                    </a>
                                                    <ul className="dropdown-menu width_60_percentage">
                                                        <ul>
                                                            <li><Link href="/why-choose-us/our-expertise">Our Expertise </Link></li>
                                                            {/* <li><Link href="#">Certifications </Link></li>
                                                            <li><Link href="#">Global Reach </Link></li>
                                                            <li><Link href="#">Client Satisfaction </Link></li>
                                                            <li><Link href="#">Team Approach</Link></li> */}
                                                        </ul>
                                                    </ul>
                                                </li>
                                                <li className="menu-item  nav-item"><Link className="dropdown-toggle nav-link"
                                                    href="/career">Careers</Link></li>
                                                <li
                                                    className="menu-item menu-item-has-children  mega_menu nav-item">
                                                    <a href="#" className="dropdown-toggle nav-link"><span>Resources</span>
                                                        <span className="fa fa-angle-down"></span></a>
                                                    <ul className="dropdown-menu width_60_percentage">
                                                        <ul>
                                                            <li><Link href="/blogs">Blogs</Link></li>
                                                            {/* <li><Link href="#">Whitepapers</Link></li>
                                                            <li><Link href="#">Guides </Link></li>
                                                            <li><Link href="#">Tax Season Checklist</Link></li> */}
                                                        </ul>
                                                    </ul>
                                                </li>

                                                <li className="menu-item  nav-item"><Link className="dropdown-toggle nav-link" href="/life-at-ozark">Life@ozark</Link></li>

                                            </ul>
                                        </div>
                                    </div>

                                    <div className="header_right_content d-none d-xl-block">
                                        <ul>
                                            <li>
                                                <Link href="/contact/contact-us" rel="nofollow" className="theme-btn gradient-btn"> Get A
                                                    Quote </Link>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </>
    )
}

export default Header