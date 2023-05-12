import {
    Alert,
    Box,
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
import React, { useState } from 'react';
import useAuthorization from '../../hooks/useAuthorization';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import StyledDropzone from '../../components/Dropzone/Dropzone';
import RemoveIcon from '@mui/icons-material/DeleteOutline';
import MoveUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MoveDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface ProblemCreateRaw {
    problemName: string | null | undefined;
    problemContent: ContentElement[] | null | undefined;
    authorId: string | undefined;
    image: File | null | undefined;
    timeLimitMs: number | undefined;
    memoryLimitBytes: number | undefined;
}

type ContentType = 'subtitle' | 'emphasis' | 'paragraph' | 'image' | 'bar' | 'code';
const contentTypes: ContentType[] = ['subtitle', 'emphasis', 'paragraph', 'image', 'bar', 'code'];

interface ContentElement {
    type: ContentType;
    value?: string;
    image?: File;
    code?: string;
}

const ProblemAddPage = () => {
    const { control, handleSubmit } = useForm<ProblemCreateRaw>();
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

    const user = useAuthorization('User');
    const [imageUrl, setImageUrl] = useState('');
    const [imageUrls, setImageUrls] = useState<{ [index: number]: string | undefined }>({});

    const onSubmit = async (problem: ProblemCreateRaw) => {
        console.log(problem);
    };

    return (
        <Container maxWidth='lg'>
            <form onSubmit={handleSubmit(onSubmit, (err) => console.log(err))}>
                <Typography gutterBottom mt='1em' variant='h4' component='h4'>
                    Create new problem
                </Typography>
                {imageUrl && <Box component='img' alt='Title image' maxHeight='10em' src={imageUrl} />}
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
                                URL.revokeObjectURL(imageUrl);
                                if (files[0]) {
                                    setImageUrl(URL.createObjectURL(files[0]));
                                } else {
                                    setImageUrl('');
                                }
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
                            <>
                                <Typography variant='h6'>
                                    <Toolbar disableGutters>
                                        {field.type[0].toUpperCase() + field.type.slice(1)}
                                        <IconButton
                                            onClick={() => {
                                                swap(index, index - 1);
                                                setImageUrls({
                                                    ...imageUrls,
                                                    [index - 1]: imageUrls[index],
                                                    [index]: imageUrls[index - 1],
                                                });
                                            }}
                                            size='small'
                                            disabled={index === 0}
                                        >
                                            <MoveUpIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => {
                                                swap(index, index + 1);
                                                setImageUrls({
                                                    ...imageUrls,
                                                    [index]: imageUrls[index + 1],
                                                    [index + 1]: imageUrls[index],
                                                });
                                            }}
                                            size='small'
                                            disabled={index === fields.length - 1}
                                        >
                                            <MoveDownIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => {
                                                remove(index);
                                                URL.revokeObjectURL(imageUrls[index] ?? '');
                                                setImageUrls({
                                                    ...imageUrls,
                                                    [index]: undefined,
                                                });
                                            }}
                                            size='small'
                                        >
                                            <RemoveIcon />
                                        </IconButton>
                                    </Toolbar>
                                </Typography>
                                {field.type === 'image' && (
                                    <>
                                        {imageUrls[index] && (
                                            <Box
                                                component='img'
                                                alt='Title image'
                                                maxHeight='10em'
                                                src={imageUrls[index]}
                                            />
                                        )}
                                        <Controller
                                            control={control}
                                            name={`problemContent.${index}.image`}
                                            render={(fldProps) => (
                                                <StyledDropzone
                                                    onChange={(files, e) => {
                                                        fldProps.field.onChange(e);
                                                        URL.revokeObjectURL(imageUrls[index] ?? '');
                                                        if (files[0]) {
                                                            setImageUrls({
                                                                ...imageUrls,
                                                                [index]: URL.createObjectURL(files[0]),
                                                            });
                                                        } else {
                                                            setImageUrls({
                                                                ...imageUrls,
                                                                [index]: undefined,
                                                            });
                                                        }
                                                    }}
                                                    error={fldProps.fieldState.invalid}
                                                />
                                            )}
                                            rules={{
                                                required: { value: true, message: 'Image is required here' },
                                            }}
                                        />
                                    </>
                                )}
                                {field.type !== 'bar' && field.type !== 'code' && (
                                    <Controller
                                        key={field.id}
                                        control={control}
                                        name={`problemContent.${index}.value`}
                                        render={(fldProps) => (
                                            <TextField
                                                margin='dense'
                                                label={`Enter ${field.type}`}
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
                                {field.type === 'bar' && <Divider />}
                            </>
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
                        {contentTypes.map((c, i) => (
                            <Button key={i} onClick={() => append({ type: c })} sx={{ my: 1, display: 'block' }}>
                                New {c}
                            </Button>
                        ))}
                    </CardActions>
                </Card>
                <Button fullWidth variant='contained' type='submit'>
                    Add lesson
                </Button>
            </form>
        </Container>
    );
};

export default ProblemAddPage;
