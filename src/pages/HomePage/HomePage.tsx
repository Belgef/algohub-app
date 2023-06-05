import { Box, Card, CardContent, Container, Paper, Stack, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';

import { useGetDeletedLessonsQuery, useGetLessonsQuery } from '../../api/slices/lessonApi';
import { useGetDeletedProblemsQuery, useGetProblemsQuery } from '../../api/slices/problemApi';
import ProblemLessonCard from '../../components/ProblemLessonCard/ProblemLessonCard';
import { isAdmin } from '../../helpers/userHelpers';
import useAuthorization from '../../hooks/useAuthorization';

const HomePage = () => {
    const user = useAuthorization();

    const { data: problems } = useGetProblemsQuery();
    const { data: lessons } = useGetLessonsQuery();
    const { data: deletedProblems } = useGetDeletedProblemsQuery(undefined, { skip: !isAdmin(user) });
    const { data: deletedLessons } = useGetDeletedLessonsQuery(undefined, { skip: !isAdmin(user) });

    let links: (string | undefined)[] = [
        '/Problems?sort=popularity',
        '/Lessons?sort=popularity',
        '/Problems?sort=newest',
        '/Lessons?sort=newest',
    ];
    let titles = ['Trending problems', 'Trending lessons', 'New problems', 'New lessons'];

    if (user?.role === 'Administrator') {
        links.push(undefined, undefined, undefined, undefined);
        titles.push('Deleted problems', 'Deleted lessons', 'Problem deletion queue', 'Lesson deletion queue');
    }

    const sets = useMemo(() => {
        let res = [
            [...(problems ?? [])].sort((a, b) => b.views - a.views).slice(0, 11),
            [...(lessons ?? [])].sort((a, b) => b.views - a.views).slice(0, 11),
            [...(problems ?? [])].sort((a, b) => (b.createDate > a.createDate ? 1 : -1)).slice(0, 11),
            [...(lessons ?? [])].sort((a, b) => (b.createDate > a.createDate ? 1 : -1)).slice(0, 11),
        ];
        if (user?.role === 'Administrator') {
            res.push(
                (deletedProblems ?? []).slice(0, 11),
                (deletedLessons ?? []).slice(0, 11),
                [...(problems ?? [])]
                    .filter((l) => l.upvotes + l.downvotes > 100 && l.downvotes / l.upvotes >= 3)
                    .slice(0, 11),
                [...(lessons ?? [])]
                    .filter((l) => l.upvotes + l.downvotes > 100 && l.downvotes / l.upvotes >= 3)
                    .slice(0, 11)
            );
        }
        return res;
    }, [problems, lessons, user, deletedLessons, deletedProblems]);

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
