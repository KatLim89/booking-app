import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button,
  AppBar,
  Box,
  Toolbar,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import NumbersIcon from "@mui/icons-material/Numbers";
import PersonIcon from "@mui/icons-material/Person";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import EmailIcon from "@mui/icons-material/Email";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import CommentIcon from "@mui/icons-material/Comment";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const [bookings, setBookings] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://4b819a2e-0f43-4093-b3a4-4e8fd1a5d66b-00-10dhgpii5c86u.spock.replit.dev/bookings`
        );
        setBookings(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedRows.map(async (id) => {
          await axios.delete(
            `https://4b819a2e-0f43-4093-b3a4-4e8fd1a5d66b-00-10dhgpii5c86u.spock.replit.dev/bookings/${id}`
          );
        })
      );
      // Refresh the data after deletion
      const response = await axios.get(
        "https://4b819a2e-0f43-4093-b3a4-4e8fd1a5d66b-00-10dhgpii5c86u.spock.replit.dev/bookings"
      );
      setBookings(response.data);
      setSelectedRows([]);
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteSelected}
            disabled={selectedRows.length === 0}
          >
            Delete Selected
          </Button>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1 }}
            textAlign="center"
          >
            <AdminPanelSettingsIcon
              fontSize="large"
              style={{ marginRight: "7px" }}
            />
            Admin Dashboard
            <AdminPanelSettingsIcon
              fontSize="large"
              style={{ marginLeft: "7px" }}
            />
          </Typography>
          <Button variant="contained" color="warning" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>
                <NumbersIcon />
              </TableCell>
              <TableCell>
                <PersonIcon /> User ID
              </TableCell>
              <TableCell>
                <LibraryMusicIcon /> Room Type
              </TableCell>
              <TableCell>
                <PhoneInTalkIcon /> Phone No.
              </TableCell>
              <TableCell>
                <EmailIcon /> Email Address
              </TableCell>
              <TableCell>
                <CalendarMonthIcon /> Booked Date
              </TableCell>
              <TableCell>
                <AccessAlarmIcon /> Booked Time
              </TableCell>
              <TableCell>
                <CommentIcon /> Comment
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(booking.id)}
                    onChange={(event) =>
                      handleCheckboxChange(event, booking.id)
                    }
                  />
                </TableCell>
                <TableCell>{booking.id}</TableCell>
                <TableCell>{booking.user_id}</TableCell>
                <TableCell>{booking.room}</TableCell>
                <TableCell>{booking.phone}</TableCell>
                <TableCell>{booking.email}</TableCell>
                <TableCell>{booking.booking_date}</TableCell>
                <TableCell>{booking.booking_time}</TableCell>
                <TableCell
                  sx={{
                    maxWidth: "200px",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  {booking.comment}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
