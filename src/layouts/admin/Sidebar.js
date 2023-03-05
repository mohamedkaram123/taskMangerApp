import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import { routes } from "../../urls";

const navigation = [
  {
    title: "Dashboard",
    href: routes.home_route,
    icon: "bi bi-speedometer2",
  },
  {
    title: "Empolyees",
    href: routes.empolyee_route,
    icon: "bi bi-people",
  },
  {
    title: "Departments",
    href: routes.department_route,
    icon: "bi bi-building",
  },
  {
    title: "Tasks",
    href: routes.task_route,
    icon: "bi bi-card-text",
  },
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="p-3">
      <div  className="d-flex align-items-center justify-content-center">
        <Logo />
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => showMobilemenu()}
        ></Button>
      </div>
      <hr />

      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
 
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
