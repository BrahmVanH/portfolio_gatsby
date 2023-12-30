import * as React from 'react';
import Navbar from './Components/Navbar';
import styled from 'styled-components';

interface LayoutProps {
	children: React.ReactNode;
}

const Content = styled.div`
	height: 100vh;
	width: 100vw;
	display: grid;
	grid-template-columns: [line1] 65px [line2] 1fr [line3];
	grid-template-rows: [line1] 1fr [line2] 1fr [line3] 1fr [line4] 1fr [line5] 1fr [line6];
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<Content>
			<Navbar />
			{children}
		</Content>
	);
};

export default Layout;
