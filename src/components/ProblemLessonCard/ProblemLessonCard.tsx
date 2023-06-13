import { Avatar, Card, CardContent, CardMedia, Chip, Stack, Tooltip, Typography } from '@mui/material';
import moment from 'moment';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LessonViewModel, ProblemViewModel } from '../../api/api';
import { STORAGE_BASE_URL } from '../../api/constants';
import { getUserIconUrl, getUserName } from '../../helpers/userHelpers';
import Tag from '../Tag/Tag';

type ProblemLessonCardProps = {
    element: ProblemViewModel | LessonViewModel;
};

const ProblemLessonCard = (props: ProblemLessonCardProps) => {
    const navigate = useNavigate();
    const [element, isProblem, userName, userIconUrl, baseLink, createDate] = useMemo(
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
                'problemName' in props.element,
                getUserName(props.element.author),
                getUserIconUrl(props.element.author),
                'problemName' in props.element ? '/Problems/' : '/Lessons/',
                moment.utc(props.element.createDate).local().calendar().toLocaleString(),
            ] as const,
        [props.element]
    );

    const [elev, setElev] = useState(6);

    return (
        <Typography component='div' position='relative' sx={{ width: 273, flexShrink: 0, flexGrow: 0 }}>
            <Card
                sx={{ width: '100%', height: '100%', cursor: 'pointer' }}
                onClick={() => navigate(baseLink + element.id.toString())}
                elevation={elev}
                onMouseEnter={() => setElev(8)}
                onMouseLeave={() => setElev(6)}
            >
                <CardMedia
                    sx={{ height: 140 }}
                    image={STORAGE_BASE_URL + (element.imageName ?? 'placeholder-16-9.jpg')}
                    title={element.name}
                />
                <CardContent component={Stack} direction='column' height='calc(100% - 140px)' gap={1.5}>
                    <Tooltip title={element.name} arrow>
                        <Typography gutterBottom variant='h6' component='div' sx={{ flex: 1, mb: 0 }} noWrap>
                            {element.name}
                        </Typography>
                    </Tooltip>
                    <Stack direction={'row'} alignItems='center' justifyContent='space-between' mt='3.5em'>
                        <Typography variant='body2' color='text.secondary'>
                            {element.views} views
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            Created {createDate}
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
            <Stack
                direction={'row'}
                gap={0.5}
                alignItems='center'
                position='absolute'
                bottom='3.5em'
                mx='1em'
                py='4px'
                width='calc(273px - 2em)'
                overflow='hidden'
                sx={{ overflowX: 'scroll' }}
            >
                <Chip
                    avatar={<Avatar alt={userName} src={userIconUrl} />}
                    label={'by ' + userName}
                    variant='outlined'
                    size='small'
                    sx={{ height: '2.5em' }}
                    onClick={() => navigate(baseLink + '?search=author%3A' + userName)}
                />
                {element.tags?.map((t) => (
                    <Tag tag={t} isProblem={isProblem} />
                ))}
                {(element.tags?.length ?? 0) > 3 && '...'}
            </Stack>
        </Typography>
    );
};

export default ProblemLessonCard;
