"use client";

import { useEffect, useState } from "react";
import { DataTable } from "simple-datatables";
import Link from "next/link";
import api from "@/_config/config";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function page() {
  const [benefitData, setBenefitData] = useState();
  const [solutionList, setSolutionList] = useState();

  useEffect(() => {
    getBenefitData();
    getSolutionList();
  }, [])

  const getBenefitData = async () => {
    const res = await api.get(`/benefit/get_all_benefit`);
    if (res.data.status === 1) {
      setBenefitData(res.data.data);
    }
  }

  useEffect(() => {
    if (benefitData) {
      new DataTable("#myTable");
    }
  }, [benefitData]);


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
        const res = await api.post(`/benefit/delete_benefit`, { id: id })
        if (res.data.status === 1) {
          toast.success(res.data.message);
          getBenefitData();
        } else {
          toast.err(res.data.message);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  const getSolutionList = async (req, res) => {
    try {
      const res = await api.get("/solution/get_solution_list");
      if (res.data.status == 1) {
        setSolutionList(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const getSolutionNameById = (id) => {
    const solution = solutionList?.find((ele) => ele._id == id);
    return solution ? solution.solution_name :"Unknown solution";
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
        const res = await api.post(`/benefit/change_status`, {
          id: id,
          status: status
        })
        console.log(res.data);
        if (res.data.status === 1) {
          getBenefitData();
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
                View Benefits

              </div>
              <div className="table-responsive">
                <table
                  id="myTable"
                  className="align-middle mb-0 table table-borderless table-striped table-hover"
                >
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th className="text-center">Solution</th>
                      <th className="text-center">Heading</th>
                      <th className="text-center">status</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      benefitData?.map((ele, ind) =>
                        <tr>
                          <td className="text-center text-muted">#{ind + 1}</td>
                          <td className="text-center">{getSolutionNameById(ele.solution_id)}</td>
                          <td className="text-center">{ele.heading}</td>
                          <td className="text-center">
                            {
                              ele.status == 1 ? <div className="badge badge-warning" style={{ cursor: "pointer" }} onClick={() => handleChangeStatus(ele._id, ele.status)}>Active</div> : <div className="badge badge-secondary" style={{ cursor: "pointer" }} onClick={() => handleChangeStatus(ele._id, ele.status)}>Inactive</div>
                            }

                          </td>
                          <td className="text-center">
                            <Link href={{
                              pathname: "/admin/benefits/edit",
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
