import React from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Grid,
    IconButton,
    Typography,
} from '@mui/material';
import { useGetProblemsQuery } from '../../api/slices/problemApi';
import { STORAGE_BASE_URL } from '../../api/constants';
import { NavLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/AddCircle';

const ProblemsPage = () => {
    const problems = useGetProblemsQuery();

    return (
        <Container maxWidth='lg'>
            <Typography gutterBottom mt='1em' variant='h4' component='h4'>
                Problems{' '}
                <IconButton size='small' component={NavLink} to='add'>
                    <AddIcon sx={{ fontSize: 24 }} />
                </IconButton>
            </Typography>
            <Grid container spacing={2} columns={4} justifyContent='center'>
                {problems.data?.map((p) => (
                    <Grid item flexGrow={1}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image={STORAGE_BASE_URL + p.imageName}
                                title={p.problemName}
                            />
                            <CardContent>
                                <Typography gutterBottom variant='h5' component='div'>
                                    {p.problemName}
                                </Typography>
                                <Typography variant='body2' color='text.secondary'>
                                    Soon...
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size='small' component={NavLink} to={p.problemId.toString()}>
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ProblemsPage;
