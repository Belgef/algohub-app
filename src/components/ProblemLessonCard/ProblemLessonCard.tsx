import { Avatar, Card, CardContent, CardMedia, Chip, Stack, Typography } from '@mui/material';
import moment from 'moment';
import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';

import { LessonViewModel, ProblemViewModel } from '../../api/api';
import { STORAGE_BASE_URL } from '../../api/constants';
import { getUserIconUrl, getUserName } from '../../helpers/userHelpers';

type ProblemLessonCardProps = {
    element: ProblemViewModel | LessonViewModel;
};

const ProblemLessonCard = (props: ProblemLessonCardProps) => {
    const [element, userName, userIconUrl, baseLink, createDate] = useMemo(
        () =>
            [
                {
                    id: 'problemId' in props.element ? props.element.problemId : props.element.lessonId,
                    name: 'problemName' in props.element ? props.element.problemName : props.element.title,
                    imageName: props.element.imageName,
                    views: props.element.views,
                    createDate: props.element.createDate,
                    author: props.element.author,
                    tags: props.element.tags,
                },
                getUserName(props.element.author),
                getUserIconUrl(props.element.author),
                'problemName' in props.element ? '/Problems/' : '/Lessons/',
                moment.utc(props.element.createDate).local().calendar().toLocaleString(),
            ] as const,
        [props.element]
    );
    return (
        <Card sx={{ width: 273, flexShrink: 0, flexGrow: 0 }} component={NavLink} to={baseLink + element.id.toString()}>
            <CardMedia
                sx={{ height: 140 }}
                image={STORAGE_BASE_URL + (element.imageName ?? 'placeholder-16-9.jpg')}
                title={element.name}
            />
            <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                    {element.name}
                </Typography>
                <Stack direction={'row'} gap={0.5}>
                    {element.tags?.slice(0, 3)?.map((t) => (
                        <Chip
                            size='small'
                            label={t}
                            color='primary'
                            component={NavLink}
                            to={baseLink + '?search=tag%3A' + t}
                        />
                    ))}
                    {(element.tags?.length ?? 0) > 3 && '...'}
                </Stack>
                <Stack direction={'row'} gap={2} flexWrap='wrap' alignItems='center' sx={{ marginTop: '0.5em' }}>
                    <Chip
                        avatar={<Avatar alt={userName} src={userIconUrl} />}
                        label={userName}
                        variant='outlined'
                        size='small'
                        component={NavLink}
                        to={baseLink + '?search=author%3A' + userName}
                    />
                    <Typography variant='body2' color='text.secondary'>
                        {element.views} views
                    </Typography>
                </Stack>
                <Typography variant='body2' color='text.secondary' mt={1}>
                    {createDate}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ProblemLessonCard;
