"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import api from '@/_config/config';


function Footer() {
    const [solutionList, setSolutionList] = useState();

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

            <div className="footer" onContextMenu={(e) => {
        e.preventDefault();
      }}>
                <div className="container footer-top">
                    <div className="row g-5">
                        <div className="col-12 col-md-6 col-lg-3 footer-about">
                            <div className="footer-contact pt-3 text-start d-flex flex-column">
                                <div className='d-flex align-items-center'>
                                    <img src="/assets/images/logo1.png" alt="Ozark Logo" className="logo_default" width={"50px"} /><img src="/assets/images/logo2.png" alt="Ozark Logo" className="logo_default" width={"170px"} />
                                </div>
                                <p className="info" style={{ marginLeft: "0.5rem" }}>Ozark provides financial services like bookkeeping, tax compliance, payroll, automation, and virtual CFO solutions.</p>
                            </div>

                            {/* <p className='info d-flex'>Social Share:
                                <Link href="#"><i className="bi bi-facebook"></i></Link>
                                <Link href="#"><i className="bi bi-twitter"></i></Link>
                                <Link href="#"><i className="bi bi-pinterest"></i></Link>
                                <Link href="#"><i className="bi bi-linkedin"></i></Link>
                            </p> */}
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 d-flex justify-content-lg-center">
                            <div>
                                <h4>Get a quote</h4>
                                <p className="info mb-0">Our phone numbers</p>
                                <p className='mb-0'>+91-8743877462</p>
                                <p className=''>+91-7982760010</p>

                                <p className="info mb-0">Our Location</p>
                                <p className='mb-0'>846/1, Ghitorni,</p>
                                <p>Nr. Metro Pillar-115, Delhi-110030</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 footer-links d-flex justify-content-lg-center">
                            <div>
                                <h4>Our Solutions</h4>
                                <ul>
                                    {
                                        solutionList?.map((ele, ind) =>
                                            <li key={ind} className='pb-0'><Link href={`/solution/${ele.solution_slug}`}>{ele.solution_name}</Link></li>)
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 footer-links d-flex justify-content-lg-center">
                            <div>
                                <h4>Quick Links!</h4>
                                <ul>
                                    <li className='pb-0'><Link href="/contact/contact-us">Contact</Link></li>
                                    <li className='pb-0'><Link href="/social-corporate-responsibility">Social Responsibility</Link></li>
                                    <li className='pb-0'><Link href="/life-at-ozark">Life At Ozark</Link></li>
                                    <li className='pb-0'><Link href="/about/our-story">Our Story</Link></li>
                                    <li className='pb-0'><Link href="/about/vision-and-value">Vision and Values</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container copyright text-center mt-4">
                    <p> <span>Copyright @2025</span><strong className="sitename px-1">Ozark & co.</strong><span>| All right reserved.</span>
                    </p>
                </div>

            </div>
        </>
    )
}

export default Footer