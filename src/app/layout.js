import { Inter } from 'next/font/google';
import './globals.css';
import AuthContextProvider from '@/context/authContext';
import Navbar from './components/navbar/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Nomad Pulse',
	description: 'Where your travel stories come alive',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<head>
				<link
					rel='shortcut icon'
					href='/favicon.png'
					type='image/x-icon'
				/>
				<link
					href='https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap'
					rel='stylesheet'
				/>
			</head>
			<body className={inter.className}>
				<AuthContextProvider>
					<Navbar />
					{children}
				</AuthContextProvider>
			</body>
		</html>
	);
}
