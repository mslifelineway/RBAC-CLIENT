import React from "react";
import { PrivateLayout } from "../components";
import { Box, Button, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import { paths } from "../constants";

export const Employees = () => {
  return (
    <PrivateLayout>
      <Card>
        <CardContent style={{ display: "flex", justifyContent: "flex-end" }}>
          <Link to={paths.createEmployee}>
            <Button variant="contained" size="small">
              New
            </Button>
          </Link>
        </CardContent>
      </Card>
    </PrivateLayout>
  );
};
