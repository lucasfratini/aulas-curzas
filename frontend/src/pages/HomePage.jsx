import { Typography, Grid, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const opciones = [
    { title: 'Carreras', description: 'Gestioná las carreras académicas disponibles.', path: '/carreras' },
    { title: 'Docentes', description: 'Administrá los perfiles y asignaciones docentes.', path: '/docentes' },
    { title: 'Aulas', description: 'Controlá la disponibilidad y uso de aulas físicas.', path: '/aulas' },
  ];

  return (
    <>
      <Typography variant="h4" gutterBottom>Bienvenido a Crimson Moon</Typography>
      <Typography variant="subtitle1" gutterBottom>
        Este sistema gestiona carreras, docentes, materias y aulas con eficiencia y estilo.
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {opciones.map((op, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card component={Link} to={op.path} sx={{ textDecoration: 'none' }}>
              <CardContent>
                <Typography variant="h6">{op.title}</Typography>
                <Typography variant="body2" color="text.secondary">{op.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
