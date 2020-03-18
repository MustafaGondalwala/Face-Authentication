import React from "react";
import {Container,Header,Segment,Message} from "semantic-ui-react"
import RegisterForm from "../forms/RegisterForm";
import axios from 'axios';
class RegisterPage extends React.Component{
	state = {
		'success':'',
		'error':'',
		'loading':false
	}
	
	constructor(props) {
        super(props);
        this.submit = this.submit.bind(this)
    }
	submit(data){
		this.setState({
			'loading':true
		})
		axios({
			url:"/api/face-identification/add-new-face",
			method:"post",
			data: data
		}).then((data)=> {
			console.log(data,data.data.success)
			if(data.data.success){
				this.setState({
					'success': data.data.success,
				})
				this.props.history.push("/login");
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
				<Header as="h1">Register Page</Header>
				<Segment >
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
export default RegisterPage