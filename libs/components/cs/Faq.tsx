import React, { SyntheticEvent, useState } from 'react';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { AccordionDetails, Box, Stack, Typography } from '@mui/material';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
	({ theme }) => ({
		border: `1px solid ${theme.palette.divider}`,
		'&:not(:last-child)': {
			borderBottom: 0,
		},
		'&:before': {
			display: 'none',
		},
	}),
);
const AccordionSummary = styled((props: AccordionSummaryProps) => (
	<MuiAccordionSummary expandIcon={<KeyboardArrowDownRoundedIcon sx={{ fontSize: '1.4rem' }} />} {...props} />
))(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : '#fff',
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(180deg)',
	},
	'& .MuiAccordionSummary-content': {
		marginLeft: theme.spacing(1),
	},
}));

const Faq = () => {
	const device = useDeviceDetect();
	const router = useRouter();
	const [category, setCategory] = useState<string>('property');
	const [expanded, setExpanded] = useState<string | false>('panel1');

	/** APOLLO REQUESTS **/
	/** LIFECYCLES **/

	/** HANDLERS **/
	const changeCategoryHandler = (category: string) => {
		setCategory(category);
	};

	const handleChange = (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
		setExpanded(newExpanded ? panel : false);
	};

	const data: any = {
		property: [
			{
				id: '00f5a45ed8897f8090116a01',
				subject: 'Are the places featured on the site trustworthy?',
				content: 'Absolutely. We only share verified and well-reviewed destinations.',
			},
			{
				id: '00f5a45ed8897f8090116a22',
				subject: 'What types of places do you feature?',
				content:
					'We showcase historical landmarks, cultural attractions, hotels, and culinary destinations across Turkey.',
			},
			{
				id: '00f5a45ed8897f8090116a21',
				subject: 'How can I find places I’m interested in?',
				content: 'Use our search bar to explore by category — Historical, Culinary, or Hotel — or browse by region.',
			},
			{
				id: '00f5a45ed8897f8090116a23',
				subject: 'Do you verify the information about each place?',
				content: 'Yes, our team verifies every listing and collaborates with local experts to ensure accuracy.',
			},
			{
				id: '00f5a45ed8897f8090116a24',
				subject: 'What should I consider before visiting a place?',
				content: 'Check its location, accessibility, opening hours, cultural significance, and nearby attractions.',
			},
			{
				id: '00f5a45ed8897f8090116a25',
				subject: 'How often do you update your listings?',
				content: 'Our listings are regularly updated to reflect new spots, reviews, and travel information.',
			},
			{
				id: '00f5a45ed8897f8090116a29',
				subject: 'What if I find incorrect information about a place?',
				content: 'Please report it to us — we’ll verify and update the content immediately.',
			},
			{
				id: '00f5a45ed8897f8090116a28',
				subject: 'Can I suggest a new place to be added?',
				content: 'Yes! You can submit recommendations through our “Suggest a Place” form.',
			},
			{
				id: '00f5a45ed8897f8090116a27',
				subject: 'Can I leave a review about a place I visited?',
				content: 'Of course. You can share your experiences and photos in the review section of each place.',
			},
			{
				id: '00f5a45ed8897f8090116b99',
				subject: 'Do you work directly with local businesses?',
				content: 'Yes, we collaborate with local hotels, restaurants, and guides to support authentic tourism.',
			},
		],
		payment: [
			{
				id: '00f5a45ed8897f8090116a02',
				subject: 'How can I make a booking payment?',
				content: 'You can make payments directly through our secure booking system or verified partners.',
			},
			{
				id: '00f5a45ed8897f8090116a91',
				subject: 'Are there any extra fees?',
				content: 'No hidden fees — you only pay the displayed price for bookings or experiences.',
			},
			{
				id: '00f5a45ed8897f8090116a92',
				subject: 'Do you offer installment options?',
				content: 'For selected experiences, installment payments may be available. Check details on the booking page.',
			},
			{
				id: '00f5a45ed8897f8090116a93',
				subject: 'Is my payment information safe?',
				content: 'Yes. We use industry-grade encryption to keep all payment details secure.',
			},
			{
				id: '00f5a45ed8897f8090116a94',
				subject: 'Can I pay online?',
				content: 'Yes, you can pay online safely using credit/debit cards or trusted payment platforms.',
			},
			{
				id: '00f5a45ed8897f8090116a95',
				subject: 'What if there’s a problem with my payment?',
				content: 'If any issue occurs, please contact our support team — we’ll resolve it quickly.',
			},
			{
				id: '00f5a45ed8897f8090116a96',
				subject: 'Do you offer refunds?',
				content: 'Refunds depend on the experience type and cancellation time. Please check our refund policy.',
			},
			{
				id: '00f5a45ed8897f8090116a97',
				subject: 'Are there discounts available?',
				content: 'Yes! Seasonal discounts and early-bird offers are available on selected tours and stays.',
			},
			{
				id: '00f5a45ed8897f8090116a99',
				subject: 'How long does payment processing take?',
				content: 'Usually within a few minutes, depending on your payment method.',
			},
			{
				id: '00f5a45ed8897f8090116a98',
				subject: 'What happens if I pay late?',
				content: 'Late payments may lead to booking cancellation — please pay before the due date.',
			},
		],
		travelers: [
			{
				id: '00f5a45ed8897f8090116a03',
				subject: 'What should travelers prepare before visiting?',
				content: 'Check travel routes, weather, and local customs before visiting any destination.',
			},
			{
				id: '00f5a45ed8897f8090116a85',
				subject: 'How can I plan my trip within budget?',
				content: 'Plan ahead, compare hotel prices, and take advantage of our special offers.',
			},
			{
				id: '00f5a45ed8897f8090116a84',
				subject: 'What documents do I need for booking?',
				content: 'Typically, you only need your name, contact info, and a valid payment method.',
			},
			{
				id: '00f5a45ed8897f8090116a83',
				subject: 'How do I choose the best destination?',
				content: 'Consider your interests — culture, history, or food — and read reviews from other travelers.',
			},
			{
				id: '00f5a45ed8897f8090116a82',
				subject: 'Can I get travel guidance?',
				content: 'Yes! Our team and local agents can help plan routes or suggest hidden gems.',
			},
			{
				id: '00f5a45ed8897f8090116a81',
				subject: 'What should I watch out for while traveling?',
				content: 'Always respect cultural sites, local traditions, and safety rules.',
			},
			{
				id: '00f5a45ed8897f8090116a80',
				subject: 'Do you provide local guides?',
				content: 'Yes, we partner with certified local guides for selected destinations.',
			},
			{
				id: '00f5a45ed8897f8090116a79',
				subject: 'How long should I stay at each place?',
				content: 'It depends on your interest — culinary trips take a few hours, historical sites may take a full day.',
			},
			{
				id: '00f5a45ed8897f8090116a78',
				subject: 'What’s the advantage of using your platform?',
				content: 'We bring together authentic experiences, trusted places, and local culture in one place.',
			},
			{
				id: '00f5a45ed8897f8090116a77',
				subject: 'Can I cancel my trip after booking?',
				content: 'Yes, but cancellation policies vary — please check each booking’s terms.',
			},
		],
		agents: [
			{
				id: '00f5a45ed8897f8090116a04',
				subject: 'How can I become a local guide or agent?',
				content:
					'You can apply through our “Join as Partner” page and provide basic information about your experience.',
			},
			{
				id: '00f5a45ed8897f8090116a62',
				subject: 'Do I need special qualifications?',
				content: 'Not necessarily — local experience, communication skills, and knowledge of culture are key.',
			},
			{
				id: '00f5a45ed8897f8090116a63',
				subject: 'How do I find travelers as a new agent?',
				content: 'Create attractive listings and engage through our verified agent network.',
			},
			{
				id: '00f5a45ed8897f8090116a64',
				subject: 'How can I promote my listed places?',
				content: 'Use social media, local marketing, and share your listings through our platform.',
			},
			{
				id: '00f5a45ed8897f8090116a65',
				subject: 'How do I handle travelers’ questions or issues?',
				content: 'Communicate clearly and politely. We offer support for agents if needed.',
			},
			{
				id: '00f5a45ed8897f8090116a66',
				subject: 'How can I stay updated with travel trends?',
				content: 'Follow our news section and attend cultural tourism events.',
			},
			{
				id: '00f5a45ed8897f8090116a67',
				subject: 'How do I deal with difficult guests?',
				content: 'Be patient and professional. Focus on resolving issues constructively.',
			},
			{
				id: '00f5a45ed8897f8090116a68',
				subject: 'What tools should I use as an agent?',
				content: 'Use our dashboard for managing listings, messages, and visitor feedback.',
			},
			{
				id: '00f5a45ed8897f8090116a69',
				subject: 'Are there rules for agents?',
				content: 'Yes, all agents must follow our platform’s quality and behavior guidelines.',
			},
			{
				id: '00f5a45ed8897f8090116a70',
				subject: 'How can I grow my reputation as a guide?',
				content: 'Provide honest service, respond quickly, and collect positive reviews.',
			},
		],
		membership: [
			{
				id: '00f5a45ed8897f8090116a05',
				subject: 'Do you have a membership service on your site?',
				content: 'membership service is not available on our site yet!',
			},
			{
				id: '00f5a45ed8897f8090116a60',
				subject: 'What are the benefits of becoming a member on your website?',
				content: 'We currently do not offer membership benefits, but stay tuned for updates on any future offerings.',
			},
			{
				id: '00f5a45ed8897f8090116a59',
				subject: 'Is there a fee associated with becoming a member?',
				content: 'As membership services are not available, there are no associated fees at this time.',
			},
			{
				id: '00f5a45ed8897f8090116a58',
				subject: 'Will membership provide access to exclusive content or features?',
				content: "We don't currently have membership-exclusive content or features.",
			},
			{
				id: '00f5a45ed8897f8090116a57',
				subject: 'How can I sign up for a membership on your site?',
				content: 'As of now, we do not have a sign-up process for memberships.',
			},
			{
				id: '00f5a45ed8897f8090116a56',
				subject: 'Do members receive discounts on property listings or services?',
				content: 'Membership discounts are not part of our current offerings.',
			},
			{
				id: '00f5a45ed8897f8090116a55',
				subject: 'Are there plans to introduce a membership program in the future?',
				content:
					"While we can't confirm any plans at this time, we're always exploring ways to enhance our services for users.",
			},
			{
				id: '00f5a45ed8897f8090116a54',
				subject: 'What kind of content or benefits can members expect if a membership program is introduced?',
				content: "We're evaluating potential benefits and features, but specifics are not available yet.",
			},
			{
				id: '00f5a45ed8897f8090116a33',
				subject: 'Do you offer a premium membership option on your platform?',
				content: 'Currently, we do not provide a premium membership option.',
			},
			{
				id: '00f5a45ed8897f8090116a32',
				subject: 'Will membership grant access to exclusive deals or discounts?',
				content: 'Membership perks, including deals or discounts, are not available at this time.',
			},
		],
		community: [
			{
				id: '00f5a45ed8897f8090116a06',
				subject: 'What should I do if I see offensive or false posts?',
				content: 'Please report them immediately or contact our support team.',
			},
			{
				id: '00f5a45ed8897f8090116a44',
				subject: 'How can I participate in the community?',
				content: 'Sign up and join discussions about food, culture, and travel tips.',
			},
			{
				id: '00f5a45ed8897f8090116a45',
				subject: 'Are there posting rules?',
				content: 'Yes, please follow our community guidelines to keep discussions respectful.',
			},
			{
				id: '00f5a45ed8897f8090116a48',
				subject: 'Can I share my travel experiences?',
				content: 'Definitely! You can post stories, photos, and reviews of your trips.',
			},
			{
				id: '00f5a45ed8897f8090116a50',
				subject: 'How can I contribute positively?',
				content: 'Be respectful, helpful, and share authentic insights.',
			},
		],
		other: [
			{
				id: '00f5a45ed8897f8090116a40',
				subject: 'Can I collaborate with your project?',
				content: 'We welcome partnerships related to culture, travel, and culinary tourism.',
			},
			{
				id: '00f5a45ed8897f8090116a39',
				subject: 'Can I advertise my hotel or restaurant?',
				content: 'Yes, verified partners can apply through our business collaboration page.',
			},
			{
				id: '00f5a45ed8897f8090116a38',
				subject: 'Do you host cultural events?',
				content: 'Yes, we occasionally host online and local events — check our News page.',
			},
			{
				id: '00f5a45ed8897f8090116a30',
				subject: 'Can I suggest a new feature?',
				content: 'We always welcome ideas — please contact us through our feedback form.',
			},
		],
	};

	if (device === 'mobile') {
		return <div>FAQ MOBILE</div>;
	} else {
		return (
			<Stack className={'faq-content'}>
				<Box className={'categories'} component={'div'}>
					<div
						className={category === 'property' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('property');
						}}
					>
						Property
					</div>
					<div
						className={category === 'payment' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('payment');
						}}
					>
						Payment
					</div>
					<div
						className={category === 'travelers' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('travelers');
						}}
					>
						Travelers
					</div>
					<div
						className={category === 'agents' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('agents');
						}}
					>
						For Agents
					</div>
					<div
						className={category === 'membership' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('membership');
						}}
					>
						Membership
					</div>
					<div
						className={category === 'community' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('community');
						}}
					>
						Community
					</div>
					<div
						className={category === 'other' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('other');
						}}
					>
						Other
					</div>
				</Box>
				<Box className={'wrap'} component={'div'}>
					{data[category] &&
						data[category].map((ele: any) => (
							<Accordion expanded={expanded === ele?.id} onChange={handleChange(ele?.id)} key={ele?.subject}>
								<AccordionSummary id="panel1d-header" className="question" aria-controls="panel1d-content">
									<Typography className="badge" variant={'h4'}>
										Q
									</Typography>
									<Typography> {ele?.subject}</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Stack className={'answer flex-box'}>
										<Typography className="badge" variant={'h4'} color={'primary'}>
											A
										</Typography>
										<Typography> {ele?.content}</Typography>
									</Stack>
								</AccordionDetails>
							</Accordion>
						))}
				</Box>
			</Stack>
		);
	}
};

export default Faq;
