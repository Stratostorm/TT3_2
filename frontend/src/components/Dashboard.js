import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Container,
  Paper,
  TableContainer,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

export default function Dashboard() {
  const [employeeName, setEmployeeName] = useState();
  const [tableData, setTableData] = useState([]);
  const apiURL = "http://localhost:5000";
  const [token, setToken] = useState("placeholder token");


  const handleLogout = () => {
    setToken(null);
  };

  useEffect(() => {
    axios
      .get(apiURL + "/EmployeeDataName")
      .then((response) => setEmployeeName(response.data.FirstName))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get(apiURL + "/ProjectExpenseClaimsData")
      .then((response) => setTableData(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Container component="main" maxWidth="lg">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems:'center'}}>
          <h1>Welcome {employeeName}!</h1>
          <Button 
          variant="contained" sx={{height:40}}
          color='warning'
          onClick={handleLogout} 
          >
            Logout
          </Button>
        </div>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell width="5"></TableCell>
                <TableCell>Claim ID</TableCell>
                <TableCell>Project ID</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Currency</TableCell>
                <TableCell>Status</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.ClaimID}</TableCell>
                  <TableCell>{row.ProjectID}</TableCell>
                  <TableCell>{row.Amount}</TableCell>
                  <TableCell>{row.CurrencyID}</TableCell>
                  <TableCell>{row.Status}</TableCell>
                  <TableCell>
                    {row.Status === "Pending" ? (
                      <Button
                        color="primary"
                        sx={{ ml: 2 }}
                        component={Link}
                        to={{
                          pathname: "/EditClaim",
                          state: { row: row }
                        }}
                      
                      >
                        Edit
                      </Button>
                    ) : null}
                    {row.Status === "Pending" ? (
                      <IconButton aria-label="delete" color="error">
                        <Delete />
                      </IconButton>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          component={Link}
          to="/NewClaim"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Add new claim
        </Button>
      </Container>
    </>
  );
}
