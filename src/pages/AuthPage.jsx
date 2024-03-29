import { Image, Row, Col, Button, Modal, Form } from "react-bootstrap";
import auth from "../assets/auth.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import useLocalStorage from "use-local-storage";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const url =
    "https://4b819a2e-0f43-4093-b3a4-4e8fd1a5d66b-00-10dhgpii5c86u.spock.replit.dev";

  const [showModal, setShowModal] = useState(null);
  const handleShowSignUp = () => setShowModal("SignUp");
  const handleShowSignIn = () => setShowModal("SignIn");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authToken, setAuthToken] = useLocalStorage("authToken", "");

  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      navigate("/bookings");
    }
  }, [authToken, navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/signup`, { username, password });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/login`, { username, password });
      if (res.data && res.data.auth === true && res.data.token) {
        setAuthToken(res.data.token);
        console.log("Login was successful, token saved");

        if (username === "admin@honey.com") {
          navigate("/admin");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => setShowModal(null);

  return (
    <Row>
      <Col sm={6}>
        <Image src={auth} className="vh-100 vw-100" fluid />
      </Col>
      <Col sm={6} className="p-4">
        <i
          className="bi bi-music-note-beamed"
          style={{ fontSize: 50, color: "orange" }}
        />
        <span className="px-3" style={{ fontSize: 40, fontWeight: "bold" }}>
          Honey Music Studio
        </span>

        <h1 className="mt-5" style={{ fontSize: 64 }}>
          Welcome!
        </h1>
        <p className="my-5" style={{ fontSize: 30 }}>
          <b>Honey Music Studio</b> provides facilities for enjoying music in
          all its forms to all members of the local community. The studio is
          equipped with performance and rehearsal spaces for individual and
          group practice.
        </p>

        <Row className="justify-content-evenly text-center">
          <Col sm={6} className="d-grid gap-2 px-5">
            <h4 className="pb-4" style={{ textDecoration: "underline" }}>
              Book A Room
            </h4>
            <Button
              className="rounded-pill"
              variant="warning"
              onClick={handleShowSignIn}
            >
              Sign In
            </Button>
            <Button className="rounded-pill" variant="warning" disabled>
              <i className="bi bi-google" /> Sign in with Google
            </Button>
            <Button className="rounded-pill" variant="warning" disabled>
              <i className="bi bi-facebook" /> Sign in with Facebook
            </Button>

            <p style={{ textAlign: "center" }}>or</p>

            <p className="mt-3" style={{ fontWeight: "bold" }}>
              Sign up for an account
            </p>
            <Button
              className="rounded-pill"
              variant="secondary"
              onClick={handleShowSignUp}
            >
              Sign Up
            </Button>
            <p style={{ fontSize: "12px" }}>
              By signing up, you agree to the Terms of Service and Privacy
              Policy including Cookie Use
            </p>
          </Col>
          <Col sm={6}>
            <h4 style={{ textDecoration: "underline" }}>Operation Hours</h4>

            <p className="pt-4">Monday - Thursday : 9am to 10pm</p>
            <p>Friday : 9am to 6pm</p>
            <p>Saturday & Sunday : 10am to 4pm</p>
            <p style={{ fontWeight: "bold", color: "darkred" }}>
              <i className="bi bi-exclamation-circle-fill pe-2" />
              Closed on public holidays
            </p>
            <div
              className="p-2 mx-4"
              style={{
                textAlign: "start",
                border: "1px solid black",
                borderRadius: "12px",
              }}
            >
              <i>
                <i className="bi bi-info-circle pe-1" />
                There may be exceptions to these times, which will be
                communicated through our members&apos; newsletter.
              </i>
            </div>
          </Col>
          <Modal
            show={showModal !== null}
            onHide={handleClose}
            animation={false}
            centered
          >
            <Modal.Body>
              <h2 className="mb-4" style={{ fontWeight: "bold" }}>
                {showModal === "SignUp"
                  ? "Sign up as a member"
                  : "Sign in to your account"}
              </h2>
              <Form
                className="d-grid gap-2 px-5"
                onSubmit={showModal === "SignUp" ? handleSignUp : handleSignIn}
              >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    onChange={(e) => setUsername(e.target.value)}
                    type="email"
                    placeholder="Email address"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>
                <p style={{ fontSize: "12px" }}>
                  By signing up, you agree to the Terms of Service and Privacy
                  Policy, including Cookie Use. Honey Music Studio may use your
                  contact information, including your email address and phone
                  number for purposes outlined in our Privacy Policy, like
                  keeping your account secure and personalising our services,
                  including ads. Learn more.
                </p>

                <Button className="rounded-pill" variant="dark" type="submit">
                  {showModal === "SignUp" ? "Sign Up" : "Sign In"}
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </Row>
      </Col>
    </Row>
  );
}

/**
 * Photo credit: https://unsplash.com/photos/white-printer-paper-on-piano-ubcF8dYKRbI?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
 *
 */
