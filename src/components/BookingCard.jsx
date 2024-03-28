import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Button,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import CommentIcon from "@mui/icons-material/Comment";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import EmailIcon from "@mui/icons-material/Email";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";

export default function BookingCard({
  id,
  room,
  comment,
  phone,
  email,
  bookingDate,
  bookingTime,
  onDelete,
}) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    room: room,
    comment: comment,
    phone: phone,
    email: email,
    booking_date: bookingDate,
    booking_time: bookingTime,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = async () => {
    try {
      const response = await axios.put(
        `https://4b819a2e-0f43-4093-b3a4-4e8fd1a5d66b-00-10dhgpii5c86u.spock.replit.dev/bookings/${id}`,
        formData
      );
      console.log(response.data);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating booking:", error);
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://4b819a2e-0f43-4093-b3a4-4e8fd1a5d66b-00-10dhgpii5c86u.spock.replit.dev/bookings/${id}`
      );
      onDelete(id);
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));
  return (
    <Box
      sx={{
        flexGrow: 1,
        border: "1px solid #d3d3d3",
        margin: 2,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Demo>
            <List>
              <ListItem>
                <ListItemIcon>
                  <LibraryMusicIcon />
                </ListItemIcon>
                <ListItemText>Room type : {room}</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CalendarMonthIcon />
                </ListItemIcon>
                <ListItemText>Booked date : {bookingDate}</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AccessAlarmIcon />
                </ListItemIcon>
                <ListItemText>Booked time : {bookingTime}</ListItemText>
              </ListItem>
            </List>
          </Demo>
        </Grid>

        <Grid item xs={12} md={4}>
          <Demo>
            <List>
              <ListItem>
                <ListItemIcon>
                  <PhoneInTalkIcon />
                </ListItemIcon>
                <ListItemText>Phone no. : {phone}</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText>Email address : {email}</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CommentIcon />
                </ListItemIcon>
                <ListItemText>Remarks : {comment}</ListItemText>
              </ListItem>
            </List>
          </Demo>
        </Grid>

        <Grid item xs={12} md={4}>
          <Demo>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              mt={4}
            >
              <Button
                variant="outlined"
                color="inherit"
                style={{ width: 300 }}
                onClick={() => setShowModal(true)}
              >
                <EditIcon className="mx-2" /> Edit booking
              </Button>
              <Button
                variant="contained"
                color="error"
                style={{ width: 300 }}
                onClick={handleDelete}
              >
                <CancelIcon className="mx-2" /> Cancel booking
              </Button>
            </Stack>
          </Demo>
        </Grid>

        {/* Edit Booking Modal */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Booking</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formRoom">
                <Form.Label>Room Type</Form.Label>
                <Form.Control
                  className="mb-2"
                  type="text"
                  name="room"
                  autoFocus
                  value={formData.room}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  className="mb-2"
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  className="mb-2"
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formBookingDate">
                <Form.Label>Booking Date *</Form.Label>
                <Form.Control
                  className="mb-2"
                  type="text"
                  name="bookingDate"
                  plaintext
                  readOnly
                  value={formData.booking_date}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formBookingTime">
                <Form.Label>Booking Time *</Form.Label>
                <Form.Control
                  className="mb-2"
                  type="text"
                  name="bookingTime"
                  plaintext
                  readOnly
                  value={formData.booking_time}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formComment">
                <Form.Label>Remarks</Form.Label>
                <Form.Control
                  className="mb-4"
                  as="textarea"
                  rows={3}
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
            <p>Fields marked with (*) cannot be changed</p>
          </Modal.Body>
          <Modal.Footer>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="inherit"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
              <Button variant="contained" color="success" onClick={handleEdit}>
                Save Changes
              </Button>
            </Stack>
          </Modal.Footer>
        </Modal>
      </Grid>
    </Box>
  );
}
