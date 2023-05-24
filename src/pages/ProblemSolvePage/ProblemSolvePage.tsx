import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Container,
    Divider,
    Grid,
    Paper,
    Stack,
    Typography,
    Button,
} from '@mui/material';
import { ContentType, ProblemViewModel } from '../../api/api';
import CodeEditor from '../../components/CodeEditor/CodeEditor';
import CodeBlock from '../../components/CodeBlock/CodeBlock';

const ProblemSolvePage = () => {
    const problem: ProblemViewModel = {
        problemId: 21,
        problemName: 'A Palindromic Substrings',
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

    return (
        <Grid container sx={{ width: '100%' }} alignItems={'stretch'}>
            <Grid item sm={12} md={8} lg={8}>
                <CodeEditor default='code();' onChange={() => {}} />
            </Grid>
            <Grid item sm={12} md={4} lg={4}>
                <Container sx={{ mt: '1em' }}>
                    <Typography variant='h5' component={'div'}>
                        {problem.problemName}
                    </Typography>
                    <Container maxWidth='md' style={{ maxHeight: '39em', overflow: 'auto' }}>
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
                        <Button size='large' variant='contained' fullWidth>
                            Check
                        </Button>
                </Container>
            </Grid>
        </Grid>
    );
};

export default ProblemSolvePage;
