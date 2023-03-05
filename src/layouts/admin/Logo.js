import LogoDark  from "../../assets/images/logos/logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <img src={LogoDark}  style={{ width:100,height:100 }} alt="My Image" />
    </Link>
  );
};

export default Logo;
