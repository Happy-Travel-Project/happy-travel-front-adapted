import { useAuthContext } from '@/context/authContext';
import styles from './trip.module.css';
import Image from 'next/image';
import Link from 'next/link';
import edit from '../../../../public/Edit-icon.png';
import del from '../../../../public/Delete-icon.png';
import { usePathname } from 'next/navigation';

function Trip({ trip }) {
	const { country, city, description, image, user: tripUser } = trip;
	const { isAuthenticated, username } = useAuthContext();
	const pathname = usePathname();
	const isOwner =
		isAuthenticated &&
		username?.toLowerCase() === tripUser?.username?.toLowerCase();
	const showEditDelete = isOwner && pathname == '/auth';

	return (
		<div className={styles.ctTrip}>
			<Link href={`/destinations/${trip.id}`}>
				<div className={styles.ctImg}>
					<Image
						src={`${image}`}
						height={300}
						width={300}
						alt={country}
						priority
					/>
				</div>
			</Link>

			<div className={styles.ctTxt}>
				<div>
					<h6>{country}</h6>
					<p>{city}</p>
				</div>
				{isOwner && showEditDelete && (
					<div>
						<Link href={`/update/${trip.id}`}>
							<Image
								src={edit}
								height={40}
								width={40}
								alt='edit destination'
							/>
						</Link>
						<Link href={`/delete/${trip.id}`}>
							<Image
								src={del}
								height={40}
								width={40}
								alt='delete destination'
							/>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}

export default Trip;
