import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import WelcomeAnimation from '../Components/WelcomeAnimation';
import styled from 'styled-components';
import Layout from '../layout';
import ProjectsScroll from '../Components/ProjectsScroll';


const IndexPage: React.FC<PageProps> = () => {
	return (
		<Layout>
			<WelcomeAnimation />
			<ProjectsScroll />
		</Layout>
	);
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
