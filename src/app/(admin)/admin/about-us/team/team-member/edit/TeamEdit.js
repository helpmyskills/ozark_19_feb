
"use client"
import { useState, useRef, useEffect } from "react";
import api from "@/_config/config";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";


export default function page() {


  const [inputData, setInputData] = useState({});
  const [imageData, setImageData] = useState();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const handleInputData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputData({ ...inputData, [name]: value });
  }

  const handleImageData = (e) => {
    setImageData(e.target.files[0]);
  }


  const handleUpdateTeamMember = async (e) => {
    try {
      e.preventDefault();
      const formdata = new FormData();
      formdata.append("name", inputData.name);
      formdata.append("designation", inputData.designation);
      formdata.append("image", imageData);
      formdata.append("id", id);

      const res = await api.post(`/team_member/update_team_member`, formdata)
      console.log(res.data);
      if (res.data.status === 1) {
        toast.success(res.data.message);
        router.push("/admin/about-us/team/team-member")
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    getData();
  }, []);


  const getData = async () => {
    try {
      const res = await api.post(`/team_member/get_team_member_data`, {
        id: id
      })
      setInputData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className="app-main__inner">
        <div className="row">
          <div className="col-md-12 col-xl-12">
            <div className="main-card mb-3 card">
              <div className="card-header">
                Update Team member
              </div>

              <div className="card-body">
                <form >
                  <div className="form-row">
                    <div className="col-md-6">
                      <div className="position-relative form-group">
                        <label>
                          Name
                        </label>
                        <input
                          onChange={handleInputData}
                          name="name"
                          placeholder="Enter the name"
                          type="text"
                          className="form-control"
                          value={inputData?.name}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="position-relative form-group">
                        <label>
                          Designation
                        </label>
                        <input
                          onChange={handleInputData}
                          name="designation"
                          type="text"
                          placeholder="Enter the designation"
                          className="form-control"
                          value={inputData?.designation}
                        />
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
                          accept="image/*"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-5 col-md-2 d-flex align-items-center">
                      {
                        imageData ? <img src={URL.createObjectURL(imageData)} alt="" width="100px" /> :
                          <img src={inputData?.image} alt="" width="100px" />
                      }
                    </div>
                  </div>
                  <button className="mt-2 px-3 btn btn-primary" onClick={handleUpdateTeamMember}>Update</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
