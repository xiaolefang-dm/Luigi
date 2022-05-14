import "./login-panel.scss";

import React, { useEffect, useState } from "react";
import { Input, Button, Select } from "semantic-ui-react";

const LoginPanel = ({ loginProcessing, Title, requirePasswd, requireName, requireRole, roleOptions, logo}) => {

  const [name, setName] = useState("");
  const [pswd, setPswd] = useState("");
  const [role, setRole] = useState("");

  return (
    <div className="login-panel-wrapper">
      {logo}
      <div className="title">{Title}</div>

      {requireName ?
        <div>
          <Input
            fluid
            placeholder="您的称呼"
            onChange={(e, data) => setName(data.value)}
            value={name}
          />
        </div> : <div />
      }

      {requireRole ?
        <div className="row">
          <Select
            compact
            placeholder="您的角色"
            options={roleOptions}
            onChange={(e, data) => setRole(data.value)}
            value={name}
          />
        </div> : <div />
      }

      {requirePasswd ?
        <div className="row">
          <Input
            fluid
            placeholder="口令"
            type="password"
            onChange={(e, data) => setPswd(data.value)}
            value={pswd || ""}
          />
        </div> : <div />
      }

      <Button
        className="login-button"
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

