import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-green-100 text-black py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Section gauche */}
          <div className="text-center md:text-left">
            <h1 className="text-xl font-semibold">CornMaster - Gestion du Maïs</h1>
            <p className="text-sm mt-2">
              Cultivez mieux, récoltez plus avec des pratiques agricoles durables.
            </p>
          </div>

          {/* Section droite */}
          <div className="text-center md:text-right">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Gestion du Maïs. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
