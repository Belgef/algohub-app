import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { UserLoginViewModel } from '../../api/api';

export type LoginDialogProps = {
    enabled: boolean;
    onSubmit: (user: UserLoginViewModel) => boolean | Promise<boolean>;
    onClose?: () => void;
};

const LoginDialog = (props: LoginDialogProps) => {
    const [params, setParams] = useSearchParams();
    const navigate = useNavigate();

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
        props.onClose?.();
    };

    const onSubmit = async (user: UserLoginViewModel) => {
        if (await props.onSubmit(user)) {
            if (params.has('return')) {
                navigate(params.get('return')!);
            } else {
                handleClose();
            }
        }
    };

    return (
        <>
            <Button onClick={handleOpen} sx={{ my: 1, color: 'white', display: 'block' }}>
                Login
            </Button>
            <Dialog open={params.has('login') && props.enabled} onClose={handleClose}>
                <form onSubmit={handleSubmit(onSubmit, (err) => console.log(err))}>
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
