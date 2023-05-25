import 'highlight.js/styles/vs.css';

import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Container,
    Divider,
    FormControl,
    InputLabel,
    Button as MUIButton,
    MenuItem,
    Paper,
    Select,
    Stack,
    Tab,
    Tabs,
    Toolbar,
    Typography,
} from '@mui/material';
import hljs from 'highlight.js';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ContentType } from '../../api/api';
import { useGetProblemByIdQuery } from '../../api/slices/problemApi';
import CodeBlock from '../../components/CodeBlock/CodeBlock';
import CommentsSection from '../../components/CommentsSection/CommentsSection';
import Solves from '../../components/Solves/Solves';

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
    const { id: idRaw } = useParams();
    const id = Number(idRaw);
    const { data: problem } = useGetProblemByIdQuery(id, { skip: isNaN(id) });
    // const problem: ProblemViewModel = {
    //     problemId: 21,
    //     problemName: 'A Palindromic Substrings',
    //     problemContent: [
    //         { contentType: ContentType.Subtitle, value: 'A problem' },
    //         { contentType: ContentType.Emphasis, value: 'An Emphasis' },
    //         {
    //             contentType: ContentType.Paragraph,
    //             value: 'Given a string s, return the number of palindromic substrings in it.\nA string is a palindrome when it reads the same backward as forward.\nA substring is a contiguous sequence of characters within the string.',
    //         },
    //         {
    //             contentType: ContentType.Image,
    //             imageName: 'fdsf',
    //             value: 'Some caption',
    //         },
    //         { contentType: ContentType.Bar },
    //         { contentType: ContentType.Subtitle, value: 'Examples' },
    //         { contentType: ContentType.Code, value: 'javascript', code: 'console.log("Hello world!!!")' },
    //     ],
    //     createDate: new Date(Date.now()),
    //     views: 78432,
    //     solves: 2382,
    //     upvotes: 3129,
    //     downvotes: 23,
    //     memoryLimitBytes: 2048,
    //     timeLimitMs: 2000,
    //     author: {
    //         userId: '10',
    //         fullName: 'Adriana Blanca',
    //         email: 'dsfd',
    //         userName: '@adriana',
    //     },
    // };

    useEffect(() => hljs.highlightAll());

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Container maxWidth='lg'>
            <Stack>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mt='1em'>
                    <Stack>
                        <Typography gutterBottom variant='h4' component='div'>
                            {problem?.problemName}
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
                            <Typography variant='body1'>{problem?.upvotes ?? 0}</Typography>
                        </Stack>
                        <Stack gap={1} alignItems={'center'}>
                            <ThumbDownIcon fontSize='large' color='primary' />
                            <Typography variant='body1'>{problem?.downvotes ?? 0}</Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Container maxWidth='md'>
                    <Stack alignItems={'center'} my={4} gap={3}>
                        {problem?.problemContent?.map((content, i) => (
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
                        <MUIButton size='large' variant='contained' sx={{ width: 200 }}>
                            Solve
                        </MUIButton>
                    </Stack>
                </Container>
            </Stack>
            <Container maxWidth='md'>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
                        <Tab label='Solves' {...a11yProps(0)} />
                        <Tab label='Comments' {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Stack gap={1}>
                        <Toolbar component={Stack} direction={'row'}>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id='demo-simple-select-helper-label'>Sort by</InputLabel>
                                <Select
                                    labelId='demo-simple-select-helper-label'
                                    id='demo-simple-select-helper'
                                    value={1}
                                    label='Sort by'
                                    size='small'
                                >
                                    <MenuItem value=''>
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={1}>Popularity</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id='demo-simple-select-helper-label'>Language</InputLabel>
                                <Select
                                    labelId='demo-simple-select-helper-label'
                                    id='demo-simple-select-helper'
                                    value={1}
                                    label='Language'
                                    size='small'
                                >
                                    <MenuItem value=''>
                                        <em>Any</em>
                                    </MenuItem>
                                    <MenuItem value={1}>Any</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Toolbar>
                        <Solves />
                    </Stack>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <CommentsSection comments={[]} noTitle />
                </TabPanel>
            </Container>
        </Container>
    );
};

export default ProblemPage;
