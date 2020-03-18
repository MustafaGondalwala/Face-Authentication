import React from "react"
import {Container} from 'semantic-ui-react'
import { Link } from "react-router-dom";


const HomePage = () => (
	<Container text style={{padding:10}}>
		<h1>
			<Link to="/login">Login</Link> Or <Link to="/register">Register</Link>
		</h1>
	</Container>
	);

export default HomePage;