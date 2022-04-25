import React from "react";
import { Alert, Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const SetAlert = () => {
  const alerts = useSelector((state) => state.alert);

  if (alerts !== null && alerts.length > 0) {
    return alerts.map((alert) => (
      <div className="mt-3">
      <Container>
        <Alert key={alert.id} variant={alert.alertType}>
          {alert.msg}
        </Alert>
      </Container>
      </div>
    ));
  } else {
    return null;
  }
};

export default SetAlert;
