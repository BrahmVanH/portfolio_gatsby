import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

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

export default function Navbar() {
	return (
		<Nav>
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
}
