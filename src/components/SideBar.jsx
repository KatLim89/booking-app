import { Button, Col } from "react-bootstrap";
import { useState } from "react";
import IconButton from "./IconButton";
import NewBookingModal from "./NewBookingModal";

export default function SideBar({ handleSignOut }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Col
      sm={2}
      className="d-flex flex-column justify-content-center align-items-center bg-light vh-100"
      style={{ position: "sticky", top: 0 }}
    >
      <IconButton className="bi bi-music-note-beamed" isTop />
      <IconButton className="bi bi-house" text="Home" />
      <IconButton className="bi bi-bell" text="Notifications" />
      <IconButton className="bi bi-person" text="Account Setting" />
      <Button
        className="rounded-pill w-100 mb-3 mt-2"
        variant="dark"
        onClick={handleShow}
      >
        Book A Room
      </Button>
      <IconButton
        className="bi bi-door-closed"
        text="SIGN OUT"
        onClick={handleSignOut}
        isBottom
      />

      <NewBookingModal show={show} handleClose={handleClose} />
    </Col>
  );
}
