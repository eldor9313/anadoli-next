import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { useRouter, withRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { getJwtToken, logOut, updateUserInfo } from '../auth';
import { Stack, Box } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { CaretDown } from 'phosphor-react';
import useDeviceDetect from '../hooks/useDeviceDetect';
import Link from 'next/link';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { useQuery, useReactiveVar } from '@apollo/client';
import { userVar } from '../../apollo/store';
import { Logout } from '@mui/icons-material';
import { REACT_APP_API_URL } from '../config';
import { T } from '../types/common';
import { GET_UNREADNOTIFICATIONS } from '../../apollo/user/query';
import Notifications from './Notification';
import { Notification } from '../types/notification/notification';
import { RippleBadge } from '../../scss/MaterialTheme/styled';

const Top = () => {
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const { t, i18n } = useTranslation('common');
	const router = useRouter();
	const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
	const [lang, setLang] = useState<string | null>('en');
	const drop = Boolean(anchorEl2);
	const [colorChange, setColorChange] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState<any | HTMLElement>(null);
	let open = Boolean(anchorEl);
	const [bgColor, setBgColor] = useState<boolean>(false);
	const [logoutAnchor, setLogoutAnchor] = React.useState<null | HTMLElement>(null);
	const logoutOpen = Boolean(logoutAnchor);

	const [notifOpen, setNotifOpen] = useState(false);
	const [unreadCount, setUnreadCount] = useState<number>(0);

	/** LIFECYCLES **/
	useEffect(() => {
		if (localStorage.getItem('locale') === null) {
			localStorage.setItem('locale', 'en');
			setLang('en');
		} else {
			setLang(localStorage.getItem('locale'));
		}
	}, [router]);

	useEffect(() => {
		switch (router.pathname) {
			case '/property/detail':
				setBgColor(true);
				break;
			default:
				break;
		}
	}, [router]);

	useEffect(() => {
		const jwt = getJwtToken();
		if (jwt) updateUserInfo(jwt);
	}, []);

	const hasToken = !!getJwtToken();
	const {
		loading: getUnreadNotificationsLoading,
		data: getUnreadNotificationsData,
		error: getUnreadNotificationsError,
		refetch: getUnreadNotificationsRefetch,
	} = useQuery(GET_UNREADNOTIFICATIONS, {
		skip: !hasToken,
		fetchPolicy: 'cache-and-network',
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setUnreadCount(data?.unreadNotificationsCount ?? 0);
		},
	});

	/** HANDLERS **/
	const langClick = (e: any) => {
		setAnchorEl2(e.currentTarget);
	};

	const langClose = () => {
		setAnchorEl2(null);
	};

	const langChoice = useCallback(
		async (e: any) => {
			setLang(e.target.id);
			localStorage.setItem('locale', e.target.id);
			setAnchorEl2(null);
			await router.push(router.asPath, router.asPath, { locale: e.target.id });
		},
		[router],
	);

	const changeNavbarColor = () => {
		if (window.scrollY >= 50) {
			setColorChange(true);
		} else {
			setColorChange(false);
		}
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleHover = (event: any) => {
		if (anchorEl !== event.currentTarget) {
			setAnchorEl(event.currentTarget);
		} else {
			setAnchorEl(null);
		}
	};

	const StyledMenu = styled((props: MenuProps) => (
		<Menu
			elevation={0}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
			{...props}
		/>
	))(({ theme }) => ({
		'& .MuiPaper-root': {
			top: '109px',
			borderRadius: 12,
			marginTop: theme.spacing(1.5),
			minWidth: 160,
			background: 'rgba(255, 255, 255, 0)',
			backdropFilter: 'blur(12px) saturate(150%)',
			WebkitBackdropFilter: 'blur(12px) saturate(150%)',
			boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
			transition: 'all 0.3s ease',

			'& .MuiMenu-list': {
				padding: '4px 0',
			},

			'& .MuiMenuItem-root': {
				display: 'flex',
				alignItems: 'center',
				gap: '10px',
				padding: '8px 16px',
				borderRadius: 8,
				transition: 'all 0.3s ease',
				cursor: 'pointer',

				'&:hover': {
					background: 'rgba(255, 255, 255, 0.05)',
					transform: 'translateX(2px)',
				},

				'& .MuiTypography-root': {
					color: '#1e293b',
				},

				'& .MuiSvgIcon-root': {
					fontSize: 18,
					color: '#1e293b',
					marginRight: theme.spacing(1.5),
				},

				'& img.img-flag': {
					width: 24,
					height: 17,
					borderRadius: 4,
					transition: 'transform 0.3s ease',
					'&:hover': {
						transform: 'scale(1.1)',
					},
				},

				'&:active': {
					backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
				},
			},
		},
	}));

	if (typeof window !== 'undefined') {
		window.addEventListener('scroll', changeNavbarColor);
	}

	if (device == 'mobile') {
		return (
			<Stack className={'top'}>
				<Link href={'/'}>
					<div>{t('Home')}</div>
				</Link>
				<Link href={'/property'}>
					<div>{t('Places')}</div>
				</Link>
				<Link href={'/agent'}>
					<div> {t('Agents')} </div>
				</Link>
				<Link href={'/community?articleCategory=FREE'}>
					<div> {t('Experiences')} </div>
				</Link>
				<Link href={'/cs'}>
					<div> {t('CS')} </div>
				</Link>
			</Stack>
		);
	} else {
		return (
			<Stack>
				<Stack className={'navbar'}>
					<Stack className={'home-top'}>
						<Box className={'top-left'}>
							<Box className={'top-left'}>
								<span className={'text first-text'}>{t('welcomeTitle')}</span>
								<span className={'text second-text'}>{t('welcomeDesc')}</span>
							</Box>
						</Box>
						<Box className={'top-right'}>
							<svg className={'icon1'} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
								<path
									d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.2.48 2.53.74 3.9.74a1 1 0 011 1v3.5a1 1 0 01-1 1C10.07 22 2 13.93 2 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.37.26 2.7.74 3.9a1 1 0 01-.21 1.11l-2.2 2.2z"
									fill="currentColor"
								/>
							</svg>

							<span className={'phone'}>+82 10 8747-9313</span>
						</Box>
					</Stack>
					<Stack className={`navbar-main ${colorChange ? 'transparent' : ''} ${bgColor ? 'transparent' : ''}`}>
						<Stack className={'container'}>
							<Box component={'div'} className={'logo-box'}>
								<Link href={'/'}>
									<img src="/img/logo/logoWhite.png" alt="" />
								</Link>
							</Box>
							<Box component={'div'} className={'router-box'}>
								<Link href={'/'}>
									<div>{t('Home')}</div>
								</Link>
								<Link href={'/property'}>
									<div>{t('Places')}</div>
								</Link>
								<Link href={'/agent'}>
									<div> {t('Agents')} </div>
								</Link>
								<Link href={'/community?articleCategory=FREE'}>
									<div> {t('Experiences')} </div>
								</Link>
								{user?._id && (
									<Link href={'/mypage'}>
										<div> {t('My Page')} </div>
									</Link>
								)}
								<Link href={'/cs'}>
									<div> {t('CS')} </div>
								</Link>
							</Box>
							<Box component={'div'} className={'user-box'}>
								{user?._id ? (
									<>
										<div className={'login-user'} onClick={(event: any) => setLogoutAnchor(event.currentTarget)}>
											<img
												src={
													user?.memberImage
														? `${REACT_APP_API_URL}/${user?.memberImage}`
														: '/img/profile/defaultUser.svg'
												}
												alt=""
											/>
										</div>

										<Menu
											id="basic-menu"
											anchorEl={logoutAnchor}
											open={logoutOpen}
											onClose={() => {
												setLogoutAnchor(null);
											}}
											sx={{ mt: '5px' }}
										>
											<MenuItem onClick={() => logOut()}>
												<Logout fontSize="small" style={{ color: 'blue', marginRight: '10px' }} />
												Logout
											</MenuItem>
										</Menu>
									</>
								) : (
									<Link href={'/account/join'}>
										<div className={'join-box'}>
											<AccountCircleOutlinedIcon />
											<span>
												{t('Login')} / {t('Register')}
											</span>
										</div>
									</Link>
								)}

								<div className={'lan-box'}>
									{user?._id && (
										<NotificationsOutlinedIcon
											className={'notification-icon'}
											onClick={() => setNotifOpen(true)}
											style={{ cursor: 'pointer' }}
										/>
									)}
									<RippleBadge style={{ margin: '-18px 0 0 1px' }} badgeContent={unreadCount} />

									<Notifications open={notifOpen} onClose={() => setNotifOpen(false)} />

									<Button
										disableRipple
										className="btn-lang"
										onClick={langClick}
										endIcon={<CaretDown size={14} color="#616161" weight="fill" />}
									>
										<Box component={'div'} className={'flag'}>
											{lang !== null ? (
												<img src={`/img/flag/lang${lang}.png`} alt={'usaFlag'} />
											) : (
												<img src={`/img/flag/langen.png`} alt={'usaFlag'} />
											)}
										</Box>
									</Button>

									<StyledMenu
										className={'styled-menu'}
										anchorEl={anchorEl2}
										open={drop}
										onClose={langClose}
										sx={{ position: 'absolute' }}
									>
										<MenuItem disableRipple onClick={langChoice} id="en">
											<img
												className="img-flag"
												src={'/img/flag/langen.png'}
												onClick={langChoice}
												id="en"
												alt={'usaFlag'}
											/>
											{t('English')}
										</MenuItem>
										<MenuItem disableRipple onClick={langChoice} id="kr">
											<img
												className="img-flag"
												src={'/img/flag/langkr.png'}
												onClick={langChoice}
												id="kr"
												alt={'koreanFlag'}
											/>
											{t('Korean')}
										</MenuItem>
										<MenuItem disableRipple onClick={langChoice} id="tr">
											<img
												className="img-flag"
												src={'/img/flag/langtr.png'}
												onClick={langChoice}
												id="tr"
												alt={'turkiyeFlag'}
											/>
											{t('Turkish')}
										</MenuItem>

										<MenuItem disableRipple onClick={langChoice} id="uz">
											<img
												className="img-flag"
												src={'/img/flag/languz.png'}
												onClick={langChoice}
												id="uz"
												alt={'uzbekFlag'}
											/>
											{t('Uzbek')}
										</MenuItem>

										<MenuItem disableRipple onClick={langChoice} id="ru">
											<img
												className="img-flag"
												src={'/img/flag/langru.png'}
												onClick={langChoice}
												id="ru"
												alt={'russiaFlag'}
											/>
											{t('Russian')}
										</MenuItem>
									</StyledMenu>
								</div>
							</Box>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default withRouter(Top);
