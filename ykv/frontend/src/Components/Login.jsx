import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useState,useEffect} from "react"; 
import axios from 'axios';
import { API_BASE_URL } from "../constants/APIConstants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getToken, storeToken } from "../services/tokenService";
import { storeRole } from "../services/RoleService";
import { loginSchema } from "../schemas/loginSchema.js";

export function Login(){
  // const [role,setRole]=useState("");
  const navigate=useNavigate();
  const [formdata,setformdata]=useState({phone:"",password:"",role:"Athlete"})


  useEffect(()=>{
    const token=getToken();
    if(token){
      toast("You are already logged in")
      navigate('/');
    }
  },[]);

   
  function handleChange(e){
    setformdata({...formdata,[e.target.name]:e.target.value})
  }

 async function loginUser(){
  
  try{
       
    const response=await axios.post(`${API_BASE_URL}/login`,formdata);
      console.log(response.data);
      if(response.status===200){
      storeToken(response.data.token);
      storeRole(formdata.role);
      toast.success("Login successfull");
      navigate(`/`);
      }
    }
    catch(error){
        // console.log(error);
        if (error.response) {
                if (error.response.status === 400 || error.response.status === 500)
                {
                  toast.error(error.response.data.message);
                }
              }
    }

 }
  async function handleSubmit(e){
    e.preventDefault();
    
    try {
      await loginSchema.validate(formdata, { abortEarly: false });
      loginUser();
    } catch (error) {
      if (error.inner) {
        toast.error(error.inner[0].message, {
          position: "top-right",
          autoClose: 3000,
          theme: "colored"
        });
      }
    }
  }


  return (
    
    <Form onSubmit={handleSubmit}
      className="col-4 m-auto mt-5 text-center signupForm"
      data-bs-theme="dark"
      bg=""
    >
        <div className="fs-2">Log In</div>
        <div className="col-10 align-items-center text-center mx-auto">
            {[ 'radio'].map((type) => (
        <div key={`inline-${type}`} className="mb-1 mt-4">
          <Form.Check
            inline
            label="Athlete"
            name="role"
            type={type}
            defaultChecked
            value="athlete"
            onChange={handleChange}
            id={`inline-${type}-1`}
          />
          <Form.Check
            inline
            label="Coach"
            name="role"
            type={type}
            value="coach"
            onChange={handleChange}
            id={`inline-${type}-2`}
            
            
          />
          <Form.Check
            inline
            name="role"
            label="Admin"
            type={type}
            value="admin"
            id={`inline-${type}-3`}
            onChange={handleChange}
            
          />
        </div>
      ))}
      <Form.Group className="mb-3 text-center   " controlId="formBasicEmail">
        <Form.Label></Form.Label>
        <Form.Control type="text" placeholder="Enter Phone Number" name="phone" onChange={handleChange}/>
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label></Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange}/>
      </Form.Group>
        

     <div ></div>
      <Button className="w-100 mt-4 mb-5" variant="primary" type="submit">
        Login
      </Button>
      </div>
    </Form>

  );
}
