import axios from "axios";
import { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import { Button, Stack } from "@mui/material";

export default function NewBookingModal({ show, handleClose }) {
  const [room, setRoom] = useState("");
  const [comment, setComment] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");

  const handleSaveBooking = () => {
    const token = localStorage.getItem("authToken");
    const decode = jwtDecode(token);
    const userId = decode.id;

    const data = {
      room,
      comment,
      phone,
      email,
      booking_date: bookingDate,
      booking_time: bookingTime,
      user_id: userId,
    };

    axios
      .post(
        "https://4b819a2e-0f43-4093-b3a4-4e8fd1a5d66b-00-10dhgpii5c86u.spock.replit.dev/bookings",
        data
      )
      .then((response) => {
        console.log("Success:", response.data);
        handleClose();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Book A Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formRoom">
              <Form.Label>Room Type *</Form.Label>
              <Form.Control
                className="mb-2"
                placeholder="Solo / Band"
                type="text"
                name="room"
                autoFocus
                value={room}
                onChange={(e) => setRoom(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>Phone Number *</Form.Label>
              <Form.Control
                className="mb-2"
                placeholder="Phone no."
                type="text"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email Address *</Form.Label>
              <Form.Control
                className="mb-2"
                placeholder="Valid email address"
                type="text"
                name="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBookingDate">
              <Form.Label>Booking Date *</Form.Label>
              <Form.Control
                className="mb-2"
                placeholder="DD/MM/YYYY"
                type="date"
                name="bookingDate"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBookingTime">
              <Form.Label>Booking Time *</Form.Label>
              <Form.Control
                className="mb-2"
                placeholder="00:00 AM/PM"
                type="time"
                name="bookingTime"
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formComment">
              <Form.Label>Remarks</Form.Label>
              <Form.Control
                className="mb-4"
                placeholder="Add remarks (if any)"
                as="textarea"
                rows={3}
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
          </Form>
          <p>
            Please fill in all fields marked with (*).
            <br />
            Incomplete forms will be removed.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="inherit" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="success"
              type="submit"
              onClick={handleSaveBooking}
            >
              Save Booking
            </Button>
          </Stack>
        </Modal.Footer>
      </Modal>
    </>
  );
}
