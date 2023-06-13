import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';

import { UserLoginViewModel } from '../../api/api';
import { userClient } from '../../api/clients';
import { useGetUserQuery, useLoginMutation } from '../../api/slices/userApi';

export type LoginDialogProps = {
    mode: 'md' | 'xs';
    onClick?: () => void;
};

const LoginDialog = (props: LoginDialogProps) => {
    const [params, setParams] = useSearchParams();
    const navigate = useNavigate();
    const [login] = useLoginMutation();
    const { data: user } = useGetUserQuery();

    const { handleSubmit, control } = useForm<UserLoginViewModel>({
        defaultValues: { userName: '', password: '' },
    });

    const handleOpen = () => {
        params.set('login', 'true');
        setParams(params);
    };

    const handleClose = () => {
        params.delete('login');
        setParams(params);
    };

    const onSubmit = async (user: UserLoginViewModel) => {
        if (await login(user)) {
            if (params.has('return')) {
                navigate(params.get('return')!);
            } else {
                handleClose();
            }
        }
    };
    
    return user ? null : (
        <>
            {props.mode === 'md' ? (
                <Button
                    onClick={handleOpen}
                    sx={{
                        my: 1,
                        color: 'white',
                        display: {
                            md: props.mode === 'md' ? 'block' : 'none',
                            xs: 'none',
                        },
                    }}
                >
                    Login
                </Button>
            ) : (
                <MenuItem onClick={props.onClick} component={NavLink} to='?login'>
                    <Typography textAlign='center' color='white'>
                        Login
                    </Typography>
                </MenuItem>
            )}
            <Dialog open={params.has('login')} onClose={handleClose}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle>Login</DialogTitle>
                    <DialogContent>
                        <Controller
                            control={control}
                            name='userName'
                            render={({ field, fieldState }) => (
                                <TextField
                                    autoFocus
                                    margin='dense'
                                    label='Username'
                                    type='text'
                                    fullWidth
                                    variant='outlined'
                                    autoComplete='username'
                                    {...field}
                                    error={fieldState.invalid}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name='password'
                            render={({ field, fieldState }) => (
                                <TextField
                                    margin='dense'
                                    label='Password'
                                    type='password'
                                    fullWidth
                                    variant='outlined'
                                    autoComplete='password'
                                    {...field}
                                    error={fieldState.invalid}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                            rules={{
                                validate: {
                                    valid: async (_, formValues) => {
                                        const res = await userClient.login(formValues).catch((_) => null);
                                        return res ? true : 'Password is invalid';
                                    },
                                },
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} fullWidth variant='outlined'>
                            Cancel
                        </Button>
                        <Button fullWidth variant='contained' type='submit'>
                            Login
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default LoginDialog;
