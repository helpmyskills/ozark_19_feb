"use client";

import api from "@/_config/config";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DataTable } from "simple-datatables";

export default function page() {

  const [data, setData] = useState();

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    try {
      const res = await api.get(`/contact_enquiry/get_contact_enquiry_data`);
      if (res.data.status === 1) {
        setData(res.data.data)
      }
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
                View Contact Enquiries

              </div>
              <div className="table-responsive">
                <table
                  id="myTable"
                  className="align-middle mb-0 table table-borderless table-striped table-hover"
                >
                  <thead>
                    <tr>
                      <th className="text-center">sr. no.</th>
                      <th className="">Name</th>
                      <th className="">Email</th>
                      <th className="">Subject</th>
                      <th className="">Message</th>
                      <th className="">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      data?.map((ele, ind) => (
                        <tr>
                          <td className="text-center text-muted">#{ind + 1}</td>
                          <td>
                            <div className="widget-heading">
                              {ele.name}
                            </div>


                          </td>
                          <td>
                            <div className="widget-heading">
                              {ele.email}
                            </div>

                          </td>
                          <td>
                            {ele.subject ? <div className="widget-heading" style={{ maxWidth: "250px", maxHeight: "50px", overflowY: "scroll" }}>
                              {ele.subject}
                            </div> : <div className="widget-heading" style={{ maxWidth: "250px", maxHeight: "50px", overflowY: "scroll" }}>
                              Not Available
                            </div>
                            }

                          </td>
                          <td>
                            {
                              ele.message ? <div className="widget-heading" style={{ maxWidth: "250px", maxHeight: "50px", overflowY: "scroll" }}>
                                {ele.message}
                              </div> : <div className="widget-heading" style={{ maxWidth: "250px", maxHeight: "50px", overflowY: "scroll" }}>
                                Not Available
                              </div>
                            }

                          </td>
                          <td>
                            <div className="widget-heading"></div>
                            {ele.createdAt?.split("T")[0]}
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
