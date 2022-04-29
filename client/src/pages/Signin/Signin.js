import React, {useState, useEffect} from "react";

import {Form} from "react-bootstrap";
import Button from "@restart/ui/esm/Button";
import {useMutation} from "@apollo/client";
import {SIGNIN} from "../../core/queries";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signin, {data, loading}] = useMutation(SIGNIN);

  const handleClick = () => {
    signin({
      variables: {
        email,
        password,
      },
    });
  };

  useEffect(() => {
    if (data) {
      if (data.signin.userErrors.length > 0) {
        setError(data.signin.userErrors[0].message);
      }
      if (data.signin.token) {
        localStorage.setItem("token", data.signin.token);
      }
    }
  }, [data]);

  const [error, setError] = useState(null);

  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {error && <p>{error}</p>}
        <Button onClick={handleClick}>Signin</Button>
      </Form>
    </div>
  );
}
