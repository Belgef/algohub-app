import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { UserLoginViewModel } from '../../api/api';
import { login } from '../../api/login';

const LoginModalButton = () => {
    const [open, setOpen] = useState(false);
    const { handleSubmit, control } = useForm<UserLoginViewModel>({
        defaultValues: { userName: '', password: '' },
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleLogin = async (user: UserLoginViewModel) => {
        if (await login(user)) {
            handleClose();
            window.location.reload();
        }
    };

    return (
        <>
            <Button onClick={handleOpen}>Login</Button>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit(handleLogin, (err) => console.log(err))}>
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
                                    autoFocus
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

export default LoginModalButton;
