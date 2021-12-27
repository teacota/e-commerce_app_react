import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, patchUser } from "../../state/panelSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TextField, Button } from "@mui/material";
import styles from "./AdminPanel.module.scss";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function AdminPanel() {
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.panel);
  const history = useHistory();

  React.useEffect(async () => {
    dispatch(getUsers());
  }, []);

  const editUser = (event, id) => {
    const {
      target: { innerText },
    } = event;

    const user = users.find((user) => user.id === id);

    if (innerText.toLowerCase() === "edit credit") {
      dispatch(patchUser({ id, body: { ...user, credit: credits[id] } }));
    }
    if (innerText.toLowerCase() === "disable") {
      dispatch(patchUser({ id, body: { ...user, is_active: false } }));
    }
    if (innerText.toLowerCase() === "enable") {
      dispatch(patchUser({ id, body: { ...user, is_active: true } }));
    }
  };

  const [credits, setCredits] = React.useState({});

  const handleChange = (event, id) => {
    setCredits((prevCredits) => ({
      ...prevCredits,
      [id]: +event.target.value,
    }));
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["container__drawer"]}>
        <p
          className={styles["menu-categories"]}
          onClick={() => {
            history.push("/home");
          }}
        >
          USERS
        </p>
        <p
          className={styles["menu-categories"]}
          onClick={() => {
            history.push("/add-product");
          }}
        >
          ADD PRODUCTS
        </p>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight:"bold"}}>Id</TableCell>
              <TableCell align="right" sx={{fontWeight:"bold"}}>Username</TableCell>
              <TableCell align="right" sx={{fontWeight:"bold"}}>Email</TableCell>
              <TableCell align="right" sx={{fontWeight:"bold"}}>Status</TableCell>
              <TableCell align="right" sx={{fontWeight:"bold"}}>Credit</TableCell>
              <TableCell align="center" sx={{fontWeight:"bold"}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              const { id, username, email, credit, is_active: status } = user;
              return (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.id}
                  </TableCell>
                  <TableCell align="right">{username}</TableCell>
                  <TableCell align="right">{email}</TableCell>
                  <TableCell align="right">
                    {status ? "Active" : "Inactive"}
                  </TableCell>
                  <TableCell align="right">{credit}</TableCell>
                  <TableCell align="center">
                    <div className={styles["actions-container"]}>
                      <TextField
                        type="number"
                        onChange={(e) => handleChange(e, id)}
                        value={credits[id]}
                      />
                      <Button
                        variant="contained"
                        color="info"
                        onClick={(e) => editUser(e, id)}
                      >
                        Edit credit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        disabled={!status}
                        onClick={(e) => editUser(e, id)}
                      >
                        Disable
                      </Button>
                      <Button
                        variant="contained"
                        color="success"
                        disabled={status}
                        onClick={(e) => editUser(e, id)}
                      >
                        Enable
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
