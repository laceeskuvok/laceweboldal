// app/page.js
import HomeClient from './HomeClient';

export const metadata = {
  title: 'Főoldal | Lace Prémium Esküvői Meghívók',
  description: 'Tedd felejthetetlenné a nagy napot a Lace egyedi, prémium esküvői meghívóival. Fedezd fel a The Layered és The Folded kollekciókat!',
};

export default function Page() {
  return <HomeClient />;
}