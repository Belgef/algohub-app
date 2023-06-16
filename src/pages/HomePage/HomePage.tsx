import InfoIcon from '@mui/icons-material/Info';
import { Box, Card, CardContent, Container, Paper, Stack, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';

import { useAppSelector } from '../../api/hooks';
import { useGetDeletedLessonsQuery, useGetLessonsQuery } from '../../api/slices/lessonApi';
import { useGetDeletedProblemsQuery, useGetProblemsQuery } from '../../api/slices/problemApi';
import { useGetUsersQuery } from '../../api/slices/userApi';
import ProblemLessonCard from '../../components/ProblemLessonCard/ProblemLessonCard';
import UserCard from '../../components/UserCard/UserCard';
import { isAdmin } from '../../helpers/userHelpers';
import useAuthorization from '../../hooks/useAuthorization';

const HomePage = () => {
    const user = useAuthorization();
    const theme = useAppSelector((state) => state.appSlice.theme);

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
    const userTitles = ['Best Solvers', 'Best Problem Creators', 'Best Lesson Creators'];

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

    const { data: users } = useGetUsersQuery();
    const userSets = [
        [...(users ?? [])]
            .sort((a, b) => (b.userStats?.solvedProblems ?? 0) - (a.userStats?.solvedProblems ?? 0))
            .slice(0, 10),
        [...(users ?? [])]
            .sort((a, b) => (b.userStats?.createdProblems ?? 0) - (a.userStats?.createdProblems ?? 0))
            .slice(0, 10),
        [...(users ?? [])]
            .sort((a, b) => (b.userStats?.createdLessons ?? 0) - (a.userStats?.createdLessons ?? 0))
            .slice(0, 10),
    ];

    return (
        <>
            <Container
                maxWidth={false}
                sx={{
                    backgroundImage: 'url(hero.jpg)',
                    backgroundBlendMode: 'multiply',
                    backgroundSize: 'cover',
                    mb: '2em',
                    backgroundColor: '#00000060',
                }}
            >
                <Container maxWidth='lg'>
                    <Box
                        sx={{
                            height: 400,
                            background: 'none',
                            px: '2em',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1em',
                        }}
                        component={Paper}
                    >
                        <img src='logo192.png' alt='logo' />
                        <Typography variant='h1' color={'white'} fontWeight={700} display={'inline'}>
                            ALGOHUB
                        </Typography>
                        <Typography variant='h4' color={'white'} display={'inline'}>
                            open community algorithm solving platform
                        </Typography>
                    </Box>
                </Container>
            </Container>
            <Container maxWidth={false} sx={{ mb: '2em' }}>
                <Container maxWidth='lg'>
                    <Box
                        sx={{
                            height: 200,
                            px: '4em',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3em',
                        }}
                        component={Paper}
                        elevation={8}
                    >
                        <InfoIcon sx={{ fontSize: 60 }} color='primary' />
                        <Typography variant='h5' display={'inline'}>
                            Competitive programming can help develop skills such as problem-solving, critical thinking,
                            and efficient coding. These can be valuable in a variety of careers such as software
                            development, data science, and research.
                        </Typography>
                    </Box>
                </Container>
            </Container>
            <Container maxWidth='lg'>
                <Stack spacing={3}>
                    {titles.map((t, j) => (
                        <Card key={t} elevation={6}>
                            <CardContent
                                sx={{
                                    backgroundColor: theme === 'dark' ? 'grey.900' : 'primary.main',
                                }}
                            >
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
                                {sets[j]?.length > 0 ? (
                                    <Stack
                                        spacing={3}
                                        direction={'row'}
                                        sx={{ overflowX: 'auto', overflowY: 'visible', py: '1px', pb: 1 }}
                                    >
                                        {sets[j]?.map((p, i) => (
                                            <ProblemLessonCard element={p} key={i} />
                                        ))}
                                    </Stack>
                                ) : (
                                    <Typography textAlign='center'>Nothing to show</Typography>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                    {userTitles.map((t, j) => (
                        <Card key={t} elevation={6}>
                            <CardContent
                                sx={{
                                    backgroundColor: theme === 'dark' ? 'grey.900' : 'primary.main',
                                }}
                            >
                                    <Typography variant='h5' sx={{ color: 'white' }}>
                                        {t}
                                    </Typography>
                            </CardContent>
                            <CardContent>
                                {userSets[j]?.length > 0 ? (
                                    <Stack
                                        spacing={3}
                                        direction={'row'}
                                        sx={{ overflowX: 'auto', overflowY: 'visible', py: '1px', pb: 1 }}
                                    >
                                        {userSets[j]?.map((u, i) => (
                                            <UserCard element={u} key={i} />
                                        ))}
                                    </Stack>
                                ) : (
                                    <Typography textAlign='center'>Nothing to show</Typography>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            </Container>
        </>
    );
};

export default HomePage;
