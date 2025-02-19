"use client";

import { useEffect, useState } from "react";
import { DataTable } from "simple-datatables";
import Link from "next/link";
import api from "@/_config/config";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function page() {
  const [jobData, setJobData] = useState();

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    const res = await api.get(`/jobs/get_all_jobs`);
    if (res.data.status === 1) {
      setJobData(res.data.data);
    }
  }

  useEffect(() => {
    if (jobData) {
      new DataTable("#myTable");
    }
  }, [jobData]);


  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure !",
        icon: "warning",
        width: "400px",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        showConfirmButton: true,
        confirmButtonText: "Delete",
        allowOutsideClick: false,
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-secondary"
        }
      })

      if (result.isConfirmed) {
        const res = await api.post(`/jobs/delete_job`, { id: id })
        if (res.data.status === 1) {
          toast.success(res.data.message);
          getData();
        } else {
          toast.err(res.data.message);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

 


  const handleChangeStatus = async (id, status) => {
    const result = await Swal.fire({
      icon: "warning",
      width: "400px",
      title: "Are you sure?",
      allowOutsideClick: false,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: `${status == 1 ? "Deactivate" : "Activate"}`,
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-secondary",
      }
    })
    if (result.isConfirmed) {
      try {
        const res = await api.post(`/jobs/change_status`, {
          id: id,
          status: status
        })
        console.log(res.data);
        if (res.data.status === 1) {
          getData();
        }
      } catch (err) {
        console.log(err);
      }
    }
  }


  return (
    <>
      <div className="app-main__inner">

        <div className="row">
          <div className="col-md-12 col-xl-12">
            <div className="main-card mb-3 card">
              <div className="card-header">
                View Jobs

              </div>
              <div className="table-responsive">
                <table
                  id="myTable"
                  className="align-middle mb-0 table table-borderless table-striped table-hover"
                >
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th className="text-center">Job title</th>
                      <th className="text-center">Available posts</th>
                      <th className="text-center">status</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      jobData?.map((ele, ind) =>
                        <tr>
                          <td className="text-center text-muted">#{ind + 1}</td>
                          <td className="text-center">{ele.job_title}</td>
                          <td className="text-center">{ele.available_posts}</td>
                          <td className="text-center">
                            {
                              ele.status == 1 ? <div className="badge badge-warning" style={{ cursor: "pointer" }} onClick={() => handleChangeStatus(ele._id, ele.status)}>Active</div> : <div className="badge badge-secondary" style={{ cursor: "pointer" }} onClick={() => handleChangeStatus(ele._id, ele.status)}>Inactive</div>
                            }

                          </td>
                          <td className="text-center">
                            <Link href={{
                              pathname: "/admin/careers/jobs/edit",
                              query: { id: ele._id }
                            }} className="btn btn-primary btn-sm mr-2">Edit</Link>
                            <Link href="#" className="btn btn-danger btn-sm" onClick={() => handleDelete(ele._id)}>Delete</Link>
                          </td>
                        </tr>)
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
