import React, { useRef, useState, useCallback, useEffect } from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Box, Stack } from '@mui/material';
import { useTranslation } from 'next-i18next';

const Advertisement = () => {
	const device = useDeviceDetect();
	const [playingVideoId, setPlayingVideoId] = useState<number | null>(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const carouselRef = useRef<HTMLDivElement>(null);
	const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

	const { t, i18n } = useTranslation('common');

	const videos = [
		{
			id: 1,
			src: '/video/tv/002.mp4',
			title: t('videos.safe.title'),
			desc: t('videos.safe.desc'),
		},
		{
			id: 2,
			src: '/video/tv/003.mp4',
			title: t('videos.moments.title'),
			desc: t('videos.moments.desc'),
		},
		{ id: 3, src: '/video/tv/004.mp4', title: t('videos.landscapes.title'), desc: t('videos.landscapes.desc') },
		{
			id: 4,
			src: '/video/tv/005.mp4',
			title: t('videos.mugla.title'),
			desc: t('videos.mugla.desc'),
		},
		{ id: 5, src: '/video/tv/006.mp4', title: t('videos.adventure.title'), desc: t('videos.adventure.desc') },
		{
			id: 6,
			src: '/video/tv/007.mp4',
			title: t('videos.winter.title'),
			desc: t('videos.winter.desc'),
		},
		{
			id: 7,
			src: '/video/tv/008.mp4',
			title: t('videos.kids.title'),
			desc: t('videos.kids.desc'),
		},
		{
			id: 8,
			src: '/video/tv/009.mp4',
			title: t('videos.gobekli.title'),
			desc: t('videos.gobekli.desc'),
		},
		{
			id: 9,
			src: '/video/tv/010.mp4',
			title: t('videos.taste.title'),
			desc: t('videos.taste.desc'),
		},
		{
			id: 10,
			src: '/video/tv/012.mp4',
			title: t('videos.cappadocia.title'),
			desc: t('videos.cappadocia.desc'),
		},
	];

	const visibleVideos = videos.slice(currentIndex, currentIndex + 3);

	useEffect(() => {
		if (currentIndex + 3 > videos.length) {
			setCurrentIndex(0);
		}
	}, [currentIndex]);

	const handlePlay = useCallback(
		(id: number) => {
			const video = videoRefs.current[id];
			if (!video) return;

			if (playingVideoId === id) {
				video.pause();
				setPlayingVideoId(null);
				return;
			}

			Object.values(videoRefs.current).forEach((v) => {
				if (v && v !== video) {
					v.pause();
				}
			});

			video
				.play()
				.then(() => {
					setPlayingVideoId(id);
				})
				.catch((error) => {
					console.error('Video ijro etishda xatolik:', error);
					setPlayingVideoId(null);
				});
		},
		[playingVideoId],
	);

	const handleVideoClick = (id: number) => {
		handlePlay(id);
	};

	const scrollLeft = () => {
		if (currentIndex > 0) {
			setCurrentIndex((prev) => prev - 1);
		} else {
			setCurrentIndex(videos.length - 3);
		}
	};

	const scrollRight = () => {
		if (currentIndex < videos.length - 3) {
			setCurrentIndex((prev) => prev + 1);
		} else {
			setCurrentIndex(0);
		}
	};

	const handleVideoEnd = useCallback((id: number) => {
		setPlayingVideoId(null);
	}, []);

	if (device === 'mobile') {
		return (
			<div className="video-frame">
				<video autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
					<source src="/video/tv/ads.mov" type="video/mp4" />
				</video>
			</div>
		);
	}

	return (
		<Stack className={'tv-box'}>
			<Stack className={'tv-text'}>
				<Box className={'text'}>
					<span>{t('atv.title')}</span>
					<p>{t('atv.desc')}</p>
				</Box>
			</Stack>
			<Stack className="video-carousel-container">
				<button className="scroll-btn left" onClick={scrollLeft}>
					‹
				</button>

				<div className="video-carousel" ref={carouselRef}>
					{visibleVideos.map((video, index) => (
						<div className={`tv-card ${index === 1 ? 'center-video' : ''}`} key={video.id}>
							<div className="video-container" onClick={() => handleVideoClick(video.id)}>
								<video
									ref={(el) => {
										videoRefs.current[video.id] = el;
										if (el) {
											el.onended = () => handleVideoEnd(video.id);
										}
									}}
									src={video.src}
									muted
									loop
									playsInline
									className={playingVideoId === video.id ? 'playing' : ''}
								/>
								<div className="overlay">
									{playingVideoId !== video.id && <div className="play-icon">▶</div>}
									<div className="info">
										<h3>{video.title}</h3>
										<p>{video.desc}</p>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				<button className="scroll-btn right" onClick={scrollRight}>
					›
				</button>
			</Stack>
		</Stack>
	);
};

export default Advertisement;
