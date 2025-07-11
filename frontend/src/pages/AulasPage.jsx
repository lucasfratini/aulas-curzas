// src/pages/AulasPage.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';

const AulasPage = () => {
  const [aulas, setAulas] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingAula, setEditingAula] = useState(null);
  const [formData, setFormData] = useState({ nombreAula: '', capacidad: '' });

  const fetchAulas = async () => {
    try {
      const res = await axios.get('http://localhost:4000/aulas');
      setAulas(res.data);
    } catch (err) {
      console.error('Error al obtener aulas:', err);
    }
  };

  useEffect(() => {
    fetchAulas();
  }, []);

  const handleOpen = (aula = null) => {
    setEditingAula(aula);
    setFormData(aula ? { nombreAula: aula.nombreAula, capacidad: aula.capacidad } : { nombreAula: '', capacidad: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingAula(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editingAula) {
        await axios.put(`http://localhost:4000/aulas/${editingAula.id}`, formData);
      } else {
        await axios.post('http://localhost:4000/aulas', formData);
      }
      fetchAulas();
      handleClose();
    } catch (err) {
      console.error('Error al guardar aula:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/aulas/${id}`);
      fetchAulas();
    } catch (err) {
      console.error('Error al eliminar aula:', err);
    }
  };

  return (
    <Container>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h4">Aulas</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>
          Crear Aula
        </Button>
      </Grid>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Capacidad</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {aulas.map((aula) => (
              <TableRow key={aula.id}>
                <TableCell>{aula.id}</TableCell>
                <TableCell>{aula.nombreAula}</TableCell>
                <TableCell>{aula.capacidad}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpen(aula)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(aula.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingAula ? 'Editar Aula' : 'Crear Aula'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nombre del Aula"
            name="nombreAula"
            value={formData.nombreAula}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Capacidad"
            name="capacidad"
            type="number"
            value={formData.capacidad}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AulasPage;