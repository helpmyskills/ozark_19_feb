"use client"
import api from "@/_config/config";
import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function page() {

  const [inputData, setInputData] = useState();
  const router = useRouter();
  const [soltionList, setSolutionList] = useState();
  const SearchParams = useSearchParams();
  const id = SearchParams.get("id");

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputData({ ...inputData, [name]: value });
  }

  const updateFaq = async (e) => {
    try {
      e.preventDefault();

      const res = await api.post(`/faq/update_faq`, {
        solution_id: inputData.solution_id,
        heading: inputData.heading,
        content: inputData.content,
        id: id
      });

      if (res.data.status === 1) {
        toast.success(res.data.message);
        router.push("/admin/faq/view")
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getSolutionList()
    getFaqData();
  }, []);

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

  const getFaqData = async () => {
    try {
      const res = await api.post("/faq/get_faq_data", {
        id: id
      });
      if (res.data.status == 1) {
        setInputData(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const getSolutionNameById = (id) => {
    const solution = soltionList?.find((ele) => ele._id == id);
    return solution ? solution.solution_name : "Unknown solution";
  }

  return (
    <>
      <div className="app-main__inner">

        <div className="row">
          <div className="col-md-12 col-xl-12">
            <div className="main-card mb-3 card">
              <div className="card-header">
                Update FAQ
              </div>

              <div className="card-body">
                <form >
                  <div className="form-row">
                    <div className="col-md-6">
                      <div className="position-relative form-group">
                        <label>
                          Solution
                        </label>
                        <select className="form-control" name="solution_id" onChange={handleInputChange}>
                          <option defaultChecked hidden>{getSolutionNameById(inputData?.solution_id)}</option>
                          {
                            soltionList?.map((ele) => <option value={ele._id}>{ele.solution_name}</option>)
                          }


                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="position-relative form-group">
                        <label>
                          Heading
                        </label>
                        <input
                          value={inputData?.heading}
                          name="heading"
                          placeholder="Enter the heading"
                          type="text"
                          className="form-control"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="position-relative form-group">
                        <label>
                          Content
                        </label>
                        <textarea
                          value={inputData?.content}
                          name="content"
                          placeholder="Enter the content"
                          type="text"
                          className="form-control"
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                    </div>

                  </div>
                  <button className="mt-2 btn btn-primary" onClick={updateFaq}>Update </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
