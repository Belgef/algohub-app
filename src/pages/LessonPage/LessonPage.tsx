import React, { useEffect } from 'react';
import { ContentType, ProblemViewModel, UserViewModel } from '../../api/api';
import {
    Avatar,
    Container,
    Stack,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Paper,
    Divider,
    Chip,
    Grid,
} from '@mui/material';
import CodeBlock from '../../components/CodeBlock/CodeBlock';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs.css';
import Comments from '../../components/Comments/Comments';
import { Form, Button } from 'semantic-ui-react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

interface Comment {
    comment: string;
    author: UserViewModel;
    replies?: Comment[];
}

const LessonPage = () => {
    const problem: ProblemViewModel = {
        problemId: 21,
        problemName: "Dijkstra's algorithm",
        problemContent: [
            { contentType: ContentType.Subtitle, value: 'A problem' },
            { contentType: ContentType.Emphasis, value: 'An Emphasis' },
            {
                contentType: ContentType.Paragraph,
                value: 'Given a string s, return the number of palindromic substrings in it.\nA string is a palindrome when it reads the same backward as forward.\nA substring is a contiguous sequence of characters within the string.',
            },
            {
                contentType: ContentType.Image,
                imageName: 'fdsf',
                value: 'Some caption',
            },
            { contentType: ContentType.Bar },
            { contentType: ContentType.Subtitle, value: 'Examples' },
            { contentType: ContentType.Code, value: 'javascript', code: 'console.log("Hello world!!!")' },
        ],
        createDate: new Date(Date.now()),
        views: 78432,
        solves: 2382,
        upvotes: 3129,
        downvotes: 23,
        memoryLimitBytes: 2048,
        timeLimitMs: 2000,
        author: {
            userId: '10',
            fullName: 'Adriana Blanca',
            email: 'dsfd',
            userName: '@adriana',
        },
    };

    const users: UserViewModel[] = [
        {
            userId: '',
            fullName: 'User 1',
            email: '',
            userName: '',
        },
        {
            userId: '',
            fullName: 'User 2',
            email: '',
            userName: '',
        },
        {
            userId: '',
            fullName: 'User 3',
            email: '',
            userName: '',
        },
    ];

    const comments: Comment[] = [
        {
            comment: 'Great riddle!',
            author: users[0],
            replies: [
                {
                    comment: 'Thanks!',
                    author: problem.author!,
                    replies: [{ comment: 'Reply to a reply', author: users[1] }],
                },
            ],
        },
        {
            comment: 'Comment 2',
            author: users[2],
        },
    ];

    useEffect(() => hljs.highlightAll());

    return (
        <Container maxWidth='lg'>
            <Stack>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mt='1em'>
                    <Stack>
                        <Typography gutterBottom variant='h4' component='div' mt={'1em'}>
                            {problem.problemName}
                        </Typography>
                        <Stack direction={'row'} alignItems={'center'} gap={0.5} ml={2}>
                            <Chip
                                avatar={<Avatar alt='Natacha' src={`https://loremflickr.com/240/240/man`} />}
                                label={problem?.author?.fullName}
                                variant='outlined'
                            />
                            <Chip size='small' label='tag1' color='primary' />
                            <Chip size='small' label='tag2' color='primary' />
                            <Chip size='small' label='tag3' color='primary' />
                        </Stack>
                    </Stack>
                    <Stack direction={'row'} gap={2}>
                        <Stack gap={1} alignItems={'center'}>
                            <ThumbUpIcon fontSize='large' color='primary' />
                            <Typography variant='body1'>{problem.upvotes}</Typography>
                        </Stack>
                        <Stack gap={1} alignItems={'center'}>
                            <ThumbDownIcon fontSize='large' color='primary' />
                            <Typography variant='body1'>{problem.downvotes}</Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Container maxWidth='md'>
                    <Stack alignItems={'center'} my={4} gap={3}>
                        {problem.problemContent.map((content, i) => (
                            <>
                                {content.contentType === ContentType.Subtitle && (
                                    <Typography variant='h5' component={'div'} alignSelf='stretch' key={i}>
                                        {content.value}
                                    </Typography>
                                )}
                                {content.contentType === ContentType.Emphasis && (
                                    <Paper elevation={2} sx={{ mx: 2, alignSelf: 'stretch' }} key={i}>
                                        <Typography
                                            variant='body1'
                                            component={'div'}
                                            sx={{ fontStyle: 'italic', mx: 4, my: 2 }}
                                        >
                                            {content.value}
                                        </Typography>
                                    </Paper>
                                )}
                                {content.contentType === ContentType.Paragraph && (
                                    <Typography
                                        key={i}
                                        variant='body1'
                                        component={'div'}
                                        sx={{ textIndent: 24, textAlign: 'justify' }}
                                    >
                                        {content.value}
                                    </Typography>
                                )}
                                {content.contentType === ContentType.Image && (
                                    <Card key={i}>
                                        <CardMedia
                                            image={`https://loremflickr.com/480/360/code`}
                                            title='fsd'
                                            sx={{ height: '24em', width: '36em' }}
                                        />
                                        <CardContent>{content.value}</CardContent>
                                    </Card>
                                )}
                                {content.contentType === ContentType.Bar && (
                                    <Divider key={i} sx={{ alignSelf: 'stretch' }} />
                                )}
                                {content.contentType === ContentType.Code && (
                                    <CodeBlock key={i} code={content.code ?? ''} language={content.value} />
                                )}
                            </>
                        ))}
                    </Stack>
                </Container>
            </Stack>
            <Container maxWidth='md'>
                <Typography gutterBottom variant='h5' component='div' mt={'1em'}>
                    Comments
                </Typography>
                <Comments />
                <Form reply>
                    <Form.TextArea />
                    <Button content='Add Reply' labelPosition='left' icon='edit' primary />
                </Form>
            </Container>
        </Container>
    );
};

export default LessonPage;
