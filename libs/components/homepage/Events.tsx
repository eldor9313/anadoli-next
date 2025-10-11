import React from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
interface EventData {
	eventTitle: string;
	city: string;
	description: string;
	imageSrc: string;
}
const eventsData: EventData[] = [
	{
		eventTitle: 'Istanbul Tulip Festival',
		city: 'Istanbul',
		description: 'Enjoy the stunning tulip displays at Istanbul’s annual festival!',
		imageSrc: '/img/events/tulip.jpeg',
	},
	{
		eventTitle: 'Whirling Dervishes Festival',
		city: 'Konya',
		description: 'Witness the spiritual Whirling Dervishes ceremony in Konya!',
		imageSrc: '/img/events/mevlana.jpeg',
	},
	{
		eventTitle: 'Camel Wrestling Festival',
		city: 'Eskisehir',
		description: 'Experience the thrilling Camel Wrestling Festival in Eskisehir!',
		imageSrc: '/img/events/camel.jpg',
	},

	{
		eventTitle: 'The Hot Air Balloon Festival',
		city: 'Cappadocia',
		description: 'See colorful hot air balloons over Cappadocia’s skies!',
		imageSrc: '/img/events/ballon3.jpg',
	},
];
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
	if (device === 'mobile') {
		return <div>EVENT CARD</div>;
	} else {
		return (
			<Stack className={'events'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span className="white">Festivals & Events</span>
							<p className="white">Discover Türkiye’s vibrant celebrations</p>
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
