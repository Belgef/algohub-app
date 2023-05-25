import 'highlight.js/styles/vs.css';

import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Avatar, Chip, Container, IconButton, Stack, Typography } from '@mui/material';
import hljs from 'highlight.js';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { CommentViewModel, LessonCommentViewModel } from '../../api/api';
import { STORAGE_BASE_URL } from '../../api/constants';
import { useAddLessonCommentMutation, useGetLessonCommentsQuery } from '../../api/slices/commentApi';
import { useGetLessonByIdQuery, useGetVoteForLessonQuery, useVoteForLessonMutation } from '../../api/slices/lessonApi';
import CommentsSection from '../../components/CommentsSection/CommentsSection';
import Content from '../../components/Content/Content';
import useAuthorization from '../../hooks/useAuthorization';

const normalizeComments = (comments: LessonCommentViewModel[]): CommentViewModel[] =>
    comments?.map((c) => ({
        ...c,
        id: c.lessonCommentId,
        rootId: c.lessonId,
        replies: c.replies ? normalizeComments(c.replies) : undefined,
    }));

const LessonPage = () => {
    const user = useAuthorization();
    const { id: idRaw } = useParams();
    const id = Number(idRaw);
    const { data: lesson, isLoading: lessonLoading } = useGetLessonByIdQuery(id, { skip: isNaN(id) });
    const { data: comments } = useGetLessonCommentsQuery(id, { skip: isNaN(id) });
    const { data: vote } = useGetVoteForLessonQuery(id, { skip: isNaN(id) });
    const [addLessonComment] = useAddLessonCommentMutation();
    const [voteForLesson] = useVoteForLessonMutation();
    const navigate = useNavigate()

    if(!idRaw || (!lessonLoading && !lesson)){
        navigate("/")
    }

    const normComments = comments ? normalizeComments(comments) : undefined;

    const handleReply = (message: string, parentComment: number | undefined = undefined) => {
        addLessonComment({ rootId: id, parentCommentId: parentComment, content: message });
    };

    useEffect(() => hljs.highlightAll());

    return (
        <Container maxWidth='lg'>
            <Stack>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mt='1em'>
                    <Stack>
                        <Typography gutterBottom variant='h4' component='div' mt={'1em'}>
                            {lesson?.title}
                        </Typography>
                        <Stack direction={'row'} alignItems={'center'} gap={0.5} ml={2}>
                            <Chip
                                avatar={
                                    <Avatar
                                        alt={lesson?.author?.fullName}
                                        src={
                                            lesson?.author?.iconName
                                                ? STORAGE_BASE_URL + lesson?.author.iconName
                                                : 'https://ui-avatars.com/api/?rounded=true&name=' +
                                                      lesson?.author?.fullName ?? lesson?.author?.userName
                                        }
                                    />
                                }
                                label={lesson?.author?.fullName}
                                variant='outlined'
                            />
                            <Chip size='small' label='tag1' color='primary' />
                            <Chip size='small' label='tag2' color='primary' />
                            <Chip size='small' label='tag3' color='primary' />
                        </Stack>
                    </Stack>
                    <Stack direction={'row'} gap={2}>
                        <Stack alignItems={'center'}>
                            <IconButton
                                onClick={() => voteForLesson({ lessonId: id, isUpvote: true })}
                                disabled={!user || vote === true}
                            >
                                <ThumbUpIcon fontSize='large' color={vote === true ? 'primary' : undefined} />
                            </IconButton>
                            <Typography variant='body1'>{lesson?.upvotes ?? 0}</Typography>
                        </Stack>
                        <Stack alignItems={'center'}>
                            <IconButton
                                onClick={() => voteForLesson({ lessonId: id, isUpvote: false })}
                                disabled={!user || vote === false}
                            >
                                <ThumbDownIcon fontSize='large' color={vote === false ? 'primary' : undefined} />
                            </IconButton>
                            <Typography variant='body1'>{lesson?.downvotes ?? 0}</Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Content content={lesson?.lessonContent} />
            </Stack>
            <Container maxWidth='md'>
                <CommentsSection comments={normComments} onReply={handleReply} />
            </Container>
        </Container>
    );
};

export default LessonPage;
