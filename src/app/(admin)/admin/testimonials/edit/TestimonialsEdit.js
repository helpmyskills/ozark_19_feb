"use client"
import api from "@/_config/config";
import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function page() {

  const [inputData, setInputData] = useState();
  const [imageData, setImageData] = useState();
  const [solutionData, setSolutionData] = useState();
  const [rating, setRating] = useState();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");


  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputData({ ...inputData, [name]: value });
  }

  const handleImageData = (e) => {
    setImageData(e.target.files[0]);
  }



  const updateTestimonial = async (e) => {
    try {
      e.preventDefault();
      const formdata = new FormData();
      formdata.append("name", inputData?.name)
      formdata.append("designation", inputData?.designation)
      formdata.append("content", inputData?.content)
      formdata.append("image", imageData);
      formdata.append("solution_id", inputData?.solution_id);
      formdata.append("rating", rating);
      formdata.append("id", id);

      const res = await api.post(`/testimonials/update_testimonial`, formdata);
      console.log(res.data);
      if (res.data.status === 1) {
        toast.success(res.data.message);
        router.push("/admin/testimonials/view")
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getSolutionData();
    getTestimonialData();
  }, []);




  const getSolutionData = async () => {
    try {
      const res = await api.get("/solution/get_solution_list");
      if (res.data.status == 1) {
        setSolutionData(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const getTestimonialData = async () => {
    try {
      const res = await api.post(`/testimonials/get_testimonial_data`, {
        id: id
      })
      console.log(res.data);
      if (res.data.status == 1) {
        setInputData(res.data.data);
        setRating(res.data.data?.rating);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const getSolutionName = (id) => {
    const solution = solutionData?.find((ele) => ele._id == id);
    return solution?.solution_name;
  }



  return (
    <>
      <div className="app-main__inner">

        <div className="row">
          <div className="col-md-12 col-xl-12">
            <div className="main-card mb-3 card">
              <div className="card-header">
                Update Testimonial
              </div>

              <div className="card-body">
                <form >
                  <div className="form-row ">
                    <div className="col-md-6">
                      <div className="position-relative form-group">
                        <label>
                          Select solution
                        </label>
                        <select className="form-control"
                          name="solution_id"
                          onChange={handleInputChange}>
                          <option hidden defaultChecked>{getSolutionName(inputData?.solution_id)}</option>
                          {
                            solutionData?.map((ele) =>
                              <option value={ele._id}>{ele.solution_name}</option>
                            )
                          }
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="position-relative form-group">
                        <label>
                          Name
                        </label>
                        <input
                          value={inputData?.name}
                          name="name"
                          placeholder="Enter the name"
                          type="text"
                          className="form-control"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="position-relative form-group">
                        <label>
                          Designation
                        </label>
                        <input
                          value={inputData?.designation}
                          name="designation"
                          placeholder="Enter the designation"
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

                    <div className="col-7 col-md-4">
                      <div className="position-relative form-group">
                        <label>
                          Image
                        </label>
                        <input
                          onChange={handleImageData}
                          name="image"
                          placeholder="Enter the short description"
                          type="file"
                          className="form-control"
                          accept="image/*"
                        />
                      </div>
                    </div>
                    <div className="col-5 col-md-2 d-flex align-items-center justify-content-center" >
                      {
                        imageData ?
                          <img src={URL.createObjectURL(imageData)} alt="" width={100} /> : <img src={inputData?.image} alt="" width={100} />
                      }
                    </div>
                    <div className="col-md-6">
                      <div className="position-relative form-group">
                        <label>
                          Ratings
                        </label>
                        <div className="mt-2">
                          {
                            [1, 2, 3, 4, 5].map((ele, ind) => {
                              return (
                                <>
                                  <label htmlFor={ele} className="mr-2">
                                    <i class="fa fa-star" style={ele <= rating ? { color: "yellow", fontSize: "20px" } : { color: "gray", fontSize: "20px" }}></i>
                                  </label>
                                  <input id={ele} type="radio" name="rating" value={ele}
                                    onChange={(e) => setRating(e.target.value)}
                                    className="d-none"
                                  />
                                </>
                              )
                            })
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="mt-2 btn btn-primary" onClick={updateTestimonial}>Update </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
