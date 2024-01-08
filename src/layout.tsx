import * as React from 'react';
import Navbar from './Components/Navbar';
import styled from 'styled-components';
import { LayoutProps } from './types';

const Content = styled.div`
	/* height: 100vh; */
	width: 100vw;
	display: flex;
	flex-direction: column;
	overflow: hidden;
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
