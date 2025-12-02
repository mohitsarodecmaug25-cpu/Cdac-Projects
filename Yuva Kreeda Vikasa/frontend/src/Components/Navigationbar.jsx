import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { removeToken } from "../services/tokenService";
import { getRole, removeRole } from "../services/RoleService";

export function Navigationbar() {
  const navigate = useNavigate();

  function gotoSignup() {
    navigate("/Signup");
  }
  function gotoLogin() {
    navigate("/login");
  }
  function gotoHome() {
    removeToken();
    removeRole();
    navigate("/");
  }
  const role = getRole();
  return (
    <Navbar expand="lg" data-bs-theme="dark" className="w-100 navbar ">
      <Container className="w-100 ms-auto ps-0 ">
        <NavLink className=" fs-3 text-decoration-none  text-white" to="/">
          Yuva Kreeda Vikas
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <NavLink to="/" className="text-decoration-none mx-4 text-white">
              Home
            </NavLink>
            <NavLink to="/sports" className="text-decoration-none mx-4 text-white">
              Sports
            </NavLink>
            {role === "admin" ? (
              <>
                <NavLink
                  to="/coaches_details"
                  className="text-decoration-none mx-4 text-white"
                >
                  Coaches
                </NavLink>

                <NavLink
                  to="/AdminDashboard"
                  className="text-decoration-none mx-4 text-white"
                >
                  Sports
                </NavLink>
              </>
            ) : null}

            {role === "coach" ? (
              <>
                <NavLink
                  to="/coach-athletes"
                  className="text-decoration-none mx-4 text-white"
                >
                  Athletes
                </NavLink>

                <NavLink
                  to="/coach-requests"
                  className="text-decoration-none mx-4 text-white"
                >
                  Requests
                </NavLink>
              </>
            ) : null}
            {role === "Athlete" ? (
              <>
                <NavLink
                  to="/athlete-sports"
                  className="text-decoration-none mx-4 text-white"
                >
                  My Sports
                </NavLink>
                <NavLink
                  to="/sports"
                  className="text-decoration-none mx-4 text-white"
                >
                  All Sports
                </NavLink>
              </>
            ) : null}

            <NavLink
              to="/about-us"
              className="text-decoration-none ms-4 text-white"
            >
              About Us
            </NavLink>
            <NavLink
              to="/contact-us"
              className="text-decoration-none mx-5  text-white"
            >
              Contact Us
            </NavLink>
          </Nav>
        </Navbar.Collapse>

        {localStorage.token ? null : (
          <Button variant="secondary" className="mx-2" onClick={gotoSignup}>
            Sign Up
          </Button>
        )}
        {localStorage.token ? (
          <Button variant="danger" onClick={gotoHome}>
            Logout
          </Button>
        ) : (
          <Button variant="success" onClick={gotoLogin}>
            Login
          </Button>
        )}
      </Container>
    </Navbar>
  );
}
