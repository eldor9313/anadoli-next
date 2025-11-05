import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import Head from 'next/head';
import Top from '../Top';
import Footer from '../Footer';
import { Stack } from '@mui/material';
import { getJwtToken, updateUserInfo } from '../../auth';
import Chat from '../Chat';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { useTranslation } from 'next-i18next';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

const withLayoutBasic = (Component: any) => {
	return (props: any) => {
		const router = useRouter();
		const { t, i18n } = useTranslation('common');
		const device = useDeviceDetect();
		const [authHeader, setAuthHeader] = useState<boolean>(false);
		const user = useReactiveVar(userVar);

		const memoizedValues = useMemo(() => {
			let title = '',
				desc = '',
				bgImage = '';

			switch (router.pathname) {
				case '/property':
					title = t('pages.property.title');
					desc = t('pages.property.desc');
					bgImage = '/img/banner/places2.jpg';
					break;
				case '/agent':
					title = t('pages.agent.title');
					desc = t('pages.agent.desc');
					bgImage = '/img/banner/places2.jpg';
					break;
				case '/agent/detail':
					title = t('pages.agentDetail.title');
					desc = t('pages.agentDetail.desc');
					bgImage = '/img/banner/places2.jpg';
					break;
				case '/mypage':
					title = t('pages.mypage.title');
					desc = t('pages.mypage.desc');
					bgImage = '/img/banner/place4.jpg';
					break;
				case '/community':
					title = t('pages.community.title');
					desc = t('pages.community.desc');
					bgImage = '/img/banner/places55.jpg';
					break;
				case '/community/detail':
					title = t('pages.communityDetail.title');
					desc = t('pages.communityDetail.desc');
					bgImage = '/img/banner/places55.jpg';
					break;
				case '/cs':
					title = t('pages.cs.title');
					desc = t('pages.cs.desc');
					bgImage = '/img/banner/places3.jpg';
					break;
				case '/account/join':
					title = t('pages.accountJoin.title');
					desc = t('pages.accountJoin.desc');
					bgImage = '/img/banner/log-sig.jpg';
					setAuthHeader(true);
					break;
				case '/member':
					title = t('pages.member.title');
					desc = t('pages.member.desc');
					bgImage = '/img/banner/places2.jpg';
					break;
				default:
					break;
			}

			return { title, desc, bgImage };
		}, [router.pathname]);

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

						<Stack
							className={`header-basic ${authHeader && 'auth'}`}
							style={{
								backgroundImage: `url(${memoizedValues.bgImage})`,
								backgroundSize: 'cover',
								boxShadow: 'inset 10px 2px 250px 10px rgb(24 22 36)',
							}}
						>
							<Stack className={'container'}>
								<strong>{t(memoizedValues.title)}</strong>
								<span>{t(memoizedValues.desc)}</span>
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

export default withLayoutBasic;
