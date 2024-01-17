import { useEffect, useState } from "react";
import "./App.css";
import {
  CircularProgress,
  Container,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function App() {
  const [users, setUsers] = useState([]);
  const [slicedUsers, setSlicedUsers] = useState([]);
  const countPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [allPageCount, setAllPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setAllPageCount(Math.ceil(data.length / countPerPage));
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const newFirstIndex = (currentPage - 1) * countPerPage;
    const newLastIndex = currentPage * countPerPage;
    setSlicedUsers(users.slice(newFirstIndex, newLastIndex));
  }, [currentPage, users, countPerPage]);

  const paginationController = (e, value) => {
    setCurrentPage(value);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        height: "100svh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading ? (
        <CircularProgress color="warning" />
      ) : (
        <>
          <TableContainer
            component={Paper}
            sx={{ boxShadow: "0 0 12px #15544b" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Body</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {slicedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.title}</TableCell>
                    <TableCell>{user.body}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={allPageCount}
            color="primary"
            onChange={paginationController}
          />
        </>
      )}
    </Container>
  );
}

export default App;
