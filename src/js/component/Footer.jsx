import React from "react";
import { Link } from "react-router-dom"
import "../../styles/navbar.css";

export const Footer = () => (
	<footer className="bd-footer py-4 py-md-5 mt-5">
	  <div className="container">
		<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-6 g-3 text-center text-sm-start">
		  <div className="col mb-3">
			<p className="mb-0" id="navbarText">© 2024 Binaurapp, Inc.</p>
		  </div>
		  <div className="col mb-3">
			<p className="mb-0" id="navbarText">Terms</p>
		  </div>
		  <div className="col mb-3">
			<p className="mb-0" id="navbarText">Privacy</p>
		  </div>
		  <div className="col mb-3">
			<p className="mb-0" id="navbarText">Security</p>
		  </div>
		  <div className="col mb-3">
			<Link to="/mail" id="navbarText" className="text-decoration-none">Contact</Link>
		  </div>
		  <div className="col mb-3">
			<p className="mb-0" id="navbarText">Manage cookies</p>
		  </div>
		</div>
	  </div>
	</footer>
  );