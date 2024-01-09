import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import gsap from 'gsap';
import { NavbarProps } from '../types';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Nav = styled.div`
	grid-column: 1 / span 1;
	grid-row: 3 / 4;
	background-color: #1a2421;
	border: 0.5px solid white;
	border-top-left-radius: 6px;
	border-top-right-radius: 6px;
	width: 338px;
	height: 65px;
	display: flex;
	align-items: center;
	justify-content: space-around;
	transform: rotate(90deg) translateY(138px);
	position: fixed;
	left: 0;
	top: 50%;
	z-index: 1000;
`;

const navLinkStyle = {
	color: '#ffffff',
	padding: '0.5rem',
	margin: '0.5rem',
};

const Navbar: React.FC<NavbarProps> = (props) => {
	gsap.registerPlugin(ScrollTrigger);
	const parentRef = props.parentRef;
	const triggerRef = props.triggerRef;

	const navbarRef = React.useRef<HTMLDivElement | null>(null);
	React.useLayoutEffect(() => {
		let ctx = gsap.context(() => {
			gsap.fromTo(
				navbarRef.current,
				{
					x: -200,
					opacity: 0,
				},
				{
					x: -150,
					opacity: 1,
					duration: 2,
				}
			);
			// gsap.to(navbarRef.current, {
			// 	value: 100,
			// 	ease: 'none',
			// 	scrollTrigger: {
			// 		trigger: parentRef.current,
			// 		scrub: 1,
			// 		start: "bottom center"
			// 	},
			// });
			gsap.to(navbarRef.current, {
				x: -200,
				opacity: 0,
				duration: 2,
				scrollTrigger: {
					trigger: triggerRef.current,
					start: '10% 5%',
					scrub: 0.1,
					toggleActions: 'play none none reverse',
				},
			});
		}, [parentRef]);
	});
	return (
		<Nav ref={navbarRef}>
			<Link style={navLinkStyle} to='/'>
				Welcome
			</Link>
			<Link style={navLinkStyle} to='/about'>
				About
			</Link>
			<Link style={navLinkStyle} to='/contact'>
				Contact
			</Link>
		</Nav>
	);
};

export default Navbar;
