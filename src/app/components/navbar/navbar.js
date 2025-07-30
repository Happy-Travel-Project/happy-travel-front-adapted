'use client';
import Image from 'next/image';
import logo from '../../../../public/Logo.png';
import home from '../../../../public/Home-icon.png';
import myPage from '../../../../public/myDestinations-icon.png';
import avatar from '../../../../public/Avatar-icon.png';
import logout from '../../../../public/Logout-icon.png';
import create from '../../../../public/Create-icon.png';
import styles from './navbar.module.css';
import Link from 'next/link';
import { useAuthContext } from '@/context/authContext';

function Navbar() {

  const { isAuthenticated } = useAuthContext();

  return (
    <header className={styles.ctHeader}>
      <Image
        src={logo}
        width={85}
        height={85}
        alt='happy travel logo'
      />
      <nav className={styles.ctNav}>
        <Link href={'/'}>
          <Image
            src={home}
                width={60}
                height={60}
            alt='home'
          />
        </Link>
        {
          isAuthenticated && ( 
          <>
            <Link href='/auth'>
              <Image
                src={myPage}
                width={60}
                height={60}
                alt='mis destinos'
              />
            </Link>
            <Link href='/create'>
              <Image
                src={create}
                width={60}
                height={60}
                alt='crear destino'
              />
            </Link>
            <Link href='/auth/logout'>
              <Image
                src={logout}
                width={60}
                height={60}
                alt='logout'
                className={styles.imgLogout}
              />
            </Link>
          </>)
        }
        {
          !isAuthenticated && ( 
          <Link href={'/login'}>
            <Image
              src={avatar}
                width={60}
                height={60}
              alt='login'
            />
          </Link>)
        }
      </nav>
    </header>
  )
}

export default Navbar