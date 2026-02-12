import Image from 'next/image';

// Később ezt a listát egyszerűen bővítheted az új munkákkal
const portfolioItems = [
  { id: 1, title: 'Klasszikus Elegancia', imageUrl: '/images/eskuvoihirlap.jpg' },
  { id: 2, title: 'Modern Minimalista', imageUrl: '/images/eskuvoihirlap.jpg' },
  { id: 3, title: 'Rusztikus Varázs', imageUrl: '/images/eskuvoihirlap.jpg' },
  // A 3 új tervnek itt hagyunk helyet
  { id: 4, title: 'Terv 4', imageUrl: '/images/eskuvoihirlap.jpg' },
  { id: 5, title: 'Terv 5', imageUrl: '/images/eskuvoihirlap.jpg' },
  { id: 6, title: 'Terv 6', imageUrl: '/images/eskuvoihirlap.jpg' },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-20 px-8 bg-pale-pink">
      <div className="text-center mb-12">
        <h2 className="font-serif text-5xl font-bold text-dark-text">Portfólió</h2>
        <p className="font-sans mt-2 text-lg text-gray-600">Szeretettel készült meghívók</p>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioItems.map((item) => (
          <div key={item.id} className="group relative overflow-hidden bg-white shadow-lg rounded-md">
             <Image 
                src={item.imageUrl} 
                alt={item.title} 
                width={500} 
                height={700}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="font-serif text-2xl text-white">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;