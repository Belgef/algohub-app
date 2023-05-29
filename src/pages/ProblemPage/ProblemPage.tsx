import 'highlight.js/styles/vs.css';

import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {
    Avatar,
    Box,
    Button,
    Chip,
    Container,
    IconButton,
    Button as MUIButton,
    Stack,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';
import hljs from 'highlight.js';
import React, { useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

import { CommentViewModel, ProblemCommentViewModel } from '../../api/api';
import { STORAGE_BASE_URL } from '../../api/constants';
import { useAddProblemCommentMutation, useGetProblemCommentsQuery } from '../../api/slices/commentApi';
import {
    useDeleteProblemMutation,
    useGetProblemByIdQuery,
    useGetVoteForProblemQuery,
    useRetrieveProblemMutation,
    useVoteForProblemMutation,
} from '../../api/slices/problemApi';
import CommentsSection from '../../components/CommentsSection/CommentsSection';
import Content from '../../components/Content/Content';
import SolvesSection from '../../components/SolvesSection/SolvesSection';
import useAuthorization from '../../hooks/useAuthorization';

const normalizeComments = (comments: ProblemCommentViewModel[]): CommentViewModel[] =>
    comments?.map((c) => ({
        ...c,
        id: c.problemCommentId,
        rootId: c.problemId,
        replies: c.replies ? normalizeComments(c.replies) : undefined,
    }));

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const ProblemPage = () => {
    const user = useAuthorization();
    const { id: idRaw } = useParams();
    const id = Number(idRaw);
    const { data: problem, isLoading: problemLoading } = useGetProblemByIdQuery(id, { skip: isNaN(id) });
    const { data: comments } = useGetProblemCommentsQuery(id, { skip: isNaN(id) });
    const { data: vote } = useGetVoteForProblemQuery(id, { skip: isNaN(id) });
    const [addProblemComment] = useAddProblemCommentMutation();
    const [voteForLesson] = useVoteForProblemMutation();
    const navigate = useNavigate();
    const [deleteProblem] = useDeleteProblemMutation();
    const [retrieveProblem] = useRetrieveProblemMutation();

    if (!idRaw || (!problemLoading && !problem)) {
        navigate('/');
    }

    const normComments = comments ? normalizeComments(comments) : undefined;

    const handleReply = (message: string, parentComment: number | undefined = undefined) => {
        addProblemComment({ rootId: id, parentCommentId: parentComment, content: message });
    };

    useEffect(() => hljs.highlightAll());

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Container maxWidth='lg'>
            <Stack>
                <img
                    src={STORAGE_BASE_URL + problem?.imageName}
                    style={{ maxWidth: '100%', maxHeight: '50vh', alignSelf: 'center' }}
                    alt='mainImage'
                    onError={(event) => (event.currentTarget.style.display = 'none')}
                />
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mt='1em'>
                    <Stack>
                        <Typography gutterBottom variant='h4' component='div'>
                            {problem?.problemName}
                        </Typography>
                        <Stack direction={'row'} alignItems={'center'} gap={0.5} ml={2}>
                            <Chip
                                avatar={
                                    <Avatar
                                        alt={problem?.author?.fullName ?? problem?.author?.userName ?? 'deleted'}
                                        src={
                                            problem?.author?.iconName
                                                ? STORAGE_BASE_URL + problem?.author.iconName
                                                : 'https://ui-avatars.com/api/?rounded=true&name=' +
                                                  (problem?.author?.fullName ?? problem?.author?.userName ?? 'deleted')
                                        }
                                    />
                                }
                                label={problem?.author?.fullName ?? problem?.author?.userName ?? 'deleted'}
                                variant='outlined'
                                component={NavLink}
                                to={
                                    '/algohub-app/Lessons?search=author%3A' + problem?.author?.fullName ??
                                    problem?.author?.userName ??
                                    'deleted'
                                }
                            />
                            {problem?.tags?.map((t) => (
                                <Chip
                                    size='small'
                                    label={t}
                                    color='primary'
                                    component={NavLink}
                                    to={'/algohub-app/Lessons?search=tag%3A' + t}
                                />
                            ))}
                        </Stack>
                    </Stack>
                    <Stack direction={'row'} gap={2}>
                        <Stack alignItems={'center'}>
                            <IconButton
                                onClick={() => voteForLesson({ problemId: id, isUpvote: true })}
                                disabled={!user || vote === true}
                            >
                                <ThumbUpIcon fontSize='large' color={vote === true ? 'primary' : undefined} />
                            </IconButton>
                            <Typography variant='body1'>{problem?.upvotes ?? 0}</Typography>
                        </Stack>
                        <Stack alignItems={'center'}>
                            <IconButton
                                onClick={() => voteForLesson({ problemId: id, isUpvote: false })}
                                disabled={!user || vote === false}
                            >
                                <ThumbDownIcon fontSize='large' color={vote === false ? 'primary' : undefined} />
                            </IconButton>
                            <Typography variant='body1'>{problem?.downvotes ?? 0}</Typography>
                        </Stack>
                    </Stack>
                    {user?.role === 'Administrator' && (
                        <Button
                            variant='contained'
                            color='error'
                            onClick={() => {
                                !problem?.deleted ? deleteProblem(id) : retrieveProblem(id);
                            }}
                        >
                            {!problem?.deleted ? 'Delete' : 'Retrieve'}
                        </Button>
                    )}
                </Stack>
                <Container maxWidth='md'>
                    <Content content={problem?.problemContent} />
                </Container>
                <MUIButton
                    size='large'
                    variant='contained'
                    sx={{ width: 200, alignSelf: 'center' }}
                    component={NavLink}
                    to='solve'
                >
                    Solve
                </MUIButton>
            </Stack>
            <Container maxWidth='md'>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
                        <Tab label='Solves' {...a11yProps(0)} />
                        <Tab label='Comments' {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <SolvesSection />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <CommentsSection comments={normComments} noTitle onReply={handleReply} />
                </TabPanel>
            </Container>
        </Container>
    );
};

export default ProblemPage;
