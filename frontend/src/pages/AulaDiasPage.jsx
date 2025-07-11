// src/pages/AulaDiasPage.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Typography, Button, Dialog, DialogTitle, DialogContent,
  TextField, DialogActions, IconButton, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';

const AulaDiasPage = () => {
  const [aulaDias, setAulaDias] = useState([]);
  const [open, setOpen] = useState(false);
  const [nuevoAulaDia, setNuevoAulaDia] = useState({ dia: '', aulaId: '' });

  const obtenerAulaDias = async () => {
    try {
      const res = await axios.get('http://localhost:4000/auladias');
      setAulaDias(res.data);
    } catch (error) {
      console.error('Error al obtener AulaDías:', error);
    }
  };

  const crearAulaDia = async () => {
    try {
      await axios.post('http://localhost:4000/auladias', nuevoAulaDia);
      obtenerAulaDias();
      setOpen(false);
      setNuevoAulaDia({ dia: '', aulaId: '' });
    } catch (error) {
      console.error('Error al crear AulaDia:', error);
    }
  };

  useEffect(() => {
    obtenerAulaDias();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Aula Día</Typography>
      <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)} sx={{ mb: 2 }}>
        Crear Aula Día
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Día</TableCell>
              <TableCell>Aula ID</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {aulaDias.map((aulaDia) => (
              <TableRow key={aulaDia.id}>
                <TableCell>{aulaDia.id}</TableCell>
                <TableCell>{aulaDia.dia}</TableCell>
                <TableCell>{aulaDia.aulaId}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Crear Aula Día</DialogTitle>
        <DialogContent>
          <TextField
            label="Día"
            fullWidth
            margin="dense"
            value={nuevoAulaDia.dia}
            onChange={(e) => setNuevoAulaDia({ ...nuevoAulaDia, dia: e.target.value })}
          />
          <TextField
            label="Aula ID"
            fullWidth
            margin="dense"
            value={nuevoAulaDia.aulaId}
            onChange={(e) => setNuevoAulaDia({ ...nuevoAulaDia, aulaId: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={crearAulaDia}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AulaDiasPage;