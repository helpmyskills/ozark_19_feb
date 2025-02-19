"use client";

import api from "@/_config/config";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/_config/config";
import { DataTable } from "simple-datatables";

export default function page() {

  const [data, setData] = useState();

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    try {
      const res = await api.get(`/jobs/get_job_enquiry_data`);
      if (res.data.status === 1) {
        setData(res.data.data)
      }
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    if (data) {
      new DataTable("#myTable");
    }
  }, [data]);


  return (
    <>
      <div className="app-main__inner">

        <div className="row">
          <div className="col-md-12 col-xl-12">
            <div className="main-card mb-3 card">
              <div className="card-header">
                View Job Enquiries

              </div>
              <div className="table-responsive">
                <table
                  id="myTable"
                  className="align-middle mb-0 table table-borderless table-striped table-hover"
                >
                  <thead>
                    <tr>
                      <th className="text-center">sr. no.</th>
                      <th className="">Name & Contact</th>
                      <th className="text-center">Apply Date</th>
                      <th className="text-center">Position</th>
                      <th className="text-center">Experience</th>
                      <th className="text-center">Notice period</th>
                      <th className="text-center">Resume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      data?.map((ele, ind) => (
                        <tr>
                          <td className="text-center text-muted">#{ind + 1}</td>
                          <td>
                            <div className="widget-heading ">
                              {ele.name}
                              <br />
                              {ele.phone}
                              <br />
                              {ele.email}
                            </div>

                          </td>
                          <td>
                            <div className="widget-heading text-center">
                              {ele.createdAt?.split("T")[0]}
                            </div>
                          </td>
                          <td>
                            <div className="widget-heading text-center" style={{ maxWidth: "250px", maxHeight: "50px", overflowY: "scroll" }}>
                              {ele.position}
                            </div>
                          </td>
                          <td>
                            <div className="widget-heading text-center" style={{ maxWidth: "250px", maxHeight: "50px", overflowY: "scroll" }}>
                              {ele.experience}
                            </div>
                          </td>
                          <td>
                            {
                              ele.notice_period ?
                                <div className="widget-heading text-center" style={{ maxWidth: "250px", maxHeight: "50px", overflowY: "scroll" }}>
                                  {ele.notice_period}
                                </div>
                                : <div className="widget-heading text-center" style={{ maxWidth: "250px", maxHeight: "50px", overflowY: "scroll" }}>
                                  Not Available
                                </div>
                            }

                          </td>
                          <td>
                            <div className="widget-heading d-flex justify-content-center">
                              <a href={`${BASE_URL}/uploads/${ele.resume}`} download={`${ele.name}_resume.pdf`} target="_blank"><i class="fas fa-solid fa-download"></i></a>
                            </div>
                          </td>

                        </tr>
                      ))
                    }

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
