import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Property } from '../../types/property/property';
import Link from 'next/link';
import { formatterStr } from '../../utils';
import { REACT_APP_API_URL, topPropertyRank } from '../../config';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

interface PropertyCardType {
	property: Property;
	likePropertyHandler?: any;
	myFavorites?: boolean;
	recentlyVisited?: boolean;
}

const PropertyCard = (props: PropertyCardType) => {
	const { property, likePropertyHandler, myFavorites, recentlyVisited } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const imagePath: string = property?.propertyImages[0]
		? `${REACT_APP_API_URL}/${property?.propertyImages[0]}`
		: '/img/banner/header1.webp';

	if (device === 'mobile') {
		return <div>PROPERTY CARD</div>;
	} else {
		return (
			<Stack className="card-config">
				<Stack className="top">
					<Link
						href={{
							pathname: '/property/detail',
							query: { id: property?._id },
						}}
					>
						<img src={imagePath} alt="" />
					</Link>
					{property && property?.propertyRank > topPropertyRank && (
						<Box component={'div'} className={'top-badge'}>
							<img src="/img/icons/electricity.svg" alt="" />
							<span>TOP</span>
						</Box>
					)}
					<Box component={'div'} className={'price-box'}>
						<Typography>${formatterStr(property?.propertyPrice)}</Typography>
					</Box>
				</Stack>
				<Stack className="bottom">
					<Stack className="name-address">
						<Stack className="name">
							<Link
								href={{
									pathname: '/property/detail',
									query: { id: property?._id },
								}}
							>
								<Typography>{property.propertyTitle}</Typography>
							</Link>
						</Stack>
						<Stack className="address">
							<Typography>
								{property.propertyAddress}, {property.propertyLocation}
							</Typography>
						</Stack>
					</Stack>
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
					<Stack className="divider"></Stack>
					<Stack className="type-buttons">
						<Stack className="type">
							<Typography sx={{ fontWeight: 500, fontSize: '13px' }}>{property.propertyType}</Typography>
						</Stack>
						{!recentlyVisited && (
							<Stack className="buttons">
								<IconButton color={'default'}>
									<RemoveRedEyeIcon />
								</IconButton>
								<Typography className="view-cnt">{property?.propertyViews}</Typography>
								<IconButton color={'default'} onClick={() => likePropertyHandler(user, property?._id)}>
									{myFavorites ? (
										<FavoriteIcon color="secondary" />
									) : property?.meLiked && property?.meLiked[0]?.myFavorite ? (
										<FavoriteIcon style={{ color: ' #217cc7' }} />
									) : (
										<FavoriteBorderIcon />
									)}
								</IconButton>
								<Typography className="view-cnt">{property?.propertyLikes}</Typography>
							</Stack>
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default PropertyCard;
