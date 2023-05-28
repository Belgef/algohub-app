import { Box, Card, CardContent, Container, Paper, Stack, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';

import { useGetDeletedLessonsQuery, useGetLessonsQuery } from '../../api/slices/lessonApi';
import { useGetDeletedProblemsQuery, useGetProblemsQuery } from '../../api/slices/problemApi';
import ProblemLessonCard from '../../components/ProblemLessonCard/ProblemLessonCard';
import useAuthorization from '../../hooks/useAuthorization';

const HomePage = () => {
    const { data: problems } = useGetProblemsQuery();
    const { data: lessons } = useGetLessonsQuery();
    const { data: dproblems } = useGetDeletedProblemsQuery();
    const { data: dlessons } = useGetDeletedLessonsQuery();
    const user = useAuthorization();

    let links: (string | undefined)[] = [
        '/Lessons?sort=popularity',
        '/Problems?sort=popularity',
        '/Lessons?sort=newest',
        '/Problems?sort=newest',
    ];
    let titles = ['Trending lessons', 'Trending problems', 'New lessons', 'New problems'];

    if (user?.role === 'Administrator') {
        links.push(undefined, undefined, undefined, undefined);
        titles.push('Deleted lessons', 'Deleted problems', 'Lesson deletion queue', 'Problem deletion queue');
    }

    const sets = useMemo(() => {
        let res = [
            [...(lessons ?? [])].sort((a, b) => b.views - a.views).slice(0, 11),
            [...(problems ?? [])].sort((a, b) => b.views - a.views).slice(0, 11),
            [...(lessons ?? [])].sort((a, b) => (b.createDate > a.createDate ? 1 : -1)).slice(0, 11),
            [...(problems ?? [])].sort((a, b) => (b.createDate > a.createDate ? 1 : -1)).slice(0, 11),
        ];
        if (user?.role === 'Administrator') {
            res.push(
                (dlessons ?? []).slice(0, 11),
                (dproblems ?? []).slice(0, 11),
                [...(lessons ?? [])]
                    .filter((l) => l.upvotes + l.downvotes > 100 && l.downvotes / l.upvotes >= 3)
                    .slice(0, 11),
                [...(problems ?? [])]
                    .filter((l) => l.upvotes + l.downvotes > 100 && l.downvotes / l.upvotes >= 3)
                    .slice(0, 11)
            );
        }
        return res;
    }, [problems, lessons, user, dlessons, dproblems]);

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
                {titles.map((t, j) => (
                    <Card key={t}>
                        <CardContent sx={{ backgroundColor: 'primary.dark', color: 'Background' }}>
                            {links[j] ? (
                                <Typography variant='h5' component={NavLink} to={links[j]!} sx={{ color: 'white' }}>
                                    {t}
                                </Typography>
                            ) : (
                                <Typography variant='h5' sx={{ color: 'white' }}>
                                    {t}
                                </Typography>
                            )}
                        </CardContent>
                        <CardContent>
                            <Stack spacing={1} direction={'row'} sx={{ overflowX: 'auto', py: '1px' }}>
                                {sets[j]?.map((p, i) => (
                                    <ProblemLessonCard element={p} key={i} />
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
