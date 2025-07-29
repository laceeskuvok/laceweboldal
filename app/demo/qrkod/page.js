'use client';

import { motion } from 'framer-motion';
import { Mail, Smartphone, Video, Gift, Smile, Star } from 'lucide-react';
import Link from "next/link";

export default function QrCodePage() {
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    const benefits = [
        { icon: <Smile/>, title: 'Személyesebb', text: 'Már a meghívás pillanatában megérinti a vendégeket.'},
        { icon: <Gift/>, title: 'Emlékezetesebb', text: 'Maradandó emlék lesz, nem csak egy papírlap.'},
        { icon: <Star/>, title: 'Modernebb', text: 'Egy szívből jövő, mégis innovatív gesztus.'},
    ];

    return (
        <>
            {/* Header helyett egy egyszerűsített navigáció, ha ez egy demó aloldal */}
            <header className="absolute top-0 left-0 w-full p-8 z-10">
            </header>
            <main className="bg-gradient-to-b from-rose-50 to-white text-brand-text font-body">
                
                {/* HERO SZEKCIÓ */}
                <section className="text-center pt-32 pb-20 px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <h1 className="font-serif text-5xl md:text-7xl italic text-brand-rose">A Ti Hangotok. A Ti Történetetek.</h1>
                        <p className="mt-6 text-lg max-w-3xl mx-auto text-gray-600 leading-relaxed">
                            Képzeld el, hogy a vendégeid nemcsak egy csodaszép meghívót tartanak a kezükben, hanem meghallhatják a hangotokat, láthatják a mosolyotokat, és egy pillanatra úgy érzik, már együtt ünnepelnek Veletek – még az esküvő előtt.
                        </p>
                        <p className="mt-4 text-xl font-semibold max-w-3xl mx-auto text-brand-text">
                            Ezt adja Nektek a QR-kódos videóüzenet.
                        </p>
                    </motion.div>
                </section>

                {/* HOGYAN MŰKÖDIK? SZEKCIÓ */}
                <section className="py-20 px-6">
                    <motion.div 
                        className="max-w-4xl mx-auto text-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={itemVariants} className="font-serif text-4xl md:text-5xl">Hogyan Működik?</motion.h2>
                        <motion.div variants={itemVariants} className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4">
                            <div className="text-center w-48"><Mail size={40} className="mx-auto text-brand-rose"/> <p className="mt-2 text-sm">1. A QR-kód diszkréten rákerül a meghívóra.</p></div>
                            <div className="text-2xl text-gray-300">→</div>
                            <div className="text-center w-48"><Smartphone size={40} className="mx-auto text-brand-rose"/> <p className="mt-2 text-sm">2. A vendég beolvassa a kódot a telefonjával.</p></div>
                             <div className="text-2xl text-gray-300">→</div>
                            <div className="text-center w-48"><Video size={40} className="mx-auto text-brand-rose"/> <p className="mt-2 text-sm">3. És már indul is a személyes videóüzenet!</p></div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* MIÉRT KÜLÖNLEGES? SZEKCIÓ */}
                <section className="py-20 px-6 bg-white">
                     <motion.div 
                        className="max-w-4xl mx-auto text-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={itemVariants} className="font-serif text-4xl md:text-5xl">Miért Igazán Különleges?</motion.h2>
                        <motion.div variants={itemVariants} className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
                            {benefits.map(benefit => (
                                <div key={benefit.title}>
                                    <div className="w-16 h-16 bg-brand-pale-pink rounded-full mx-auto flex items-center justify-center">{benefit.icon}</div>
                                    <h3 className="font-serif text-2xl mt-4 text-brand-text">{benefit.title}</h3>
                                    <p className="text-gray-500 mt-2">{benefit.text}</p>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </section>

                 {/* NEKTEK CSAK ANNYI A DOLGOTOK... SZEKCIÓ */}
                <section className="py-20 px-6">
                    <motion.div 
                        className="max-w-2xl mx-auto text-center bg-brand-pale-pink/50 p-12 rounded-2xl"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="font-serif text-3xl text-brand-text">Nektek csak annyi a dolgotok, hogy...</h2>
                        <p className="mt-4 text-gray-600 leading-relaxed">
                            ...elkülditek nekem a videót – én pedig gondoskodom róla, hogy stílusosan, elegánsan és működőképesen belekerüljön az általatok választott papírtermékbe.
                        </p>
                         <Link href="/kapcsolat?kollekcio=QR+Kódos+Videóüzenet" passHref legacyBehavior>
                            <a className="btn-primary mt-8">Kérem a meghívómra!</a>
                        </Link>
                    </motion.div>
                </section>
            </main>
        </>
    );
}