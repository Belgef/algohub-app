import { Card, CardContent, Divider, Paper, Stack, Typography } from '@mui/material';
import React from 'react';

import { ContentElement, ContentType } from '../../api/api';
import { STORAGE_BASE_URL } from '../../api/constants';
import CodeBlock from '../CodeBlock/CodeBlock';

type ContentProps = {
    content?: ContentElement[];
};

const Content = (props: ContentProps) => {
    return (
        <Stack alignItems={'stretch'} my={4} gap={3}>
            {props.content?.map((content, i) => (
                <>
                    {content.contentType === ContentType.Subtitle && (
                        <Typography variant='h5' component={'div'} key={i} className='prelined' sx={{ ml: 2 }}>
                            {content.value}
                        </Typography>
                    )}
                    {content.contentType === ContentType.Emphasis && (
                        <Paper elevation={2} sx={{ mx: 2 }} key={i}>
                            <Typography
                                variant='body1'
                                component={'div'}
                                sx={{ fontStyle: 'italic', mx: 4, my: 2 }}
                                className='prelined'
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
                            sx={{ textAlign: 'justify' }}
                            className='prelined'
                        >
                            {content.value}
                        </Typography>
                    )}
                    {content.contentType === ContentType.Image && (
                        <Card key={i} sx={{ alignSelf: 'center', minWidth: '60%' }}>
                            <img src={STORAGE_BASE_URL + content.imageName} style={{maxWidth:'100%', maxHeight:'50vh'}} alt='contentImage' />
                            <CardContent className='prelined'>{content.value}</CardContent>
                        </Card>
                    )}
                    {content.contentType === ContentType.Bar && <Divider key={i} sx={{ width: '100%' }} />}
                    {content.contentType === ContentType.Code && (
                        <CodeBlock key={i} code={content.code ?? ''} language={content.value} />
                    )}
                </>
            ))}
        </Stack>
    );
};

export default Content;
