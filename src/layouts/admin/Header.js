import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import { ReactComponent as LogoWhite } from "../../assets/images/logos/xtremelogowhite.svg";
import user1 from "../../assets/images/users/user1.jpg";
import { deleteAllCookies, get } from "../../helper";
import { routes, urls } from "../../urls";

const Header = () => {

  const navigate = useNavigate()
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  
  const logout = async () => {
    try {
      const res = await get(urls.logout_url)
      if(res.statusMsg == "success"){
        deleteAllCookies()
        navigate(routes.login_route)
      }
      
    } catch (err) {
      
    }
  };
  
  return (
    <Navbar style={{backgroundColor:"#4f46e5" }}  dark expand="md">
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none">
          <LogoWhite />
        </NavbarBrand>
        <Button
          color="primary"
          className="d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
            <NavItem>
                <Link to={routes.home_route} className="nav-link text-white">
                  Home
                </Link>
            </NavItem>
            <NavItem>
              <Link to={routes.empolyee_route} className="nav-link text-white">
                Employees
              </Link>
            </NavItem>
            <NavItem>
                <Link to={routes.department_route} className="nav-link text-white">
                  Departments
                </Link>   
            </NavItem>
            <NavItem>
                <Link to={routes.task_route} className="nav-link text-white">
                Tasks
              </Link>
            </NavItem>
        </Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle style={{backgroundColor:"#4f46e5" }} >
            <img
              src={user1}
              alt="profile"
              className="rounded-circle"
              width="30"
            ></img>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Info</DropdownItem>
            
            <DropdownItem onClick={logout}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
