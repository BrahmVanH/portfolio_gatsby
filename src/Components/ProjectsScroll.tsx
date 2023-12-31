import * as React from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from './ProjectCard';
import projectCardData from '../utils/projectCardData.json';

const Section = styled.section`
	display: flex;
	justify-content: space-around;
	align-items: center;
	background-color: white;
	width: 300vw;
	padding: 0rem auto;
	overflow-x: hidden;
	height: 90vh;
	padding: 0rem 20rem 0rem 10rem;
	scroll-snap-type: mandatory;
	scroll-snap-type: x mandatory;
	grid-row: 6 / 7;
	grid-column: 1 / 3;
`;
const ProjectsScroll: React.FC = () => {
	gsap.registerPlugin(ScrollTrigger);

	const main = React.useRef<HTMLDivElement | null>(null);
	const projectSection = React.useRef<HTMLElement | null>(null);
	const cardRef = React.useRef<HTMLElement | null>(null);

	React.useLayoutEffect(() => {
		let cards = gsap.utils.toArray('.projectCard');
		let ctx = gsap.context(() => {
			gsap.to(projectSection.current, {
				xPercent: -100,
				x: () => innerWidth,
				ease: 'none',
				scrollTrigger: {
					trigger: projectSection.current,
					start: 'top top',
					end: () => innerWidth * 2,
					scrub: true,
					pin: true,
					snap: 1 / (cards.length - 1),
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
				{projectCardData.map((card, index) => {
					return <ProjectCard cardRef={cardRef} key={index} name={card.name} description={card.description} img={card.img} />;
				})}
			</Section>
		</div>
	);
};

export default ProjectsScroll;
