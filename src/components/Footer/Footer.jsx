import "./Footer.css";

function Footer() {
  const author = "Olga Golubev";
  const dateCreated = "2024";
  return (
    <footer className="footer">
      <p>Developed by {author}</p>
      <p>{dateCreated}</p>
    </footer>
  );
}

export default Footer;
