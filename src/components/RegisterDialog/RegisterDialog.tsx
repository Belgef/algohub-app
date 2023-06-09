import {
    Avatar,
    Button,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { NavLink, useSearchParams } from 'react-router-dom';

import { UserCreateViewModel } from '../../api/api';
import { userClient } from '../../api/clients';
import { useGetUserQuery, useRegisterMutation } from '../../api/slices/userApi';
import StyledDropzone from '../Dropzone/Dropzone';

export type RegisterDialogProps = {
    mode: 'xs' | 'md';
    onClick?: () => void;
};

const RegisterDialog = (props: RegisterDialogProps) => {
    const [params, setParams] = useSearchParams();
    const [iconUrl, setIconUrl] = useState('');
    const [register] = useRegisterMutation();
    const { data: user } = useGetUserQuery();

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
    };

    const onSubmit = async (user: UserCreateViewModel) => {
        if (await register(user)) {
            handleClose();
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
                    Register
                </Button>
            ) : (
                <MenuItem onClick={props.onClick} component={NavLink} to={'?register'}>
                    <Typography textAlign='center' color='white'>
                        Register
                    </Typography>
                </MenuItem>
            )}
            <Dialog open={params.has('register')} onClose={handleClose}>
                <form onSubmit={handleSubmit(onSubmit)}>
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
