import React, { useEffect, useState } from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import Head from 'next/head';
import Top from '../Top';
import Footer from '../Footer';
import { Stack } from '@mui/material';
// import FiberContainer from '../common/FiberContainer';
import HeaderFilter from '../homepage/HeaderFilter';
import { userVar } from '../../../apollo/store';
import { useReactiveVar } from '@apollo/client';
import { getJwtToken, updateUserInfo } from '../../auth';
import Chat from '../Chat';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const slideContents = [
	{
		type: 'imageGroup',
		src: '/img/banner/header01.webp',
		slides: [
			'/img/banner/header01.webp',
			'/img/banner/header02.webp',
			'/img/banner/header03.webp',
			'/img/banner/header04.webp',
		],
		thumb: '/img/thumbs/travel.jpg',
	},
	{
		type: 'video',
		src: '/video/historic.mp4',
		thumb: '/img/thumbs/culinary.jpg',
	},
	{
		type: 'video',
		src: '/video/cuisine.mp4',
		thumb: '/img/thumbs/history.jpg',
	},
];

const withLayoutMain = (Component: any) => {
	return (props: any) => {
		const device = useDeviceDetect();
		const user = useReactiveVar(userVar);

		// Background img handler
		const [mainIndex, setMainIndex] = useState(0);
		const [innerIndex, setInnerIndex] = useState(0);

		useEffect(() => {
			if (slideContents[mainIndex]?.type === 'imageGroup') {
				const innerTimer = setInterval(() => {
					const current = slideContents[mainIndex];
					if (current?.type === 'imageGroup' && current.slides?.length) {
						setInnerIndex((prev) => (prev + 1) % current.slides.length);
					}
				}, 8000);
				return () => clearInterval(innerTimer);
			}
		}, [mainIndex]);

		useEffect(() => {
			const mainTimer = setInterval(() => {
				setMainIndex((prev) => (prev + 1) % slideContents.length);
				setInnerIndex(0);
			}, 8000);
			return () => clearInterval(mainTimer);
		}, []);

		/** LIFECYCLES **/
		useEffect(() => {
			const jwt = getJwtToken();
			if (jwt) updateUserInfo(jwt);
		}, []);

		/** HANDLERS **/

		if (device == 'mobile') {
			return (
				<>
					<Head>
						<title>Anadoli</title>
						<meta name={'title'} content={`Anadoli`} />
					</Head>
					<Stack id="mobile-wrap">
						<Stack id={'top'}>
							<Top />
						</Stack>

						<Stack id={'main'}>
							<Component {...props} />
						</Stack>

						<Stack id={'footer'}>
							<Footer />
						</Stack>
					</Stack>
				</>
			);
		} else {
			return (
				<>
					<Head>
						<title>Anadoli</title>
						<meta name={'title'} content={`Anadoli`} />
					</Head>
					<Stack id="pc-wrap">
						<Stack id={'top'}>
							<Top />
						</Stack>

						<Stack className={'header-main'}>
							<Stack className={'container'}>
								<HeaderFilter />
							</Stack>
							<Stack className={'main-hero-slider'}>
								{/* Slides */}
								{slideContents.map((slide, index) => (
									<div key={index} className={`main-slide ${index === mainIndex ? 'active' : ''}`}>
										{slide.type === 'imageGroup' ? (
											<div className="image-group">
												{slide.slides?.map((img, i) => (
													<div
														key={i}
														className={`bg ${i === innerIndex ? 'active' : ''}`}
														style={{ backgroundImage: `url(${img})` }}
													/>
												))}
											</div>
										) : (
											<video src={slide.src} autoPlay muted loop playsInline preload="auto" />
										)}
									</div>
								))}

								{/* Overlay */}
								<div className="overlay">
									<h1>What's On</h1>
								</div>

								{/* Thumbnails (chap tomonda) */}
								<div className="thumbnails">
									{slideContents.map((slide, i) => (
										<div key={i} className={`thumb ${i === mainIndex ? 'active' : ''}`} onClick={() => setMainIndex(i)}>
											<img src={slide.thumb} alt={`thumb-${i}`} />
										</div>
									))}
								</div>
							</Stack>
						</Stack>
						<Stack id={'main'}>
							<Component {...props} />
						</Stack>

						{<Chat />}

						<Stack id={'footer'}>
							<Footer />
						</Stack>
					</Stack>
				</>
			);
		}
	};
};

export default withLayoutMain;
