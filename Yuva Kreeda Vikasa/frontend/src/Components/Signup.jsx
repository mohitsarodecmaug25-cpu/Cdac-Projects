import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getAllSports } from "../services/SportService.js";
import { API_BASE_URL } from "../constants/APIConstants.js";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { athleteSchema, coachSchema, adminSchema } from "../schemas/signupSchema.js";

export function Signup() {
  const [radio, setRadio] = useState("Athlete");
  const [sports, setSports] = useState([]);
  const [formdata, setformdata] = useState({
    Athlete: {
      name: "",
      age: "",
      gender: "",
      email: "",
      phone: "",
      password: "",
    },
    Coach: {
      name: "",
      email: "",
      phone: "",
      password: "",
      experience: "",
      sport_id: "",
    },
    Admin: { name: "", email: "", phone: "", password: "" },
  });

  function handleChange(e) {
    setformdata(formdata);
    let user = { ...formdata[radio], [e.target.name]: e.target.value };
    setformdata({ ...formdata, [radio]: user });
    console.log(formdata);
  }

  async function registerUser() {
    try {
      let response;
      if (radio === "Athlete") {
        response = await axios.post(
          `${API_BASE_URL}/athletes`,
          formdata[radio]
        );
      } else if (radio === "Admin") {
        response = await axios.post(
          `${API_BASE_URL}/admin`,
          formdata[radio]
        );
      } else {
        response = await axios.post(
          `${API_BASE_URL}/coaches`,
          formdata[radio]
        );
      }
      
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Bounce,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Registration failed", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Bounce,
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      const currentData = formdata[radio];
      let schema;
      
      if (radio === "Athlete") {
        schema = athleteSchema;
      } else if (radio === "Coach") {
        schema = coachSchema;
      } else {
        schema = adminSchema;
      }
      
      await schema.validate(currentData, { abortEarly: false });
      registerUser();
    } catch (error) {
      if (error.inner) {
        toast.error(error.inner[0].message, {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
          transition: Bounce,
        });
      }
    }
  }

  const fetchSports = async () => {
    try {
      let response = await getAllSports();
      console.log(response.data);
      setSports(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchSports();
  }, []);

  return (
    <Form
      onSubmit={handleSubmit}
      className="col-4 m-auto mt-5 text-center signupForm"
      data-bs-theme="dark"
      bg=""
    >
      <div className="fs-2">Sign up</div>
      <div className="col-10  text-center mx-auto">
        {["radio"].map((type) => (
          <div key={`inline-${type}`} className="mb-1 mt-4">
            <Form.Check
              inline
              label="Athlete"
              name="group1"
              type={type}
              defaultChecked
              id={`inline-${type}-1`}
              onClick={() => {
                setRadio("Athlete");
              }}
            />
            <Form.Check
              inline
              label="Coach"
              name="group1"
              type={type}
              id={`inline-${type}-2`}
              onClick={() => {
                setRadio("Coach");
              }}
            />
            <Form.Check
              inline
              name="group1"
              label="Admin"
              type={type}
              id={`inline-${type}-3`}
              onClick={() => {
                setRadio("Admin");
              }}
            />
          </div>
        ))}
        <Form.Group className="mb-1 text-center">
          <Form.Label></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            name="name"
            onChange={handleChange}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-1 text-center   " controlId="phone">
          <Form.Label></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            name="phone"
            onChange={handleChange}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-0 " controlId="password">
          <Form.Label></Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-1 text-center   " controlId="email">
          <Form.Label></Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={handleChange}
            name="email"
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        {radio === "Coach" ? (
          <Row>
            <Col>
              <Form.Select
                aria-label="Default select example"
                className="mt-4"
                defaultValue="Sport"
                onChange={handleChange}
                name="sport_id"
              >
                <option disabled>Sport</option>
                {sports.map((obj) => {
                  return (
                    <option key={obj.id} value={obj.id}>
                      {obj.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Col>
            <Col>
              <Form.Group className=" " controlId="Experience">
                <Form.Label></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Experience (yrs)"
                  name="experience"
                  onChange={handleChange}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
            </Col>
          </Row>
        ) : null}

        {radio === "Athlete" ? (
          <Row>
            <Col>
              <Form.Select
                aria-label="Default select example"
                className="mt-4"
                defaultValue="Gender"
                name="gender"
                onChange={handleChange}
              >
                <option disabled>Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Group className=" " controlId="age">
                <Form.Label></Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Age"
                  name="age"
                  onChange={handleChange}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
            </Col>
          </Row>
        ) : null}

        <Button
          className="w-100 mt-4 mb-5"
          variant="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </div>
    </Form>
  );
}
