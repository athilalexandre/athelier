import React from 'react';

const AboutUsPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-serif text-brand-primary mb-8 text-center">Sobre Nós</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-serif text-brand-secondary mb-4">Érika & Athelier Esmeraldo</h2>
        <p className="text-brand-text mb-4 leading-relaxed">
          Bem-vindo ao Athelier Esmeraldo, um espaço onde a paixão pelo artesanato se transforma em peças únicas e cheias de afeto. 
          Fundado por Érika, uma artesã dedicada, nosso athelier nasceu do desejo de compartilhar a beleza e a singularidade do feito à mão.
        </p>
        <p className="text-brand-text mb-4 leading-relaxed">
          Cada item que você encontra aqui é cuidadosamente criado, utilizando materiais de alta qualidade e técnicas artesanais que valorizam os detalhes, texturas e a inspiração por trás de cada criação. Nossa missão é levar até você "amor em forma de artesanato", oferecendo produtos que não apenas adornam, mas também contam histórias e transmitem sentimentos.
        </p>
        <p className="text-brand-text leading-relaxed">
          Explore nossas coleções e sinta a dedicação e o carinho em cada peça.
        </p>
      </div>
    </div>
  );
};

export default AboutUsPage;
