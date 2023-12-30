import * as React from 'react';

import gsap from 'gsap';
import { MotionPathPlugin, DrawSVGPlugin, CustomEase, SplitText } from 'gsap/all';
import styled from 'styled-components';
import Layout from '../layout';

const WelcomeWrapper = styled.div`
	grid-column: 1 / 3;
	grid-row: 1 / 6;
	background-color: black;
	width: 100% !important;
	max-height: 100vh;
	display: grid;
	grid-template-columns: 1fr 1fr [line3] 1fr [line4] 1fr 1fr;
	grid-template-rows: [line1] 1fr [line2] 1fr [line3] 1fr [line4];
`;

const HeaderContainer = styled.div`
	grid-column: 2 / 3;
	grid-row: 3 / 4;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const WelcomeH1 = styled.h1`
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const SVGContainer = styled.div`
	grid-column: 2 / 3;
	grid-row: 3 / 4;
	display: flex;
	justify-content: start;
`;

const CircleSVG = styled.svg`
	height: 200px;
	width: 200px;
	border-radius: 50%;
	z-index: 1000;
	overflow: visible;
	transform: translateY(-700px);
`;

const WelcomeAnimation: React.FC = () => {
	gsap.registerPlugin(SplitText, CustomEase, MotionPathPlugin, DrawSVGPlugin);

	let paths: SVGPathElement[];
	const circleSVG = React.useRef<SVGSVGElement>(null);

	let svgContainerEl: HTMLDivElement | null;
	const welcomeEl = React.useRef<HTMLHeadingElement>(null);
	const customEase = CustomEase.create('custom', 'M0,0 C0.15,0.366 0.314,0.57 0.5,0.671 0.659,0.757 0.834,0.807 1,1 ');
	const main = React.useRef<HTMLDivElement>(null);
	const mainTimeline = React.useRef<GSAPTimeline>(gsap.timeline());

	React.useEffect(() => {
		svgContainerEl = document.querySelector<HTMLDivElement>('#svg-container');
	}, []);

	// Create a namespace for the svg to allow browsers to handle svg properly
	const svgns = 'http://www.w3.org/2000/svg';

	// style variables
	const strokeWidth = 4;
	const strokeColor = '#5cceee';

	// Spread path points into an array of points to later manipulate

	const unrollTarget = (target: SVGPathElement) => {
		// Grab the path, an array of arrays of coordinate values, from the target - in this case, the svg line
		// and assign the first array to the 'start' variable
		let start = MotionPathPlugin.getRawPath(target)[0];

		// assign start postition to variables
		let xPos = start[0];
		let yPos = start[1];

		// Save length of target to variable to direct SVG drawing later
		let length = DrawSVGPlugin.getLength(target);

		// Create a namespace element and store as variable
		let targetNS = document.createElementNS(svgns, 'line');

		// Append namespace using variable to svg in DOM
		circleSVG?.current?.appendChild(targetNS);

		// Set color and width of line-stroke for target svg and namespace
		gsap.set([targetNS, target], {
			stroke: strokeColor,
			strokeWidth: strokeWidth,
		});

		// Create timeline and define duration and ease pattern
		let tl = gsap.timeline({
			defaults: { duration: 0.5, ease: 'none' },
		});

		// set namespace starting location
		tl.set(targetNS, {
			attr: { x1: xPos, x2: xPos, y1: yPos, y2: yPos },
		});

		//  Add .to tween to end of timeline, targets svg element. Draws svg to length of the array of svg points
		tl.to(target, { drawSVG: 0, x: length }, 0);

		// Add .to tween to end of timeline, targets namespace element.
		tl.to(targetNS, { attr: { x2: '+=' + length } }, 0);

		return tl;
	};

	const welcomeTl = () => {
		let split = new SplitText('#welcome', { type: 'chars' });
		let chars = split.chars;
		let tl = gsap.timeline();
		tl.from(chars, { lazy: false, delay: 0, duration: 1.8, opacity: 0, stagger: 0.05, ease: 'power2.in' });
		return tl;
	};

	React.useLayoutEffect(() => {
		paths = gsap.utils.toArray<SVGPathElement>('path');

		if (paths) {
			// const winCenterX = window.innerWidth / 2;
			// const winCenterY = window.innerHeight / 2;
			// const welcomeContainerXY = getAbsoluteElementCoordinates(welcomeEl);
			// console.log(welcomeContainerXY);

			const wTl = welcomeTl();
			let ctx = gsap.context(() => {
				let tl = gsap.timeline({ ease: customEase });

				tl.set(circleSVG.current, { y: -600 });
				tl.to(circleSVG.current, {
					y: 100,
					x: 0,
					ease: 'none',
					duration: 0.5,
				});
				tl.to(
					circleSVG.current,

					{
						duration: 0.1,
						scaleY: 0.6,
						scaleX: 1.1,
						transformOrigin: 'center bottom',
						borderBottomLeftRadius: '40%',
						borderBottomRightRadius: '40%',
						ease: 'none',
					},
					'-=.05'
				);
				tl.to(circleSVG.current, {
					scaleY: 1,
					duration: 0,
				});
				tl.to(circleSVG.current, {
					// Move SVG grid location to same as Welcome, set the svg start point and bounce point as a fraction of the left offset
					// of svg location from window left... Then the ball will land at 0, 0.. DUH
					motionPath: [
						{ x: 0, y: 100 },
						{ x: 157, y: -254 },
						{ x: 265, y: -154 },
					],
					duration: 1.5,
					ease: customEase,
				});
				paths.forEach((obj, i) => {
					tl.add(unrollTarget(obj));
				});
				mainTimeline.current.set(welcomeEl.current, { x: 240, y: -265 });
				mainTimeline.current.add(tl, '+=0');
				mainTimeline.current.add(wTl, '-=0.8');
			}, main);

			return () => ctx.revert();
		} else {
			console.log('paths null');
		}
	}, []);

	return (
		<WelcomeWrapper ref={main} id='welcomeWrapper'>
			<HeaderContainer id='header-container'>
				<WelcomeH1 ref={welcomeEl} id='welcome'>
					Welcome
				</WelcomeH1>
			</HeaderContainer>
			<SVGContainer id='svg-container'>
				<CircleSVG ref={circleSVG} id='svg' className='roll' xmlns='http://www.w3.org/2000/svg' width='400' height='120' viewBox='0 0 420 420'>
					<path className='path' d='M60,110A47.109,47.109,0,1,0,10,60,47.109,47.109,0,0,0,60,110Z' fill='none' stroke='#fff' strokeMiterlimit='10' strokeWidth='4' />
				</CircleSVG>
			</SVGContainer>
		</WelcomeWrapper>
	);
};

export default WelcomeAnimation;
