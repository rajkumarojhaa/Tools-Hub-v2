import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full sm:h-20 h-15 flex justify-between items-center p-4 bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg border border-white/20 dark:border-gray-700/20 shadow-md z-50">
      <Link to="/">
      <div
        className="tracking-wider text-2xl text-black dark:text-white gradient-logo"
        style={{ fontFamily: 'Pacifico, cursive' }}
      >
        Rajkumar
      </div>
    </Link>
      <div className="flex items-center">
        <a
          href="https://github.com/rajkumarojhaa"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-white/40 dark:bg-gray-700/40 text-black dark:text-white backdrop-blur-md border border-white/20 dark:border-gray-600/20"
        >
          <FaGithub />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
