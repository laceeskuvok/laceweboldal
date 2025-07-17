const Footer = () => {
    return (
      <footer id="contact" className="text-center py-8 bg-pale-pink/50">
        <p className="font-sans text-sm text-gray-600">
          &copy; {new Date().getFullYear()} VIVI GRAFIKA - Minden jog fenntartva.
        </p>
        <p className="font-sans text-rose-gold mt-2">
          <a href="mailto:email@example.com" className="hover:underline">email@example.com</a>
        </p>
      </footer>
    );
  };
  
  export default Footer;