import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  IconButton,
  Box,
  Paper,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import api from '../api/axios';

const CarrerasPage = () => {
  const [carreras, setCarreras] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [nombreCarrera, setNombreCarrera] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCarreras();
  }, []);

  const fetchCarreras = async () => {
    try {
      const res = await api.get('/carreras');
      setCarreras(res.data);
    } catch (err) {
      console.error('Error al obtener carreras:', err);
    }
  };

  const openModalCrear = () => {
    setEditId(null);
    setNombreCarrera('');
    setModalOpen(true);
  };

  const openModalEditar = (carrera) => {
    setEditId(carrera.id);
    setNombreCarrera(carrera.nombreCarrera);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/carreras/${id}`);
      fetchCarreras();
    } catch (err) {
      console.error('Error al borrar carrera:', err);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editId) {
        await api.put(`/carreras/${editId}`, { nombreCarrera });
      } else {
        await api.post('/carreras', { nombreCarrera });
      }
      setModalOpen(false);
      fetchCarreras();
    } catch (err) {
      console.error('Error al guardar carrera:', err);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Carreras</Typography>
        <Button variant="contained" color="primary" onClick={openModalCrear}>
          Crear Carrera
        </Button>
      </Box>

      {carreras.map((carrera) => (
        <Paper key={carrera.id} sx={{ p: 2, mb: 2 }}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography>{carrera.nombreCarrera}</Typography>
            </Grid>
            <Grid item>
              <IconButton color="primary" onClick={() => openModalEditar(carrera)}>
                <Edit />
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(carrera.id)}>
                <Delete />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
      ))}

      {/* Modal para crear/editar */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>{editId ? 'Editar Carrera' : 'Crear Carrera'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre de la Carrera"
            fullWidth
            value={nombreCarrera}
            onChange={(e) => setNombreCarrera(e.target.value)}
            autoFocus
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CarrerasPage;

