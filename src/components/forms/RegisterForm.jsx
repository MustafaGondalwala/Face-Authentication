import React from "react"
import {Form,Button,Image,Container} from "semantic-ui-react"
import InlineError from "../messages/InlineError"
import Camera,{ FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import axios from 'axios';

export default class RegisterForm extends React.Component{
	state = {
	    data: {
	      username:"",
	      password: "",
	      camera_image:"",
	    },
	    valid_face:false,
	    errors: {}
	  };

	

	 handleTakePhoto = (dataUri) => {
	    this.setState({
	      data: {...this.state.data,'camera_image':dataUri }
	    });
	    axios({
	    	url:"https://django-ml-backend.herokuapp.com/api/face-identification/check-for-faces",
	    	method:'post',
	    	data: {
	    		dataUri
	    	},
	    	
	    }).then((data)=>{
	    	if(data.data.total_faces !== 1){
	    		this.setState({
					data: { ...this.state.data,'camera_image': "" }
				})
	    		const errors = {}
	    		errors.valid_image = "Invalid Image. Try Again"
	    		this.setState({errors})
	    	}else{
	    		this.setState({errors:{}})
	    	}
	    })
  	}	

	onChange = e =>
    this.setState({
      data: {...this.state.data,[e.target.name]:e.target.value}
    });

    validate = data => {
	    const errors = {};

	    if (!data.password) errors.password = "Can't be blank";
	    if(!data.username) errors.username = "Invalid Username";
	    if(!data.camera_image) errors.camera_image = "Webcam Image is Required"

	    return errors;
	  };
	
	
 	
	onSubmit = e => {
	    e.preventDefault();
	    const errors = this.validate(this.state.data);
	    this.setState({ errors });
	    if (Object.keys(errors).length === 0) {
	      this.props
	        .submit(this.state.data)
	    }
	  };
	render(){
    	const { data, errors } = this.state;

		return(
				<Form loading={this.props.loading} onSubmit={this.onSubmit}>
					<Form.Field error={!!errors.username}>
			          <label htmlFor="password">Username</label>
			          <input
			            type="text"
			            id="username"
			            name="username"
			            placeholder="Example"
			            value={data.username}
			            onChange={this.onChange}
			          />
			          {errors.password && <InlineError text={errors.password} />}
			        </Form.Field>
			        <Form.Field error={!!errors.password}>
			          <label htmlFor="password">Password</label>
			          <input
			            type="password"
			            id="password"
			            name="password"
			            placeholder="********"
			            value={data.password}
			            onChange={this.onChange}
			          />
			          {errors.password && <InlineError text={errors.password} />}
			        </Form.Field>
			    <Form.Field>
		        	
		        	{
		        		(data.camera_image) ?
		        		<Container>
			        		<Image  size='medium'  alt="" src={data.camera_image}/>
			        		<Button onClick={()=> this.setState({
						      data: { ...this.state.data,'camera_image': "" }
						    })} danger>Remove</Button>
			        	</Container>
			        	:
			        	<div>
			        	{errors.camera_image && <InlineError text={errors.camera_image} />}

			        	{errors.valid_image && <InlineError text={errors.valid_image} />}
				    	<Camera 
						  idealFacingMode = {FACING_MODES.ENVIRONMENT}
					      idealResolution = {{width: 640, height: 480}}
					      imageType = {IMAGE_TYPES.PNG}
					      imageCompression = {0.97}
						  isFullscreen = {false}
						  sizeFactor = {1}
						  onTakePhoto = { (dataUri) => { this.handleTakePhoto(dataUri)}}
					    />
					    </div>
					}
			    </Form.Field>
		        <Button primary> Next </Button>
		         
			</Form>
		)
	}
}