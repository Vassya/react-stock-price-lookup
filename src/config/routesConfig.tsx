import React from "react";
import { Redirect } from "react-router-dom";

const routes = [    {
    path: "/",
    exact: true,
    component: () => <Redirect to="/home" />,
  },
  {
    component: () => <Redirect to="/pages/errors/error-404" />,
  },
];

export default routes;