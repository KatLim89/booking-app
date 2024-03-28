import { Row } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import SideBar from "../components/SideBar";
import MainBody from "../components/MainBody";

export default function BookingPage() {
  const [authToken, setAuthToken] = useLocalStorage("authToken", "");
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    }
  }, [authToken, navigate]);

  const handleSignOut = () => {
    setAuthToken("");
  };

  return (
    <>
      <Row className="mx-auto">
        <SideBar handleSignOut={handleSignOut} />
        <MainBody />
      </Row>
    </>
  );
}
