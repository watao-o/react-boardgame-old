import { Link } from "react-router-dom"
import "./footer.css"

const Footer = () => {
  return (
    <>
      
      <footer>
        <ul className="md-flex">
          <li><Link to="/">Homeページへ</Link></li>
          <li><a href="#https://github.com/watao-o/react-boardgame">サイトマップ</a></li>
          <li><a href="#https://github.com/watao-o/react-boardgame">github</a></li>
        </ul>
        <p className="copyright">© 2023 watao. All Rights Reserved.</p>
      </footer>
    </>
  )
}

export default Footer