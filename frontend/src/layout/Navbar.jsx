import { AppBar, Box, Toolbar, Typography } from "@mui/material";

export default function Navbar({ drawerWidth }) {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        bgcolor: "#9c27b0", // Color principal
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Lugar para el logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              bgcolor: "white",
              borderRadius: "50%",
              mr: 2,
            }}
          />
          <Typography variant="h6" noWrap>
            Crimson Moon
          </Typography>
        </Box>

        {/* Lugar para el perfil u opciones */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Acá podés agregar íconos de perfil, notificaciones, etc */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

