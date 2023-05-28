import AddIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import {
    Container,
    FormControl,
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
import React, { useEffect, useMemo, useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';

import { useGetProblemsQuery } from '../../api/slices/problemApi';
import ProblemLessonCard from '../../components/ProblemLessonCard/ProblemLessonCard';

type Sort = 'popularity' | 'newest' | 'oldest' | 'rating';

const ProblemsPage = () => {
    const { data: problems } = useGetProblemsQuery();
    const [params, setParams] = useSearchParams();
    const [searchText, setSearchTest] = useState(params.get('search') ?? '');

    const set = useMemo(() => {
        const search = params.get('search')?.toLowerCase();
        const sort = (params.get('sort') ?? 'popularity') as Sort;
        const author = search?.startsWith('author:') ? search.replace(/author:\s*/, '') : undefined;
        const tag = search?.startsWith('tag:') ? search.replace(/tag:\s*/, '') : undefined;
        return [...(problems ?? [])]
            .filter(
                (p) =>
                    !search ||
                    (author &&
                        (p.author?.fullName ?? p.author?.userName ?? 'deleted').toLowerCase().includes(author)) /* ||
                    (tag && (p.author?.fullName ?? p.author?.userName ?? 'deleted').toLowerCase().includes(author))*/ ||
                    (!author && !tag && p.problemName.toLowerCase().includes(search))
            )
            .sort((a, b) => {
                if (sort === 'rating') {
                    return (
                        (b.upvotes ?? 0) / ((b.upvotes ?? 0) + (b.downvotes ?? 0) + 1) -
                        (a.upvotes ?? 0) / ((a.upvotes ?? 0) + (a.downvotes ?? 0) + 1)
                    );
                } else if (sort === 'newest') {
                    return a.createDate! < b.createDate! ? 1 : -1;
                } else if (sort === 'oldest') {
                    return a.createDate! > b.createDate! ? 1 : -1;
                } else {
                    return (b.views ?? 0) - (a.views ?? 0);
                }
            });
    }, [params, problems]);

    useEffect(() => setSearchTest(params.get('search') ?? ''), [params]);

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
                    Problems
                    <IconButton size='small' component={NavLink} to='add'>
                        <AddIcon sx={{ fontSize: 24 }} />
                    </IconButton>
                </Typography>
                <Paper
                    component='form'
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                    onSubmit={(e) => {
                        e.preventDefault();
                        setSearchTest(searchText.trim());
                        if (searchText.trim() === params.get('search')) {
                            return;
                        }
                        if (searchText.trim() !== '') {
                            params.set('search', searchText.trim());
                        } else {
                            params.delete('search');
                        }
                        setParams(params);
                    }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder='Search problems'
                        inputProps={{ 'aria-label': 'search google maps' }}
                        value={searchText}
                        onChange={(e) => setSearchTest(e.target.value)}
                    />
                    <IconButton sx={{ p: '10px' }} aria-label='search' type='submit'>
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel>Sort by</InputLabel>
                    <Select
                        value={params.get('sort') ?? 'popularity'}
                        onChange={(e) => {
                            params.set('sort', e.target.value);
                            setParams(params);
                        }}
                        label='Sort by'
                        size='small'
                    >
                        <MenuItem value={'popularity'}>Popularity</MenuItem>
                        <MenuItem value={'rating'}>Rating</MenuItem>
                        <MenuItem value={'newest'}>Newest</MenuItem>
                        <MenuItem value={'oldest'}>Oldest</MenuItem>
                    </Select>
                </FormControl>
            </Toolbar>
            <Grid container spacing={2} columns={4} justifyContent='center'>
                {set?.map((p, i) => (
                    <Grid item flexGrow={0} flexShrink={0} key={i}>
                        <ProblemLessonCard element={p} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ProblemsPage;
