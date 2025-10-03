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

const slides = [
	'/img/banner/header01.webp',
	'/img/banner/header02.webp',
	'/img/banner/header03.webp',
	'/img/banner/header04.webp',
];

const withLayoutMain = (Component: any) => {
	return (props: any) => {
		const device = useDeviceDetect();
		const user = useReactiveVar(userVar);

		// Background img handler
		const [activeSlide, setActiveSlide] = useState(0);

		useEffect(() => {
			const interval = setInterval(() => {
				setActiveSlide((prevIndex) => (prevIndex + 1) % slides.length);
			}, 5000);
			return () => clearInterval(interval);
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
						<Stack className={'header-top'}>
							<Stack className={'header-main'}>
								<div className="header-backgrounds">
									{slides.map((url, index) => (
										<div
											key={url}
											className={`background-slide ${index === activeSlide ? 'active' : ''}`}
											style={{
												backgroundImage: `url('${url}')`,

												zIndex: index === activeSlide ? 2 : 1,
											}}
										/>
									))}
								</div>
								{/* <FiberContainer /> */}
							</Stack>
							<Stack className={'container'}>
								<HeaderFilter />
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
