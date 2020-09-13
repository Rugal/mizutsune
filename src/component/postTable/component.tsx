import { useQuery } from "@apollo/react-hooks";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import React from "react";
import { Link } from "react-router-dom";

import { downloadFile } from "../../app/download";
import { Post } from "../../generated/graphql";
import { TorrentApi } from "../../generated/openapi";
import Rate from "../rating";
import { GET_POST, IPostPageVars, IPostPageResult } from "./request";
import { style } from "./style";

interface IColumn {
  id: "pid" | "title" | "author" | "rate" | "create date" | "size";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: IColumn[] = [
  { id: "pid", label: "id", minWidth: 50 },
  { id: "title", label: "title", minWidth: 100 },
  { id: "size", label: "size", minWidth: 20 },
  { id: "author", label: "author", minWidth: 50 },
  { id: "rate", label: "rate", minWidth: 20 },
  { id: "create date", label: "create date", minWidth: 20 },
];

interface IProps {
  token: string;
}

const PostTable: React.FC<IProps> = (p: IProps) => {
  const classes = style();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { data } = useQuery<IPostPageResult, IPostPageVars>(GET_POST, { variables: { index: 0, size: 20 } });
  if (!data) {
    return null;
  }

  const { postPage } = data;

  const download = (post: Post) => new TorrentApi().download(post.pid, {
    headers: { Authorization: p.token },
    responseType: "arraybuffer", // this is very important
  }).then((response) => downloadFile(`${post.hash}.torrent`, new Blob([response.data])));

  const tableHeader = columns.map((column) => (
    <TableCell
      key={column.id}
      align={column.align}
      style={{ minWidth: column.minWidth }}
    >
      {column.label}
    </TableCell>
  ));

  /* tslint:disable:jsx-no-lambda */
  const tableBody = postPage && postPage.items
    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    .map((row: Post, i) =>
      <TableRow hover={true} role="checkbox" tabIndex={-1} key={i}>
        <TableCell>
          <Button onClick={() => download(row)}><CloudDownloadIcon /></Button>
          <Link to={`/post/${row.pid}`}>{row.pid}</Link>
        </TableCell>
        <TableCell>
          {row.title}
        </TableCell>
        <TableCell>
          {row.size}
        </TableCell>
        <TableCell>
          <Link to={`/user/${row.author.uid}`}>{row.author.username}</Link>
        </TableCell>
        <TableCell>
          <Rate value={row.rate} />
        </TableCell>
        <TableCell>
          {row.createAt}
        </TableCell>
      </TableRow>,
    );
  /* tslint:enable:jsx-no-lambda */

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader={true} aria-label="sticky table">
          <TableHead>
            <TableRow>
              {tableHeader}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableBody}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20]} // TODO: Need discussion
        component="div"
        count={postPage.total * postPage.size}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default PostTable;
