import { Col, Spinner } from "react-bootstrap";
import solo from "../assets/solo.jpg";
import band from "../assets/band.jpg";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import BookingCard from "./BookingCard";
import axios from "axios";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function MainBody() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = (userId) => {
    fetch(
      `https://4b819a2e-0f43-4093-b3a4-4e8fd1a5d66b-00-10dhgpii5c86u.spock.replit.dev/bookings/user/${userId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  const handleDeleteBooking = async (id) => {
    try {
      const response = await axios.delete(
        `https://4b819a2e-0f43-4093-b3a4-4e8fd1a5d66b-00-10dhgpii5c86u.spock.replit.dev/bookings/${id}`
      );
      if (response.status === 200) {
        const updatedBookings = bookings.filter((booking) => booking.id !== id);
        setBookings(updatedBookings);
      } else {
        console.error("Error deleting booking: Unexpected response");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      fetchBookings(userId);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      fetchBookings(userId);
    }
  }, [bookings]);

  return (
    <Col className="bg-light pt-3" style={{ border: "1px solid lightgrey" }}>
      <Box sx={{ p: 2, mb: 2, border: "1px solid lightgrey" }}>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="150"
              image={solo}
              alt="cat on piano"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Solo Room
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Capacity: 1 - 2 person(s)
                <br />
                Equipment: upright piano / digital piano, one (1) music stand,
                one (1) metronome
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="150"
              image={band}
              alt="drum set"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Band Room
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Capacity: 2 - 5 person(s)
                <br />
                Equipment: acoustic drum set, two (2) music stands, two (2)
                guitar stands
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <div className="mt-2">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography variant="h6">General Terms & Conditions</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                We want to make sure everyone has an enjoyable experience, so
                here are some terms and conditions we ask are followed:
                <li>
                  A room booking is only for personal use and cannot be used for
                  commercial purposes. Commercial bookings are possible for a
                  fee - please ask staff for more information.
                </li>
                <li>
                  Take care of the room - please ensure no damage occurs,
                  rubbish is disposed of properly and leave the room in the
                  condition you found it in so it&apos;s tidy for the next
                  users. If any damage occurs due to negligence, you will be
                  responsible for covering the cost of repairs or replacement.
                </li>
                <li>
                  Please report any hazards or incidents to reception
                  immediately.
                </li>
                <li>
                  <b>
                    No alcohol, smoking or vaping is allowed on the premises.
                  </b>{" "}
                  Anyone who is intoxicated or exhibiting threatening behavior
                  will be asked to leave.
                </li>
                <li>
                  Emergency pathways and exits must be kept clear at all times.
                  In case of a fire or evacuation, you must follow directions
                  from staff and exit immediately.
                </li>
                <br />
                If any Terms and Conditions are breached, Honey Music Studio
                (HMS) will take an educational approach in the first instance.
                However, if there are serious or repeated breaches, especially
                those related to safety, HMS reserves the right to request that
                the patron(s) leave and/or restrict access to the facilities.
                <br />
                <br />
                We hope you have a great time here at Honey Music Studio and we
                appreciate your cooperation in following these terms and
                conditions. Cheers!
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography variant="h6">Terms for Booking A Room</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Here are some terms about booking a room:
                <li>
                  Your booking is for up to <b>two (2) hours per day</b>, and
                  you are not allowed to make multiple bookings for the same day
                  (even under different names).
                </li>
                <li>
                  <b>
                    NOTE: Please double-check your booking details as you will
                    not be able to change the booked date and time
                  </b>
                  . If you need to change the date and/or time, please cancel
                  your booking and make a new booking with the correct details.
                </li>
                <li>
                  Bookings with incomplete details will be removed. You are
                  required to fill in details for phone number and email
                  address, in case we need to contact you.
                </li>
                <li>
                  You must check-in at reception{" "}
                  <u>within 15 minutes of arrival time</u>; otherwise, your
                  booking may be removed.
                </li>
                <li>
                  We can get very busy - please exit your booking on time.
                </li>
                <li>
                  Honey Music Studio reserves the right to cancel or cease any
                  booking at any time (even at short notice or while the booking
                  is in progress). We will try our best to avoid this - however,
                  sometimes situations are outside of our control. It&apos;s
                  always a good idea to have a contingency plan in place, just
                  in case.
                </li>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </Box>

      <Divider>ROOM BOOKINGS</Divider>

      {loading ? (
        <Spinner animation="border" className="ms-3 mt-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        bookings.length > 0 &&
        bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            id={booking.id}
            room={booking.room}
            comment={booking.comment}
            phone={booking.phone}
            email={booking.email}
            bookingDate={booking.booking_date}
            bookingTime={booking.booking_time}
            onDelete={handleDeleteBooking}
          />
        ))
      )}
    </Col>
  );
}

/**
 * Photo Credits:
 *
 * Solo room: https://unsplash.com/photos/brown-tabby-cat-on-piano-iglir8g58MQ?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
 * Band room: https://unsplash.com/photos/empty-acoustic-drum-kit--lAYKNRuD5s?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
 *
 */
