import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

export default function Dashboard() {
  const [data, setData] = useState({});
  const [role, setRole] = useState("");
  const [exp, setExp] = useState(null);
  const navigate = useNavigate();

  // Fetch role & exp on initial load
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/me", {
        withCredentials: true,
      })
      .then((res) => {
        setRole(res.data.role);
        setExp(res.data.exp);
      })
      .catch(() => {
        alert("Session expired");
        handleLogout();
      });
  }, []);

  // Auto logout when token expires
  useEffect(() => {
    if (!exp) return;

    const remainingTime = exp * 1000 - Date.now();

    if (remainingTime > 0) {
      const warningTime = remainingTime - 30000;
      if (warningTime > 0) {
        setTimeout(() => {
          alert("⚠️ Your session will expire in 30 seconds.");
        }, warningTime);
      } else {
        alert("⚠️ Your session will expire soon.");
      }

      const logoutTimeout = setTimeout(() => {
        alert("Session expired");
        handleLogout();
      }, remainingTime);

      return () => clearTimeout(logoutTimeout);
    } else {
      alert("Session expired");
      handleLogout();
    }
  }, [exp]);

  useEffect(() => {
    axios
      .all([
        axios.get("http://localhost:5000/api/data/orders", {
          withCredentials: true,
        }),
        axios.get("http://localhost:5000/api/data/riders", {
          withCredentials: true,
        }),
        axios
          .get("http://localhost:5000/api/data/users", {
            withCredentials: true,
          })
          .catch(() => []),
        axios
          .get("http://localhost:5000/api/data/settings", {
            withCredentials: true,
          })
          .catch(() => []),
      ])
      .then(([orders, riders, users, settings]) => {
        setData({
          orders: orders.data,
          riders: riders.data,
          users: users.data,
          settings: settings.data,
        });
      });
  }, []);

  // Logout helper
  const handleLogout = () => {
    axios
      .post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      )
      .finally(() => {
        navigate("/login");
      });
  };

  if (!role) return <div>Loading dashboard...</div>;

  // Render cards based on role
  return (
    <div>
      <h2>Dashboard - Role: {role}</h2>
      <button onClick={handleLogout}>Logout</button>

      <Card title="Orders">
        {data.orders?.map((o) => (
          <div key={o.id}>
            {o.item}
            {role === "editor" || role === "admin" ? (
              <button>Edit</button>
            ) : null}
            {role === "admin" && <button>Delete</button>}
          </div>
        ))}
      </Card>

      <Card title="Riders">
        {data.riders?.map((r) => (
          <div key={r.id}>{r.name}</div>
        ))}
      </Card>

      {data.users && (
        <Card title="Users">
          {data.users.map((u) => (
            <div key={u.id}>
              {u.item}
              {role === "editor" || role === "admin" ? (
                <button>Edit</button>
              ) : null}
              {role === "admin" && <button>Delete</button>}
            </div>
          ))}
        </Card>
      )}

      {data.settings && role === "admin" && (
        <Card title="Settings">
          <pre>{JSON.stringify(data.settings, null, 2)}</pre>
        </Card>
      )}
    </div>
  );
}
