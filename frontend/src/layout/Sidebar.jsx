import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider } from "@mui/material";
import { School, Class, CalendarToday, People, Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const toggleSidebar = () => setOpen(!open);

  const menuItems = [
    { text: "Carreras", icon: <School />, path: "/carreras" },
    { text: "Materias", icon: <Class />, path: "/materias" },
    { text: "Aulas", icon: <Class />, path: "/aulas" },
    { text: "Aula Días", icon: <CalendarToday />, path: "/auladias" },
    { text: "Usuarios", icon: <People />, path: "/usuarios" },
  ];

  return (
    <>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? 240 : 60,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? 240 : 60,
            boxSizing: 'border-box',
            transition: 'width 0.3s',
          },
        }}
      >
        <div style={{ display: 'flex', justifyContent: open ? 'flex-end' : 'center', padding: 10 }}>
          <IconButton onClick={toggleSidebar}>
            <Menu />
          </IconButton>
        </div>

        <Divider />

        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.text} component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              {open && <ListItemText primary={item.text} />}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
