import axios from "axios";
import { Container } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FloatingLabel } from "react-bootstrap";
import { SPORT_API_URL } from "../constants/APIConstants";
import { useState } from "react";
import "../App.css";
import { toast } from "react-toastify";
import { getToken } from "../services/tokenService";
import { Navigate, useNavigate } from "react-router-dom";
    
export function AddSport() {
  const [formdata, setformdata] = useState({
    name: "",
    description: "",
  });

  const navigate=useNavigate();
  function handleChange(e) {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  }

  async function postformdata() {
    try {
        const token=getToken();
      const response = await axios.post(`${SPORT_API_URL}`, formdata,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
      console.log(response);
      if(response.status===200){
        toast("Sport Added");
        navigate("/AdminDashboard");
      }
    } catch (err) {
      console.log(err.response.data);
      if(err.response.status){
        toast("Something went wrong");
      }
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    postformdata();
    console.log(formdata);
  }

  return (
    <Container>
      <Form
        onSubmit={handleSubmit}
        className="col-4 m-auto mt-5 text-center signupForm"
        data-bs-theme="dark"
        bg=""
      >
        <div className="fs-2">ADD SPORT</div>
        <div className="col-10  text-center mx-auto">
          <Form.Group className=" mt-3 text-center">
            <Form.Label></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Sport Name"
              name="name"
              onChange={handleChange}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <FloatingLabel
            controlId="floatingTextarea2"
            label="Add Description"
            className="mt-4"
          >
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
              name="description"
              onChange={handleChange}
            />
          </FloatingLabel>

          <Button
            className="w-100 mt-4 mb-5"
            variant="primary"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
}
