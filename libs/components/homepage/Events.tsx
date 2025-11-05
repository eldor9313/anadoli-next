import React from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useTranslation } from 'next-i18next';

interface EventData {
	eventTitle: string;
	city: string;
	description: string;
	imageSrc: string;
}

const EventCard = ({ event }: { event: EventData }) => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return <div>EVENT CARD</div>;
	} else {
		return (
			<Stack
				className="event-card"
				style={{
					backgroundImage: `url(${event?.imageSrc})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
				}}
			>
				<Box component={'div'} className={'info'}>
					<strong>{event?.city}</strong>
					<span>{event?.eventTitle}</span>
				</Box>
				<Box component={'div'} className={'more'}>
					<span>{event?.description}</span>
				</Box>
			</Stack>
		);
	}
};
const Events = () => {
	const device = useDeviceDetect();
	const { t, i18n } = useTranslation('common');

	const eventsData: EventData[] = [
		{
			eventTitle: t('events.tulip.title'),
			city: t('events.tulip.city'),
			description: t('events.tulip.desc'),
			imageSrc: '/img/events/tulip.jpeg',
		},
		{
			eventTitle: t('events.dervish.title'),
			city: t('events.dervish.city'),
			description: t('events.dervish.desc'),
			imageSrc: '/img/events/mevlana.jpeg',
		},
		{
			eventTitle: t('events.camel.title'),
			city: t('events.camel.city'),
			description: t('events.camel.desc'),
			imageSrc: '/img/events/camel.jpg',
		},
		{
			eventTitle: t('events.balloon.title'),
			city: t('events.balloon.city'),
			description: t('events.balloon.desc'),
			imageSrc: '/img/events/ballon3.jpg',
		},
	];

	if (device === 'mobile') {
		return <div>EVENT CARD</div>;
	} else {
		return (
			<Stack className={'events'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span className="white">{t('festival.title')}</span>
							<p className="white">{t('festival.desc')}</p>
						</Box>
					</Stack>
					<Stack className={'card-wrapper'}>
						{eventsData.map((event: EventData) => {
							return <EventCard event={event} key={event?.eventTitle} />;
						})}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};
export default Events;
