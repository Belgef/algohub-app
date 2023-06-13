import AddIcon from '@mui/icons-material/AddCircle';
import {
    Container,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Toolbar,
    Typography,
} from '@mui/material';
import React, { useMemo } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';

import { useGetProblemsQuery } from '../../api/slices/problemApi';
import ProblemLessonCard from '../../components/ProblemLessonCard/ProblemLessonCard';
import SearchBar from '../../components/SearchBar/SearchBar';

type Sort = 'popularity' | 'newest' | 'oldest' | 'rating';

const ProblemsPage = () => {
    const { data: problems } = useGetProblemsQuery();
    const [params, setParams] = useSearchParams();

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
                        (p.author?.fullName ?? p.author?.userName ?? 'deleted').toLowerCase().includes(author)) ||
                    (tag && p.tags?.some((t) => t.toLowerCase().includes(tag))) ||
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
                <SearchBar />
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
            <Stack justifyContent='center' flexWrap='wrap' direction='row' gap={2} width='100%'>
                {set?.map((p, i) => (
                    <ProblemLessonCard element={p} />
                ))}
            </Stack>
        </Container>
    );
};

export default ProblemsPage;
