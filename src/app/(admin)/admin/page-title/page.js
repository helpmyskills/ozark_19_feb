"use client";

import { useEffect, useState } from "react";
import { DataTable } from "simple-datatables";
import Link from "next/link";
import api from "@/_config/config";

export default function page() {
    const [data, setData] = useState();

    useEffect(() => {
        getData();

    }, [])

    const getData = async () => {
        try {
            const res = await api.get(`/page_title_data/get_all_page_title_data`);
            console.log(res.data);
            if (res.data.status === 1) {
                setData(res.data.data);
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
                                View Page Title

                            </div>
                            <div className="table-responsive">
                                <table
                                    id="myTable"
                                    className="align-middle mb-0 table table-borderless table-striped table-hover"
                                >
                                    <thead>
                                        <tr>
                                            <th className="text-center">Sr. No.</th>
                                            <th className="text-center">Type</th>
                                            <th className="text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data?.map((ele, ind) =>
                                                <tr>
                                                    <td className="text-center text-muted">#{ind + 1}</td>
                                                    <td className="text-center">{ele.type}</td>


                                                    <td className="text-center">
                                                        <Link href={{
                                                            pathname: "/admin/page-title/edit",
                                                            query: { id: ele?._id }
                                                        }} className="btn btn-primary btn-sm mr-2">Edit</Link>

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
