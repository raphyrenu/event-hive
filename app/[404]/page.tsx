// pages/404.js or app/404/page.js
import Link from 'next/link';
import Image from 'next/image';
import logo from '../assets/images/not_found.png';
import Header from '../components/Header';
import Footer from '../components/Footer';


export default function PageNotFound() {
    return (

    <div className="flex flex-col items-center justify-between h-screen bg-background text-foreground font-light font-bayon">
        <Header/>
   <div className='flex flex-col items-center justify-center'>
       <Image
                src={logo}
                alt="Logo"
                  className="mr-2 mb-4"
              />
              <p className="text-2xl mb-6">0ops!</p>
              <p>We can’t seem to find the page you are looking for</p>
          <Link href="/">
            <div className="px-4 py-2 bg-primary text-white rounded-full mt-7">
              Go Back to Home
            </div>

            </Link>
            </div>
            <Footer/>
    </div>
  );
}
