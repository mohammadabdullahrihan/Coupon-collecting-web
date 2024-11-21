import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const MainLayout = () => {
    return (
        <div className='font-poppins'> 
            
            {/* Navbar */}
            
            <Navbar />

            {/* Dynamic section */}

            <div className='min-h-[calc(100vh-232px)] mx-auto px-12 py-12'>
                
                 <Outlet />
            </div>
                 
            <Footer />
            {/* footer */}
            <ToastContainer />
        </div>
    );
};

export default MainLayout;