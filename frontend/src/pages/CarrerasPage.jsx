// 🔧 src/pages/CarrerasPage.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  IconButton, TextField, Typography, Paper, List, ListItem, ListItemText
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import MainLayout from '../layout/MainLayout';

const CarrerasPage = () => {
  const [carreras, setCarreras] = useState([]);
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchCarreras = async () => {
    try {
      const res = await axios.get('http://localhost:4000/carreras');
      setCarreras(res.data);
    } catch (err) {
      console.error('Error al obtener carreras:', err);
    }
  };

  useEffect(() => {
    fetchCarreras();
  }, []);

  const handleOpen = (id = null, nombre = '') => {
    setEditingId(id);
    setNombre(nombre);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNombre('');
    setEditingId(null);
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await axios.put(`http://localhost:4000/carreras/${editingId}`, { nombre });
      } else {
        await axios.post('http://localhost:4000/carreras', { nombre });
      }
      fetchCarreras();
      handleClose();
    } catch (err) {
      console.error('Error al guardar carrera:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/carreras/${id}`);
      fetchCarreras();
    } catch (err) {
      console.error('Error al eliminar carrera:', err);
    }
  };

  return (
    <MainLayout>
      <Box p={3}>
        <Typography variant="h4" gutterBottom>Carreras</Typography>
        <Button variant="contained" onClick={() => handleOpen()}>Crear carrera</Button>

        <Paper sx={{ mt: 2 }}>
          <List>
            {carreras.map((carrera) => (
              <ListItem
                key={carrera.id}
                secondaryAction={
                  <>
                    <IconButton onClick={() => handleOpen(carrera.id, carrera.nombreCarrera)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(carrera.id)}>
                      <Delete />
                    </IconButton>
                  </>
                }
              >
                <ListItemText primary={carrera.nombreCarrera} />
              </ListItem>
            ))}
          </List>
        </Paper>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{editingId ? 'Editar carrera' : 'Nueva carrera'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              fullWidth
              label="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              sx={{ mt: 1 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleSubmit} variant="contained">Guardar</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </MainLayout>
  );
};

export default CarrerasPage;
