import React from 'react'; 
import 'bootstrap/dist/css/bootstrap.css'; 
import Carousel from 'react-bootstrap/Carousel'; 
import './App.css'
export default function App() { 
return ( 
	<div > 
	<Carousel > 
    <Carousel.Item interval={1500}> 
		<img  height="600px" className="d-block w-100" src={require('./slider10.webp')}   alt="Image One"/>	
		</Carousel.Item> 
    <Carousel.Item interval={1500}> 
		<img  height="600px" className="d-block w-100" src={require('./slider17.webp')}   alt="Image One"/>	
		</Carousel.Item>
		
	</Carousel> 
	</div> 
); 
}