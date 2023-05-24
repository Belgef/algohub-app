import React from 'react';
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    Container,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputBase,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Toolbar,
    Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';

const LessonsPage = () => {
    //const lessons = useGetProblemsQuery();

    return (
        <Container maxWidth='lg'>
            <Toolbar
                component={Stack}
                justifyContent={'space-between'}
                direction={'row'}
                alignItems={'center'}
                mt={'1em'}
                mb={'0.5em'}
            >
                <Typography variant='h4' component='h4'>
                    Lessons{' '}
                    <IconButton size='small' component={NavLink} to='add'>
                        <AddIcon sx={{ fontSize: 24 }} />
                    </IconButton>
                </Typography>
                <Paper component='form' sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder='Search lessons'
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <IconButton type='button' sx={{ p: '10px' }} aria-label='search'>
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id='demo-simple-select-helper-label'>Sort by</InputLabel>
                    <Select
                        labelId='demo-simple-select-helper-label'
                        id='demo-simple-select-helper'
                        value={1}
                        label='Sort by'
                    >
                        <MenuItem value=''>
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={1}>Popularity</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </Toolbar>
            <Grid container spacing={2} columns={4} justifyContent='center'>
                {Array.from(new Array(48).keys()).map((p, i) => (
                    <Grid item flexGrow={1}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image={`https://loremflickr.com/320/240/coding?random=${i}`}
                                title={'Problem ' + (i + 1)}
                            />
                            <CardContent>
                                <Typography gutterBottom variant='h5' component='div'>
                                    {'Lesson ' + (i + 1)}
                                </Typography>
                                <Stack direction={'row'} gap={0.5}>
                                    <Chip size='small' label='tag1' color='primary' />
                                    <Chip size='small' label='tag2' color='primary' />
                                    <Chip size='small' label='tag3' color='primary' />
                                </Stack>
                                <Stack direction={'row'} gap={0.5}>
                                    <Chip
                                        avatar={
                                            <Avatar
                                                alt='Natacha'
                                                src={`https://loremflickr.com/240/240/man?random=${i}`}
                                            />
                                        }
                                        label='@author'
                                        variant='outlined'
                                        size='small'
                                        sx={{ marginTop: '0.5em' }}
                                    />
                                </Stack>
                            </CardContent>
                            <CardActions>
                                <Button size='small'>
                                    {/* component={NavLink} to={p.problemId.toString()}> */}
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

export default LessonsPage;
