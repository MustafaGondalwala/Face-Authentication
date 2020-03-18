import React from "react";
import {Container, Button} from "semantic-ui-react"
import { logout } from "../../actions/auth";
import { connect } from "react-redux";


 class DashboardPage extends React.Component{
	render(){
		return(
			<Container>
				Dashboard Page
				<br />
				<Button danger onClick={()=>this.props.logout()}>Logout</Button>
			</Container>	
		)
	}
}

export default connect(null, { logout })(DashboardPage);
