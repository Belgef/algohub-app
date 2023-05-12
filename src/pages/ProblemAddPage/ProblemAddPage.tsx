import {
    Alert,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Divider,
    IconButton,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material';
import React from 'react';
import useAuthorization from '../../hooks/useAuthorization';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import StyledDropzone from '../../components/Dropzone/Dropzone';
import RemoveIcon from '@mui/icons-material/DeleteOutline';
import MoveUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MoveDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ContentType, ProblemCreateViewModel } from '../../api/api';
import { useAddProblemMutation } from '../../api/slices/problemApi';
import { useNavigate } from 'react-router-dom';

const ProblemAddPage = () => {
    useAuthorization('User');

    const { control, handleSubmit } = useForm<ProblemCreateViewModel>();
    const { fields, append, remove, swap } = useFieldArray({
        control,
        name: 'problemContent',
        rules: {
            required: {
                value: true,
                message: 'The content is required',
            },
            maxLength: {
                value: 30,
                message: 'Max number of content elements exceeded',
            },
        },
    });

    const navigate = useNavigate();

    const [addProblem] = useAddProblemMutation();

    const onSubmit = async (problem: ProblemCreateViewModel) => {
        console.log(problem);
        const result = await addProblem(problem);

        if ('data' in result) {
            navigate('/Problems/' + result.data);
        }
    };

    return (
        <Container maxWidth='lg'>
            <form onSubmit={handleSubmit(onSubmit, (err) => console.log(err))}>
                <Typography gutterBottom mt='1em' variant='h4' component='h4'>
                    Create new problem
                </Typography>
                <Controller
                    control={control}
                    name='problemName'
                    render={({ field, fieldState }) => (
                        <TextField
                            autoFocus
                            margin='dense'
                            label='Title'
                            type='text'
                            fullWidth
                            variant='outlined'
                            {...field}
                            error={fieldState.invalid}
                            helperText={fieldState.error?.message}
                        />
                    )}
                    rules={{
                        required: { value: true, message: 'Problem title is required' },
                        minLength: { value: 5, message: 'Problem title must be at least 5 symbols long' },
                        maxLength: { value: 100, message: 'Problem title cannot exceed 100 symbols' },
                        pattern: {
                            value: /^[\S ]+$/,
                            message: 'Problem title must not contain tabs or enters',
                        },
                    }}
                />
                <Controller
                    control={control}
                    name='image'
                    render={({ field, fieldState }) => (
                        <StyledDropzone
                            onChange={(files, e) => {
                                field.onChange(e);
                            }}
                            error={fieldState.invalid}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name='timeLimitMs'
                    render={({ field, fieldState }) => (
                        <TextField
                            margin='dense'
                            sx={{ marginRight: '1em' }}
                            label='Time limit (milliseconds)'
                            type='number'
                            variant='outlined'
                            {...field}
                            error={fieldState.invalid}
                            helperText={fieldState.error?.message}
                        />
                    )}
                    rules={{
                        required: { value: true, message: 'Time limit is required' },
                        min: { value: 1, message: 'Time limit must be at least 1 millisecond' },
                        max: { value: 10240, message: 'Time limit cannot exceed 60000 millisecond (1 minute)' },
                        pattern: {
                            value: /^[^.,]+$/,
                            message: 'Time limit must be a whole number',
                        },
                    }}
                />
                <Controller
                    control={control}
                    name='memoryLimitBytes'
                    render={({ field, fieldState }) => (
                        <TextField
                            margin='dense'
                            label='Memory limit (bytes)'
                            type='number'
                            variant='outlined'
                            {...field}
                            error={fieldState.invalid}
                            helperText={fieldState.error?.message}
                        />
                    )}
                    rules={{
                        required: { value: true, message: 'Memory limit is required' },
                        min: { value: 1, message: 'Memory limit must be at least 1 byte' },
                        max: { value: 10240, message: 'Memory limit cannot exceed 10240 bytes (10 Mb)' },
                        pattern: {
                            value: /^[^.,]+$/,
                            message: 'Memory limit must be a whole number',
                        },
                    }}
                />
                <Card elevation={8}>
                    <CardContent>
                        <Typography variant='h5'>Content</Typography>
                    </CardContent>
                    <CardContent>
                        {fields.map((field, index) => (
                            <div key={field.id}>
                                <Typography variant='h6'>
                                    <Toolbar disableGutters>
                                        {ContentType[field.contentType]}
                                        <IconButton
                                            onClick={() => {
                                                swap(index, index - 1);
                                            }}
                                            size='small'
                                            disabled={index === 0}
                                        >
                                            <MoveUpIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => {
                                                swap(index, index + 1);
                                            }}
                                            size='small'
                                            disabled={index === fields.length - 1}
                                        >
                                            <MoveDownIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => {
                                                remove(index);
                                            }}
                                            size='small'
                                        >
                                            <RemoveIcon />
                                        </IconButton>
                                    </Toolbar>
                                </Typography>
                                {field.contentType === ContentType.Image && (
                                    <Controller
                                        control={control}
                                        name={`problemContent.${index}.image`}
                                        render={(fldProps) => (
                                            <StyledDropzone
                                                onChange={(files, e) => {
                                                    fldProps.field.onChange(e);
                                                }}
                                                error={fldProps.fieldState.invalid}
                                            />
                                        )}
                                        rules={{
                                            required: { value: true, message: 'Image is required here' },
                                        }}
                                    />
                                )}
                                {field.contentType !== ContentType.Bar && field.contentType !== ContentType.Code && (
                                    <Controller
                                        control={control}
                                        name={`problemContent.${index}.value`}
                                        render={(fldProps) => (
                                            <TextField
                                                margin='dense'
                                                label={`Enter ${ContentType[field.contentType]}`}
                                                type='text'
                                                multiline
                                                fullWidth
                                                variant='outlined'
                                                {...fldProps.field}
                                                error={fldProps.fieldState.invalid}
                                                helperText={fldProps.fieldState.error?.message}
                                            />
                                        )}
                                        rules={{
                                            required: { value: true, message: 'This field is required' },
                                        }}
                                    />
                                )}
                                {field.contentType === ContentType.Bar && <Divider />}
                            </div>
                        ))}
                        <Controller
                            control={control}
                            name='problemContent'
                            render={({ field, fieldState }) => (
                                <>
                                    {fieldState.error?.root?.message && (
                                        <Alert severity='error'>{fieldState.error?.root?.message}</Alert>
                                    )}
                                </>
                            )}
                        />
                    </CardContent>
                    <CardActions>
                        {(
                            Object.keys(ContentType).filter((key) => key.length > 2) as Array<keyof typeof ContentType>
                        ).map((key) => (
                            <Button
                                key={key}
                                onClick={() => append({ contentType: ContentType[key] })}
                                sx={{ my: 1, display: 'block' }}
                            >
                                New {key}
                            </Button>
                        ))}
                    </CardActions>
                </Card>
                <Button fullWidth variant='contained' type='submit'>
                    Add problem
                </Button>
            </form>
        </Container>
    );
};

export default ProblemAddPage;
