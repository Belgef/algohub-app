import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { UserLoginViewModel } from '../../api/api';
import { useSearchParams } from 'react-router-dom';

export type LoginDialogProps = {
    enabled: boolean;
    onSubmit: (user: UserLoginViewModel) => boolean | Promise<boolean>;
    onClose?: () => void;
};

const LoginDialog = (props: LoginDialogProps) => {
    const [params, setParams] = useSearchParams();

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
            handleClose();
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

export default LoginDialog;
