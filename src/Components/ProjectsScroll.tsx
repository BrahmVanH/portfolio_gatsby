import * as React from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from './ProjectCard';

const Section = styled.section`
	display: flex;
	justify-content: space-around;
	align-items: center;
	background-color: white;
	width: 400vw;
	overflow-x: hidden;
	height: 100vh;
	grid-row: 6 / 7;
	grid-column: 1 / 3;
`;
const ProjectsScroll: React.FC = () => {
	gsap.registerPlugin(ScrollTrigger);

	const projectSection = React.useRef<HTMLElement | null>(null);
	const main = React.useRef<HTMLDivElement | null>(null);

	React.useLayoutEffect(() => {
		let ctx = gsap.context(() => {
			gsap.to(projectSection.current, {
				xPercent: -100,
				x: () => innerWidth,
				ease: 'none',
				scrollTrigger: {
					trigger: projectSection.current,
					start: 'top top',
					end: () => innerWidth * 3,
					scrub: true,
					pin: true,
					invalidateOnRefresh: true,
					anticipatePin: 1,
				},
			});
		}, main);

		return () => ctx.revert();
	}, [main]);

	return (
		<div ref={main}>
			<Section ref={projectSection} id='projectScrollSection'>
				<ProjectCard />
				<ProjectCard />
				<ProjectCard />
				<ProjectCard />
			</Section>
		</div>
	);
};

export default ProjectsScroll;
