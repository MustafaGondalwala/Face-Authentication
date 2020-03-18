import React from "react";
import {Container,Header,Segment,Message} from "semantic-ui-react"
import RegisterForm from "../forms/RegisterForm";
import axios from 'axios';
import { connect } from "react-redux";
import { login } from "../../actions/auth";

class LoginPage extends React.Component{
	state = {
		loading:false
	}
	submit = (data)=> {
		this.setState({
			loading:true
		})
		axios({
			url:"https://django-ml-backend.herokuapp.com/api/face-identification/login",
			method:'post',
			data:data
		}).then((data)=>{
			this.setState({
				loading:false
			})
			if(data.data.success){
				this.setState({
					'success':data.data.success.message,
					'loading':false
				})
				this.props.login(data.data.success.user)
				this.props.history.push("/dashboard")
			}
			if(data.data.error){
				this.setState({
					'error':data.data.error,
					'loading':false
				})
			}
		})

	}
	render(){
		return(
			<Container style={{padding:10}}>
				<Header as="h1">Login Page</Header>
				<Segment>
					{this.state.success && 
										<Message positive>
					    <Message.Header>{this.state.success}</Message.Header>
						  </Message>}
					{this.state.error && 
										<Message negetive>
					    <Message.Header>{this.state.error}</Message.Header>
						  </Message>}
					<RegisterForm  loading={this.state.loading} submit={this.submit} />				
				</Segment>
			</Container>

		)
	}
}

export default connect(null, { login })(LoginPage);