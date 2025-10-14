import React, { useRef, useState, useCallback, useEffect } from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Box, Stack } from '@mui/material';

const videos = [
	{
		id: 1,
		src: '/video/tv/002.mp4',
		title: 'Safe Tourism Türkiye',
		desc: 'Experience Türkiye with world-class safety and hospitality.',
	},
	{
		id: 2,
		src: '/video/tv/003.mp4',
		title: 'Most Shareable Moments',
		desc: 'Türkiye offers unforgettable experiences!',
	},
	{ id: 3, src: '/video/tv/004.mp4', title: 'Beautiful Landscapes', desc: "Explore Türkiye's amazing scenery." },
	{
		id: 4,
		src: '/video/tv/005.mp4',
		title: 'Discover Muğla',
		desc: 'Sunny beaches, turquoise waters, and unforgettable holidays in Muğla, Türkiye.',
	},
	{ id: 5, src: '/video/tv/006.mp4', title: 'Adventure & Nature', desc: 'Adventure awaits in Türkiye!' },
	{
		id: 6,
		src: '/video/tv/007.mp4',
		title: 'Winter Wonderland Türkiye',
		desc: 'Snowy mountains, cozy villages, and magical winter adventures await in Türkiye.',
	},
	{
		id: 7,
		src: '/video/tv/008.mp4',
		title: 'Kids Love Türkiye',
		desc: 'Fun adventures, amazing sights, and magical moments for the whole family in Türkiye!',
	},
	{
		id: 8,
		src: '/video/tv/009.mp4',
		title: 'Göbekli Tepe',
		desc: 'Explore the world’s oldest temple and uncover the mysteries of ancient Türkiye.',
	},
	{
		id: 9,
		src: '/video/tv/010.mp4',
		title: 'Taste of Türkiye',
		desc: 'Experience the rich flavors and culinary traditions of Türkiye.',
	},
	{
		id: 10,
		src: '/video/tv/012.mp4',
		title: 'Cappadocia Dreams',
		desc: 'Fly above the fairy chimneys and feel the magic of Cappadocia’s sunrise.',
	},
];

const Advertisement = () => {
	const device = useDeviceDetect();
	const [playingVideoId, setPlayingVideoId] = useState<number | null>(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const carouselRef = useRef<HTMLDivElement>(null);
	const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

	// Faqat 3 ta videoni ko'rsatish
	const visibleVideos = videos.slice(currentIndex, currentIndex + 3);

	// Agar oxiriga yetib borsa, boshidan boshlash
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
					<span>Anadoli </span>
					<p>tv</p>
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
