"use client";

import api from "@/_config/config";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function page() {

  const [data, setData] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await api.get("/home/admin_home_page_api")
      console.log(res.data);
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="app-main__inner">
        {/* <div className="app-page-title">
          <div className="page-title-wrapper">
            <div className="page-title-heading">
              
              <div className="pt-3 pl-3">
                Dashboard
                <div className="page-title-subheading">
                  welcome to ozark
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div className="row">

          <div className="col-md-4">
            <div className="card mb-3 widget-content bg-midnight-bloom">
              <div className="widget-content-wrapper text-white">
                <div className="widget-content-left">
                  <Link href={"/admin/enquiry/contact"} style={{ color: "white" }}>
                    <div className="widget-heading">All Contact Enquiries</div>
                    <div className="widget-subheading">General Requests</div>
                  </Link>
                </div>
                <div className="widget-content-right">
                  <div className="widget-numbers text-white">
                    <span>{data?.contactEnquiryData}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card mb-3 widget-content bg-midnight-bloom">
              <div className="widget-content-wrapper text-white">
                <div className="widget-content-left">
                  <Link href={"/admin/enquiry/job"} style={{ color: "white" }}>
                    <div className="widget-heading">All Job Enquiries</div>
                    <div className="widget-subheading">Job Requests</div>
                  </Link>
                </div>
                <div className="widget-content-right">
                  <div className="widget-numbers text-white">
                    <span>{data?.jobEnquiryData}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>




          {/* <div className="col-md-4">
            <div className="card mb-3 widget-content bg-grow-early">
              <div className="widget-content-wrapper text-white">
                <div className="widget-content-left">
                  <div className="widget-heading">Followers</div>
                  <div className="widget-subheading">People Interested</div>
                </div>
                <div className="widget-content-right">
                  <div className="widget-numbers text-white">
                    <span>46%</span>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

        </div>



      </div>
    </>
  );
}
