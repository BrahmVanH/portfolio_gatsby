import * as React from 'react';
import styled from 'styled-components';
import ProjectCard from './ProjectCard';

const Section = styled.section`
	display: flex;
	justify-content: space-around;
	align-items: center;
	background-color: white;
	width: 100%;
	overflow-x: scroll;
	height: 600px;
	grid-row: 6 / 7;
	grid-column: 1 / 3;
`;
const ProjectsScroll: React.FC = () => {
	return (
		<Section id='projectScrollSection'>
			<ProjectCard />
			<ProjectCard />
			<ProjectCard />
			<ProjectCard />
		</Section>
	);
};

export default ProjectsScroll;
