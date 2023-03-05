import LogoDark  from "../../assets/images/logos/logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <img src={LogoDark} className="mr-4" style={{ width:50,height:50,borderRadius:10 }} alt="My Image" />
    </Link>
  );
};

export default Logo;
