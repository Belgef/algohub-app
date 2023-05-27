import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Paper,
    Stack,
    Typography,
} from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { useGetProblemsQuery } from '../../api/slices/problemApi';

const HomePage = () => {
    const problems = useGetProblemsQuery();

    return (
        <Container maxWidth='lg'>
            <Box
                sx={{
                    height: 300,
                    backgroundColor: 'primary.dark',
                    my: '2em',
                    px: '2em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1em',
                }}
                component={Paper}
                elevation={3}
            >
                <Typography variant='h1' color={'Background'} fontWeight={700} display={'inline'}>
                    ALGOHUB
                </Typography>
                <Typography variant='h4' color={'Background'} display={'inline'}>
                    open community algorithm solving platform
                </Typography>
            </Box>

            <Stack spacing={3}>
                {['Trending lessons', 'Trending problems', 'New lessons', 'New problems'].map((t) => (
                    <Card key={t}>
                        <CardContent sx={{ backgroundColor: 'primary.dark', color: 'Background' }}>
                            <Typography variant='h5'>{t}</Typography>
                        </CardContent>
                        <CardContent>
                            <Stack spacing={1} direction={'row'}>
                                {problems.data?.map((p, i) => (
                                    <Card sx={{ width: 345 }} key={i}>
                                        <CardMedia
                                            sx={{ height: 140 }}
                                            image={`https://loremflickr.com/320/240/pipe?random=${i}${t}`}
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
                                ))}
                            </Stack>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Container>
    );
};

export default HomePage;
