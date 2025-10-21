import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Property } from '../../types/property/property';
import { REACT_APP_API_URL, topPropertyRank } from '../../config';
import { formatterStr } from '../../utils';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { useRouter } from 'next/router';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

interface PropertyBigCardProps {
	property: Property;
	likePropertyHandler?: any;
}

const PropertyBigCard = (props: PropertyBigCardProps) => {
	const { property, likePropertyHandler } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const router = useRouter();

	/** HANDLERS **/
	const goPropertyDetatilPage = (propertyId: string) => {
		router.push(`/property/detail?id=${propertyId}`);
	};

	if (device === 'mobile') {
		return <div>APARTMEND BIG CARD</div>;
	} else {
		return (
			<Stack className="property-big-card-box" onClick={() => goPropertyDetatilPage(property?._id)}>
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${property?.propertyImages?.[0]})` }}
				>
					{property && property?.propertyRank >= topPropertyRank && (
						<Box component={'div'} className={'top-badge'}>
							<img src="/img/icons/electricity.svg" alt="" />
							<span>TOP</span>
						</Box>
					)}

					<Box component={'div'} className={'price-box'}>
						<Typography>${formatterStr(property?.propertyPrice)}</Typography>
					</Box>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'}>{property?.propertyTitle}</strong>
					<p className={'desc'}>{property?.propertyAddress}</p>
					{property.propertyType === 'HOTEL' && (
						<Stack className="options">
							<Stack className="option">
								<img src="/img/icons/bed.svg" alt="" />
								<Typography>{property.propertyBeds} bed</Typography>
							</Stack>
							<Stack className="option">
								<img src="/img/icons/room.svg" alt="" />
								<Typography>{property.propertyRooms} room</Typography>
							</Stack>
							<Stack className="option">
								<img src="/img/icons/expand.svg" alt="" />
								<Typography>{property.propertySquare} m2</Typography>
							</Stack>
						</Stack>
					)}
					{property.propertyType === 'HISTORICAL' && (
						<Stack className="options">
							<Stack className="option">
								<img src="/img/icons/card/wifi.svg" alt="" />
								<Typography> Wifi</Typography>
							</Stack>
							<Stack className="option">
								<img src="/img/icons/card/parking.svg" alt="" />
								<Typography> Parking</Typography>
							</Stack>
							<Stack className="option">
								<img src="/img/icons/card/map.svg" alt="" />
								<Typography>Map</Typography>
							</Stack>
						</Stack>
					)}
					{property.propertyType === 'CULINARY' && (
						<Stack className="options">
							<Stack className="option">
								<img src="/img/icons/card/wifi.svg" alt="" />
								<Typography> Wifi</Typography>
							</Stack>
							<Stack className="option">
								<img src="/img/icons/card/parking.svg" alt="" />
								<Typography> Parking</Typography>
							</Stack>
							<Stack className="option">
								<img src="/img/icons/card/halal1.svg" alt="" />
								<Typography>Halal</Typography>
							</Stack>
						</Stack>
					)}
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<div>
							<p style={{ color: ' #217cc7' }}>{property.propertyType} </p>
						</div>
						<div className="buttons-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{property?.propertyViews}</Typography>
							<IconButton
								color={'default'}
								onClick={(e) => {
									e.stopPropagation();
									likePropertyHandler(user, property?._id);
								}}
							>
								{property?.meLiked && property?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon style={{ color: ' #217cc7' }} />
								) : (
									<FavoriteIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{property?.propertyLikes}</Typography>
						</div>
					</div>
				</Box>
			</Stack>
		);
	}
};

export default PropertyBigCard;
