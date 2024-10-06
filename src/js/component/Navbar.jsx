import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";
import Binaural_Logo from "../../img/binaural_logos/Logo_binaurapp.png"


export const Navbar = () => {
	const { store, actions } = useContext(Context);

	const logout = () => {
		console.log("estoy en logout");
		actions.setIsLogin(false)
		actions.setUser(null)
		localStorage.removeItem("token")
	}

	return (
		<nav id="navbar" className="navbar navbar-expand-md">
			<div className="container-fluid">
				<Link className="navbar-brand d-flex align-items-center" to="/">
					<img src={Binaural_Logo} alt="Binaural_logo" width="50" height="50" className="d-inline-block align-top" />
					<span id="binaurappLogoName" className="ms-2">Binaurapp</span>
				</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavCollapse" aria-controls="navbarNavCollapse" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler material-symbols-outlined" id="menuIcon">menu</span>
				</button>
				<div className="collapse navbar-collapse justify-content-end" id="navbarNavCollapse">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link id="navbarText" className="nav-link" to="/">What's Binaurapp</Link>
						</li>
						<li className="nav-item">
							<Link id="navbarText" className="nav-link" to="/aboutus">About Us</Link>
						</li>
						{!store.isLogin && (
							<>
								<li className="nav-item">
									<Link id="navbarText" className="nav-link" to="/signup">Signup</Link>
								</li>
								<li className="nav-item">
									<Link id="navbarText" className="nav-link" to="/login">Login</Link>
								</li>
							</>
						)}
						{store.isLogin && (
							<>
								<li className="nav-item">
									<Link id="navbarText" className="nav-link" to="/dashboard">Dashboard</Link>
								</li>
								<li className="nav-item">
									<Link id="navbarText" className="nav-link" onClick={logout} to="/">Logout</Link>
								</li>
								<li className="nav-item">
									<Link id="navbarText" className="nav-link" to="/profile">Profile</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

