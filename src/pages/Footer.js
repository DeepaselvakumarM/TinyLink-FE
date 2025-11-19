import "../index.css"

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} TinyLink • Fast • Secure • Smart</p>
      <p className="footer-sub">Made with ❤️ for your assessment project</p>
    </footer>
  );
};

export default Footer;
