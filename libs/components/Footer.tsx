import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import useDeviceDetect from '../hooks/useDeviceDetect';
import { Stack, Box, Link } from '@mui/material';
import moment from 'moment';
import { useTranslation } from 'next-i18next';

const Footer = () => {
	const device = useDeviceDetect();

	const { t, i18n } = useTranslation('common');

	if (device == 'mobile') {
		return (
			<Stack className={'footer-container'}>
				<Stack className={'main'}>
					<Stack className={'left'}>
						<Box component={'div'} className={'footer-box'}>
							<img src="/img/logo/logoWhite.svg" alt="" className={'logo'} />
						</Box>
						<Box component={'div'} className={'footer-box'}>
							<span>total free customer care</span>
							<p>+82 10 4867 2909</p>
						</Box>
						<Box component={'div'} className={'footer-box'}>
							<span>nee live</span>
							<p>+82 10 4867 2909</p>
							<span>Support?</span>
						</Box>
						<Box component={'div'} className={'footer-box'}>
							<p>follow us on social media</p>
							<div className={'media-box'}>
								<FacebookOutlinedIcon />
								<TelegramIcon />
								<InstagramIcon />
								<TwitterIcon />
							</div>
						</Box>
					</Stack>
					<Stack className={'right'}>
						<Box component={'div'} className={'bottom'}>
							<div>
								<strong>Popular Search</strong>
								<span>Property for Rent</span>
								<span>Property Low to hide</span>
							</div>
							<div>
								<strong>Quick Links</strong>
								<span>Terms of Use</span>
								<span>Privacy Policy</span>
								<span>Pricing Plans</span>
								<span>Our Services</span>
								<span>Contact Support</span>
								<span>FAQs</span>
							</div>
							<div>
								<strong>Discover</strong>
								<span>Seoul</span>
								<span>Gyeongido</span>
								<span>Busan</span>
								<span>Jejudo</span>
							</div>
						</Box>
					</Stack>
				</Stack>
				<Stack className={'second'}>
					<span>© Anadoli - All rights reserved. Anadoli {moment().year()}</span>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'footer-container'}>
				<Stack className={'main'}>
					<Stack className={'left'}>
						<Box component={'div'} className={'footer-box'}>
							<span>{t('footer.support')}</span>
							<p>+82 10 8747 9313</p>
						</Box>
						<Box component={'div'} className={'footer-box'}>
							<span>{t('footer.live')}</span>
							<p>+82 10 8747 9313</p>
						</Box>
						<Box component={'div'} className={'footer-box'}>
							<span>{t('footer.connect')}</span>
							<div className={'media-box'}>
								<FacebookOutlinedIcon />
								<TelegramIcon />
								<InstagramIcon />
								<TwitterIcon />
								<YouTubeIcon />
							</div>
						</Box>
					</Stack>
					<Stack>
						<div className="footer-box">
							<Link href={'/'}>
								<img src="/img/logo/logofoot001.png" alt="" className={'logo'} />
							</Link>
						</div>
					</Stack>
					<Stack className={'right'}>
						<Box component={'div'} className={'top'}>
							<strong>
								<strong>
									{t('footer.discoverLine1')} <br />
									{t('footer.discoverLine2')} <br />
									{t('footer.discoverLine3')}
								</strong>
							</strong>
							<div>
								<input type="text" placeholder={'Your Email'} />
								<span>{t('footer.subscribe')}</span>
							</div>

							<label className={'custom-checkbox'}>
								<input type="checkbox" />
								<span className={'checkmark'}></span>
								<p>{t('footer.checkbox')}</p>
							</label>
						</Box>
					</Stack>
				</Stack>
				<Stack className={'second'}>
					<span>{t('footer.copyright')}</span>
					<div className={'pts'}>
						<a href="/privacy">{t('footer.privacy')}</a>
						<a href="/terms">{t('footer.terms')}</a>
						<a href="/sitemap">{t('footer.sitemap')}</a>
					</div>
				</Stack>
			</Stack>
		);
	}
};

export default Footer;
