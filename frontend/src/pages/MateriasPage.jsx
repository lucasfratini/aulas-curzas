import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

const MateriasPage = () => {
  const [materias, setMaterias] = useState([]);
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [materiaEditando, setMateriaEditando] = useState(null);

  const obtenerMaterias = async () => {
    try {
      const response = await axios.get('http://localhost:4000/materias');
      setMaterias(response.data);
    } catch (error) {
      console.error('Error al obtener materias:', error);
    }
  };

  useEffect(() => {
    obtenerMaterias();
  }, []);

  const handleOpen = (materia = null) => {
    setOpen(true);
    setMateriaEditando(materia);
    setNombre(materia ? materia.nombre : '');
  };

  const handleClose = () => {
    setOpen(false);
    setMateriaEditando(null);
    setNombre('');
  };

  const handleGuardar = async () => {
    try {
      if (materiaEditando) {
        await axios.put(`http://localhost:4000/materias/${materiaEditando.id}`, { nombre });
      } else {
        await axios.post('http://localhost:4000/materias', { nombre });
      }
      handleClose();
      obtenerMaterias();
    } catch (error) {
      console.error('Error al guardar materia:', error);
    }
  };

  const handleEliminar = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/materias/${id}`);
      obtenerMaterias();
    } catch (error) {
      console.error('Error al eliminar materia:', error);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Materias</Typography>
      <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpen()}>
        Crear Materia
      </Button>

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materias.map((materia) => (
              <TableRow key={materia.id}>
                <TableCell>{materia.id}</TableCell>
                <TableCell>{materia.nombre}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpen(materia)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleEliminar(materia.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{materiaEditando ? 'Editar Materia' : 'Nueva Materia'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre"
            fullWidth
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleGuardar} variant="contained" color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MateriasPage;