import * as React from 'react';
import Navbar from './Components/Navbar';
import styled from 'styled-components';

interface LayoutProps {
	children: React.ReactNode;
}

const Content = styled.div`
	/* height: 100vh; */
	width: 100vw;
	display: flex;
	flex-direction: column;
	
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
