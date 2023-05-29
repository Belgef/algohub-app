import { Avatar, Card, CardContent, CardMedia, Chip, Stack, Typography } from '@mui/material';
import moment from 'moment';
import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';

import { LessonViewModel, ProblemViewModel } from '../../api/api';
import { STORAGE_BASE_URL } from '../../api/constants';

type ProblemLessonCardProps = {
    element: ProblemViewModel | LessonViewModel;
};

const ProblemLessonCard = (props: ProblemLessonCardProps) => {
    const p = useMemo(
        () =>
            'problemName' in props.element
                ? {
                      id: props.element.problemId,
                      name: props.element.problemName,
                      imageName: props.element.imageName,
                      views: props.element.views,
                      createDate: props.element.createDate,
                      author: props.element.author,
                      tags: props.element.tags,
                  }
                : {
                      id: props.element.lessonId,
                      name: props.element.title,
                      imageName: props.element.imageName,
                      views: props.element.views,
                      createDate: props.element.createDate,
                      author: props.element.author,
                      tags: props.element.tags,
                  },
        [props.element]
    );
    return (
        <Card
            sx={{ width: 273, flexShrink: 0, flexGrow: 0 }}
            component={NavLink}
            to={('problemId' in props.element ? '/algohub-app/Problems/' : '/algohub-app/Lessons/') + p.id.toString()}
        >
            <CardMedia
                sx={{ height: 140 }}
                image={STORAGE_BASE_URL + (p.imageName ?? 'placeholder-16-9.jpg')}
                title={p.name}
            />
            <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                    {p.name}
                </Typography>
                <Stack direction={'row'} gap={0.5}>
                    {p.tags?.slice(0, 3)?.map((t) => (
                        <Chip
                            size='small'
                            label={t}
                            color='primary'
                            component={NavLink}
                            to={('problemId' in props.element ? '/algohub-app/Problems' : '/algohub-app/Lessons') + '?search=tag%3A' + t}
                        />
                    ))}
                    {(p.tags?.length ?? 0) > 3 && '...'}
                </Stack>
                <Stack direction={'row'} gap={2} flexWrap='wrap' alignItems='center' sx={{ marginTop: '0.5em' }}>
                    <Chip
                        avatar={
                            <Avatar
                                alt='Natacha'
                                src={
                                    p?.author?.iconName
                                        ? STORAGE_BASE_URL + p?.author.iconName
                                        : 'https://ui-avatars.com/api/?rounded=true&name=' +
                                          (p?.author?.fullName ?? p?.author?.userName ?? 'deleted')
                                }
                            />
                        }
                        label={p?.author?.fullName ?? p?.author?.userName ?? 'deleted'}
                        variant='outlined'
                        size='small'
                        component={NavLink}
                        to={
                            ('problemId' in props.element ? '/algohub-app/Problems' : '/algohub-app/Lessons') +
                                '?search=author%3A' +
                                p?.author?.fullName ??
                            p?.author?.userName ??
                            'deleted'
                        }
                    />
                    <Typography variant='body2' color='text.secondary'>
                        {p.views} views
                    </Typography>
                </Stack>
                <Typography variant='body2' color='text.secondary' mt={1}>
                    {moment.utc(p.createDate).local().calendar().toLocaleString()}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ProblemLessonCard;
