import Image from 'next/image';

const About = () => {
  return (
    <section id="about" className="py-20 px-8">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/3">
          <Image 
            src="/images/LACE_logo.png" // Ezt cseréld majd le a saját képedre!
            alt="Vivi, a grafikus"
            width={300}
            height={300}
            className="rounded-full shadow-xl mx-auto"
          />
        </div>
        <div className="md:w-2/3 text-center md:text-left">
          <h2 className="font-serif text-4xl font-bold text-dark-text mb-4">Üdvözöllek!</h2>
          <p className="font-sans text-lg leading-relaxed text-gray-700">
            Szia, Vivi vagyok, a kreatív elme a VIVI GRAFIKA mögött. Szenvedélyem a gyönyörű és egyedi esküvői meghívók tervezése, amelyek tökéletesen tükrözik a párok stílusát és történetét. Célom, hogy minden egyes alkotásommal maradandó emléket teremtsek.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;