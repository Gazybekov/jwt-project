import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContextProvider";
import { useEffect } from "react";

function NavScrollExample() {
  const { currenUser, handleLogout, checkAuth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("tokens")) {
      checkAuth();
    }
  }, []);
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
            <NavDropdown title="Account" id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={() => navigate("/register")}>
                Register
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/login")}>
                Login
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Product" id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={() => navigate("/products")}>
                Product List
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/addProduct")}>
                Add Product
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="#" disabled>
              {currenUser ? currenUser : "No auth user"}
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
