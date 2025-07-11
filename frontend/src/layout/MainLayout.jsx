import { Box, CssBaseline, Toolbar } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const drawerWidth = 240;

export default function MainLayout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Navbar fijo */}
      <Navbar drawerWidth={drawerWidth} />

      {/* Sidebar colapsable */}
      <Sidebar drawerWidth={drawerWidth} />

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f5f5f5",
          minHeight: "100vh",
          p: 3,
          mt: 8, // deja espacio para el Navbar
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}


