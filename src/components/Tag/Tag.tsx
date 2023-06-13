import { Chip } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

type TagProps = {
    tag: string;
    isProblem?: boolean;
};

const Tag = (props: TagProps) => {
    return (
        <Chip
            size='small'
            label={props.tag}
            color='primary'
            component={NavLink}
            to={(props.isProblem ? '/Problems/' : '/Lessons/') + '?search=tag%3A' + props.tag}
            sx={(theme) => ({
                boxShadow: '2px 2px 4px #00000040',
                transition: 'filter 0.2s',
                cursor: 'pointer',
                backgroundColor: theme.palette.mode === 'dark' ? 'grey.800' : 'primary.main',
                color: 'white',
                '&:hover': {
                    filter: 'brightness(1.1)',
                    color: 'white',
                },
            })}
        />
    );
};

export default Tag;
