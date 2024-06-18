import './Footer.css';

function Footer() {
  const author = 'Olga Golubev';
  const liknedin = 'https://www.linkedin.com/in/olgagolubev/';
  const dateCreated = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>
        Developed by{' '}
        <a className="footer__link" href={liknedin} target="_blank">
          {author}
        </a>
      </p>
      <p>{dateCreated}</p>
    </footer>
  );
}

export default Footer;
