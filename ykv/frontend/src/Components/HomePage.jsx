import React from "react"
import { Link } from "react-router-dom"
export function HomePage(){
    return(
        <div className="align-items-center">
        <div className="container text-center vertical-align-center " style={{ margin:"22vh 15vh", animation: "fadeInUp 2s ease" }}>
            <h1
              className="display-3 fw-bold mb-3"
              style={{
                color:"white",
                textShadow: "0 4px 15px rgba(0,0,0,0.7)",
                letterSpacing: "1px",
              }}
            >
              The Future of Sports Innovation
            </h1>
            <p
              className="lead mb-4 mx-auto"
              style={{ maxWidth: "750px", color: "#f1f1f1" ,fontWeight:"normal",textShadow: "0 4px 20px rgba(0,0,0,1)"}}
            >
              Where talent meets technology — empowering athletes and coaches
              with digital tools to rise above limits.
            </p>
            <Link
              to="/signup"
              className="btn btn-lg fw-semibold"
              style={{
                backgroundColor: "#ffb703",
                color: "#023047",
                borderRadius: "12px",
                padding: "12px 36px",
                boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
              }}
            >
              Get Started Now
            </Link>
          </div>
          </div>
    )
}