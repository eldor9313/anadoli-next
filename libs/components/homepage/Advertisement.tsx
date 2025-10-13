import React, { useRef, useState, useCallback } from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Stack } from '@mui/material';

const videos = [
	{
		id: 1,
		src: '/video/tv/001.mp4',
		title: 'Safe Tourism Türkiye',
		desc: 'Experience Türkiye with world-class safety and hospitality.',
	},
	{
		id: 2,
		src: '/video/tv/002.mp4',
		title: 'Most Shareable Moments',
		desc: 'Türkiye offers unforgettable experiences!',
	},
	{ id: 3, src: '/video/tv/003.mp4', title: 'Beautiful Landscapes', desc: "Explore Türkiye's amazing scenery." },
	{ id: 4, src: '/video/tv/004.mp4', title: 'Cultural Highlights', desc: "Discover Türkiye's rich culture." },
	{ id: 5, src: '/video/tv/005.mp4', title: 'Adventure & Nature', desc: 'Adventure awaits in Türkiye!' },
	{ id: 6, src: '/video/tv/005.mp4', title: 'Adventure & Nature', desc: 'Adventure awaits in Türkiye!' },
];

const Advertisement = () => {
	const device = useDeviceDetect();
	const [playingVideoId, setPlayingVideoId] = useState<number | null>(null);
	const carouselRef = useRef<HTMLDivElement>(null);
	const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

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
		carouselRef.current?.scrollBy({ left: -400, behavior: 'smooth' });
	};

	const scrollRight = () => {
		carouselRef.current?.scrollBy({ left: 400, behavior: 'smooth' });
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
			<div className={'tv-text'}>
				<span>Anadoli TV</span>
			</div>
			<Stack className="video-carousel-container">
				<button className="scroll-btn left" onClick={scrollLeft}>
					‹
				</button>
				<div className="video-carousel" ref={carouselRef}>
					{videos.map((video) => (
						<div className="tv-card" key={video.id}>
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
