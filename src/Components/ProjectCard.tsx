import * as React from 'react';
import styled from 'styled-components';
import { ProjectCardProps } from '../types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


const Card = styled.div`
	border-radius: 6px;
	width: 800px;
	height: min-content;
	background-color: black;
`;
const ProjectCard: React.FC<ProjectCardProps> = (props) => {

	const { name, img, description } = props;



  
	return (
		<Card className='projectCard' >
			<img width={'800px'} src={`${img}`} />
			<h1>{name}</h1>
			<p>{description}</p>
		</Card>
	);
};

export default ProjectCard;
