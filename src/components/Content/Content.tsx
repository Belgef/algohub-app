import { CardMedia, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { Card, CardContent, Container, Divider } from 'semantic-ui-react';

import { ContentElement, ContentType } from '../../api/api';
import CodeBlock from '../CodeBlock/CodeBlock';

type ContentProps = {
    content?: ContentElement[];
};

const Content = (props: ContentProps) => {
    return (
        <Container maxWidth='md'>
            <Stack alignItems={'center'} my={4} gap={3}>
                {props.content?.map((content, i) => (
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
                        {content.contentType === ContentType.Bar && <Divider key={i} sx={{ alignSelf: 'stretch' }} />}
                        {content.contentType === ContentType.Code && (
                            <CodeBlock key={i} code={content.code ?? ''} language={content.value} />
                        )}
                    </>
                ))}
            </Stack>
        </Container>
    );
};

export default Content;
