import "./login-panel.scss";

import React, { useEffect, useState } from "react";
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const LoginPanel = ({ loginProcessing, Title, requirePasswd, requireName, requireRole, roleOptions, logo}) => {

  const [name, setName] = useState("");
  const [pswd, setPswd] = useState("");
  const [role, setRole] = useState("");

  return (
    <div className="login-panel-wrapper">
      {logo}
      <div className="title">{Title}</div>

      {requireName ?
        <div className="row">
          <TextField
            label="您的称呼"
            onChange={(e, data) => setName(e.target.value)}
            value={name}
          />
        </div> : <div />
      }

      {requireRole ?
        <div className="row">
          <Select
            compact
            label="您的角色"
            onChange={(e, data) => setRole(e.target.value)}
            value={name}
          >
            {roleOptions}
          </Select>
        </div> : <div />
      }

      {requirePasswd ?
        <div className="row">
          <TextField
            label="口令"
            type={"password"}
            onChange={(e, data) => setPswd(e.target.value)}
            value={pswd || ""}
          />
        </div> : <div />
      }

      <Button
        className="login-button"
        variant="contained"
        color="success"
        size="large"
        onClick={() => {
          loginProcessing(name, pswd, role);
        }}
      >
        进入
      </Button>
    </div>
  );

}

export { LoginPanel };

