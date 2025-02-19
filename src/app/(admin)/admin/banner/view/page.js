"use client";

import api from "@/_config/config";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DataTable } from "simple-datatables";
import Swal from "sweetalert2";

export default function page() {

  const [data, setData] = useState();

  useEffect(() => {
    getBannerData();
  }, [])

  const getBannerData = async () => {
    try {
      const res = await api.get(`/banner/get_all_banners`);

      setData(res.data.data)

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


  const handleDelete = async (id) => {

    const result = await Swal.fire({
      icon: "warning",
      width: "400px",
      title: "Are you sure?",
      allowOutsideClick: false,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Delete",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-secondary",
      }
    })

    if (result.isConfirmed) {
      try {
        const res = await api.post(`/banner/delete_banner`, {
          id: id
        })
        if (res.data.status === 1) {
          toast.success(res.data.message);
          getBannerData();
        }
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
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
        const res = await api.post(`/banner/change_status`, {
          id: id,
          status: status
        })
        if (res.data.status === 1) {
          getBannerData();
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
                View Banners
              </div>
              <div className="table-responsive">
                <table
                  id="myTable"
                  className="align-middle mb-0 table table-borderless table-striped table-hover"
                >
                  <thead>
                    <tr>
                      <th className="text-center">sr. no.</th>
                      <th className="">Title</th>
                      <th className="">Image</th>
                      <th className="text-center">status</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      data?.map((ele, ind) => (
                        <tr>
                          <td className="text-center text-muted">#{ind + 1}</td>


                          <td>
                            <div className="widget-heading ">{ele.title}</div>
                          </td>


                          <td>
                            <div className="widget-heading "><img src={ele.image} alt="error" width="70px" /></div>
                          </td>

                          <td className="text-center">
                            {
                              ele.status == 1 ? <div className="badge badge-warning" style={{ cursor: "pointer" }} onClick={() => handleChangeStatus(ele._id, ele.status)}>Active</div> : <div className="badge badge-secondary" style={{ cursor: "pointer" }} onClick={() => handleChangeStatus(ele._id, ele.status)}>Inactive</div>
                            }
                          </td>

                          <td className="text-center">
                            <Link href={{
                              pathname: "/admin/banner/edit",
                              query: { id: ele._id }
                            }} className="btn btn-primary btn-sm mr-2">Edit</Link>
                            <Link href="#" className="btn btn-danger btn-sm  mr-2" onClick={() => handleDelete(ele._id)}>Delete</Link>

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
