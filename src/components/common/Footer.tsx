import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-center py-8 mt-16 border-t border-gray-200">
      <p className="text-brand-text text-sm">&copy; {new Date().getFullYear()} Athelier Esmeraldo.</p>
      <p className="text-brand-secondary text-xs italic">Amor em forma de artesanato.</p>
    </footer>
  );
};

export default Footer;
