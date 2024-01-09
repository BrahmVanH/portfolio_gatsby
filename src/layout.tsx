import * as React from 'react';
import Navbar from './Components/Navbar';
import styled from 'styled-components';
import { LayoutProps } from './types';

const Content = styled.main`
	/* height: 100vh; */
	width: 100vw;
	display: flex;
	flex-direction: column;
	overflow: hidden;
`;

const ChildrenOverlay = styled.div`
	background-color: transparent;
	position: absolute;
	top: 0;
	height: 100vh;
	width: 100vw;
	z-index: 900;
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const layoutRef = React.useRef<HTMLElement | null>(null);
	const triggerRef = React.useRef<HTMLDivElement | null>(null);
	return (
		<Content ref={layoutRef}>
			<Navbar parentRef={layoutRef} triggerRef={triggerRef} />
			<ChildrenOverlay ref={triggerRef} />
			{children}
		</Content>
	);
};

export default Layout;
