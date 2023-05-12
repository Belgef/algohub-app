import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Avatar,
    CardHeader,
    Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { UserCreateViewModel } from '../../api/api';
import { useSearchParams } from 'react-router-dom';
import StyledDropzone from '../Dropzone/Dropzone';
import { userClient } from '../../api/clients';

export type RegisterDialogProps = {
    enabled: boolean;
    onSubmit: (user: UserCreateViewModel) => string | Promise<string>;
    onClose?: () => void;
};

const RegisterDialog = (props: RegisterDialogProps) => {
    const [params, setParams] = useSearchParams();
    const [iconUrl, setIconUrl] = useState('');

    const { handleSubmit, control } = useForm<UserCreateViewModel>({
        defaultValues: { userName: '', fullName: '', email: '', password: '', confirmPassword: '' },
    });

    const handleOpen = () => {
        params.set('register', 'true');
        setParams(params);
    };

    const handleClose = () => {
        params.delete('register');
        setParams(params);
        props.onClose?.();
    };

    const onSubmit = async (user: UserCreateViewModel) => {
        if (await props.onSubmit(user)) {
            handleClose();
        }
    };

    return (
        <>
            <Button onClick={handleOpen} sx={{ my: 1, color: 'white', display: 'block' }}>
                Register
            </Button>
            <Dialog open={params.has('register') && props.enabled} onClose={handleClose}>
                <form onSubmit={handleSubmit(onSubmit, (err) => console.log(err))}>
                    <DialogTitle>
                        {' '}
                        <CardHeader
                            avatar={iconUrl && <Avatar alt='Avatar' src={iconUrl} />}
                            title={
                                <Typography variant='h5' component='div'>
                                    Register
                                </Typography>
                            }
                        />
                    </DialogTitle>
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
                            rules={{
                                required: { value: true, message: 'Username is required' },
                                minLength: { value: 5, message: 'Username must be at least 5 symbols long' },
                                maxLength: { value: 100, message: 'Username cannot exceed 100 symbols' },
                                pattern: {
                                    value: /^\w+$/,
                                    message: "Username must only contain letters, digits and symbol '_'",
                                },
                                validate: {
                                    unique: async (value) => {
                                        const result = await userClient.checkUserName(value);
                                        if (result) {
                                            return result;
                                        } else {
                                            return 'Username was already taken';
                                        }
                                    },
                                },
                            }}
                        />
                        <Controller
                            control={control}
                            name='fullName'
                            render={({ field, fieldState }) => (
                                <TextField
                                    margin='dense'
                                    label='Full Name'
                                    type='text'
                                    fullWidth
                                    variant='outlined'
                                    autoComplete='full-name'
                                    {...field}
                                    error={fieldState.invalid}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                            rules={{
                                minLength: { value: 5, message: 'Full name must be at least 5 symbols long' },
                                maxLength: { value: 200, message: 'Full name cannot exceed 200 symbols' },
                                pattern: {
                                    value: /^[.\S ]+$/,
                                    message: 'Full name must not contain enters or tabs',
                                },
                            }}
                        />
                        <Controller
                            control={control}
                            name='email'
                            render={({ field, fieldState }) => (
                                <TextField
                                    margin='dense'
                                    label='Email'
                                    type='email'
                                    fullWidth
                                    variant='outlined'
                                    autoComplete='email'
                                    {...field}
                                    error={fieldState.invalid}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                            rules={{
                                required: { value: true, message: 'Email is required' },
                                validate: {
                                    unique: async (value) => {
                                        const result = await userClient.checkEmail(value);
                                        if (result) {
                                            return result;
                                        } else {
                                            return 'Email was already taken';
                                        }
                                    },
                                },
                            }}
                        />
                        <Controller
                            control={control}
                            name='icon'
                            render={({ field, fieldState }) => (
                                <StyledDropzone
                                    onChange={(files, e) => {
                                        field.onChange(e);
                                        URL.revokeObjectURL(iconUrl);
                                        if (files[0]) {
                                            setIconUrl(URL.createObjectURL(files[0]));
                                        } else {
                                            setIconUrl('');
                                        }
                                    }}
                                    error={fieldState.invalid}
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
                                    autoComplete='new-password'
                                    {...field}
                                    error={fieldState.invalid}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                            rules={{
                                required: { value: true, message: 'Password is required' },
                                minLength: { value: 8, message: 'Password must be at least 5 symbols long' },
                                maxLength: { value: 32, message: 'Password cannot exceed 100 symbols' },
                                validate: {
                                    containsUppercase: (value) =>
                                        /(?=.*[A-Z])/.test(value)
                                            ? true
                                            : 'Password must contain at least one uppercase letter',
                                    containsLowercase: (value) =>
                                        /(?=.*[a-z])/.test(value)
                                            ? true
                                            : 'Password must contain at least one lowercase letter',
                                    containsDigits: (value) =>
                                        /(?=.*[0-9])/.test(value) ? true : 'Password must contain at least one digit',
                                },
                            }}
                        />
                        <Controller
                            control={control}
                            name='confirmPassword'
                            render={({ field, fieldState }) => (
                                <TextField
                                    margin='dense'
                                    label='Confirm password'
                                    type='password'
                                    fullWidth
                                    variant='outlined'
                                    autoComplete='new-password'
                                    {...field}
                                    error={fieldState.invalid}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                            rules={{
                                required: true,
                                validate: {
                                    matchesPassword: (value, form) =>
                                        value === form.password ? true : 'Passwords do not match',
                                },
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} fullWidth variant='outlined'>
                            Cancel
                        </Button>
                        <Button fullWidth variant='contained' type='submit'>
                            Register
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default RegisterDialog;
