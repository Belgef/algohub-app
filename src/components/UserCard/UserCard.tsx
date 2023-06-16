import { Avatar, Box, Card, CardContent, Divider } from '@mui/material';
import { Typography } from '@mui/material';
import React from 'react';

import { UserViewModel } from '../../api/api';
import { getUserIconUrl, getUserName } from '../../helpers/userHelpers';

type UserCardProps = {
    element: UserViewModel
}

export const UserCard = (props: UserCardProps) => {
    const userName = getUserName(props.element);
    const userUrl = getUserIconUrl(props.element)

    return (
        <Card sx={{ minWidth: 256, textAlign: 'center' }}>
            <CardContent>
                <Avatar sx={{ width: 120, height: 120, margin: 'auto' }} src={userUrl} />
                <Typography
                    component='h3'
                    sx={{ fontSize: 18, fontWeight: 'bold', letterSpacing: '0.5px', mt: 4, mb: 0 }}
                >
                    {userName}
                </Typography>
            </CardContent>
            <Divider light />
            <Box display={'flex'}>
                <Box p={2} flex={'auto'}>
                    <Typography
                        component='p'
                        sx={{
                            fontSize: 12,
                            color: 'grey.500',
                            fontWeight: 500,
                            fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            m: 0,
                        }}
                    >
                        Solved problems
                    </Typography>
                    <Typography
                        component='p'
                        sx={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            mb: 4,
                            letterSpacing: '1px',
                        }}
                    >
                        {props.element.userStats?.solvedProblems}
                    </Typography>
                </Box>
                <Box p={2} flex={'auto'}>
                    <Typography
                        component='p'
                        sx={{
                            fontSize: 12,
                            color: 'grey.500',
                            fontWeight: 500,
                            fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            m: 0,
                        }}
                    >
                        Created problems
                    </Typography>
                    <Typography
                        component='p'
                        sx={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            mb: 4,
                            letterSpacing: '1px',
                        }}
                    >
                        {props.element.userStats?.createdProblems}
                    </Typography>
                </Box>
                <Box p={2} flex={'auto'}>
                    <Typography
                        component='p'
                        sx={{
                            fontSize: 12,
                            color: 'grey.500',
                            fontWeight: 500,
                            fontFamily:
                                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            m: 0,
                        }}
                    >
                        Created lessons
                    </Typography>
                    <Typography
                        component='p'
                        sx={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            mb: 4,
                            letterSpacing: '1px',
                        }}
                    >
                        {props.element.userStats?.createdLessons}
                    </Typography>
                </Box>
            </Box>
        </Card>
    );
};

export default UserCard;
