import RemoveIcon from '@mui/icons-material/DeleteOutline';
import MoveDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoveUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
    Alert,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Divider,
    IconButton,
    Stack,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material';
import React from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ContentCreateElement, ContentElement, ContentType, TestViewModel } from '../../api/api';
import { storeClient } from '../../api/clients';
import { useAddProblemMutation } from '../../api/slices/problemApi';
import ContentCodeEditor from '../../components/ContentCodeEditor/ContentCodeEditor';
import StyledDropzone from '../../components/Dropzone/Dropzone';
import useAuthorization from '../../hooks/useAuthorization';

export interface ProblemCreate {
    problemName: string | null | undefined;
    problemContent: ContentCreateElement[] | null | undefined;
    image: File | null | undefined;
    timeLimitMs: number | undefined;
    memoryLimitBytes: number | undefined;
    tests: TestViewModel[] | undefined;
}

const ProblemAddPage = () => {
    useAuthorization('User');

    const { control, handleSubmit } = useForm<ProblemCreate>({
        defaultValues: {
            timeLimitMs: 2000,
            memoryLimitBytes: 4096,
            problemContent: [{ contentType: ContentType.Paragraph }],
            tests: [{}],
        },
    });
    const contentFieldMethods = useFieldArray({
        control,
        name: 'problemContent',
        rules: {
            required: {
                value: true,
                message: 'The content is required',
            },
            maxLength: {
                value: 20,
                message: 'Max number of content elements exceeded',
            },
        },
    });
    const testFieldMethods = useFieldArray({
        control,
        name: 'tests',
        rules: {
            required: {
                value: true,
                message: 'Tests are required',
            },
            maxLength: {
                value: 40,
                message: 'Max number of tests exceeded',
            },
        },
    });

    const navigate = useNavigate();

    const [addProblem] = useAddProblemMutation();

    const onSubmit = async (problem: ProblemCreate) => {
        console.log(problem);
        const newContent: ContentElement[] = [];
        for (let i = 0; i < (problem.problemContent?.length ?? 0); i++) {
            const imageName =
                problem.problemContent![i].contentType === ContentType.Image
                    ? await storeClient.uploadImage(problem.problemContent![i].image)
                    : undefined;
            newContent.push({
                ...problem.problemContent![i],
                imageName: imageName,
            });
        }

        const result = await addProblem({
            ...problem,
            problemContent: JSON.stringify(newContent),
            testsString: JSON.stringify(problem.tests),
        });

        if ('data' in result) {
            navigate('/Problems/' + result.data);
        }
    };

    return (
        <Container maxWidth='lg' sx={{ pt: 2 }}>
            <Typography gutterBottom variant='h4' ml={1} component='h4'>
                Create new problem
            </Typography>
            <Stack gap={2} component='form' onSubmit={handleSubmit(onSubmit, (err) => console.log(err))}>
                <Stack direction={'row'} width={'100%'} gap={'2em'}>
                    <Stack>
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
                        <Stack direction={'row'} width={'100%'}>
                            <Controller
                                control={control}
                                name='timeLimitMs'
                                render={({ field, fieldState }) => (
                                    <TextField
                                        fullWidth
                                        margin='dense'
                                        sx={{ marginRight: '1em' }}
                                        label='Time limit (milliseconds)'
                                        type='number'
                                        variant='outlined'
                                        size='small'
                                        {...field}
                                        error={fieldState.invalid}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                                rules={{
                                    required: { value: true, message: 'Time limit is required' },
                                    min: { value: 1, message: 'Time limit must be at least 1 millisecond' },
                                    max: {
                                        value: 10240,
                                        message: 'Time limit cannot exceed 60000 millisecond (1 minute)',
                                    },
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
                                        fullWidth
                                        margin='dense'
                                        label='Memory limit (bytes)'
                                        type='number'
                                        variant='outlined'
                                        size='small'
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
                        </Stack>
                    </Stack>
                    <Controller
                        control={control}
                        name='image'
                        render={({ field, fieldState }) => (
                            <StyledDropzone
                                onChange={(files, e) => {
                                    field.onChange(e);
                                }}
                                error={fieldState.invalid}
                                fullHeight
                            />
                        )}
                    />
                </Stack>
                <Card elevation={1}>
                    <CardContent>
                        <Typography variant='h5'>Content</Typography>
                    </CardContent>
                    <CardContent>
                        {contentFieldMethods.fields.map((field, index) => (
                            <div key={field.id}>
                                <Typography variant='h6'>
                                    <Toolbar disableGutters>
                                        {ContentType[field.contentType]}
                                        <IconButton
                                            onClick={() => {
                                                contentFieldMethods.swap(index, index - 1);
                                            }}
                                            size='small'
                                            disabled={index === 0}
                                        >
                                            <MoveUpIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => {
                                                contentFieldMethods.swap(index, index + 1);
                                            }}
                                            size='small'
                                            disabled={index === contentFieldMethods.fields.length - 1}
                                        >
                                            <MoveDownIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => {
                                                contentFieldMethods.remove(index);
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
                                {field.contentType === ContentType.Code && (
                                    <Controller
                                        control={control}
                                        name={`problemContent.${index}`}
                                        render={(fldProps) => <ContentCodeEditor {...fldProps.field} />}
                                        rules={{
                                            required: { value: true, message: 'This field is required' },
                                        }}
                                    />
                                )}
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
                                onClick={() =>
                                    contentFieldMethods.append({
                                        contentType: ContentType[key],
                                        value: ContentType[key] === ContentType.Code ? 'python' : undefined,
                                    })
                                }
                                sx={{ my: 1, display: 'block' }}
                            >
                                New {key}
                            </Button>
                        ))}
                    </CardActions>
                </Card>
                <Card elevation={1}>
                    <CardContent>
                        <Typography variant='h5'>Tests</Typography>
                    </CardContent>
                    <CardContent>
                        {testFieldMethods.fields.map((field, index) => (
                            <Stack key={field.id} direction={'row'} width={'100%'} gap={'1em'}>
                                <Typography variant='h6'>
                                    <Toolbar disableGutters>
                                        {index + 1}.
                                        <IconButton
                                            onClick={() => {
                                                testFieldMethods.remove(index);
                                            }}
                                            size='small'
                                        >
                                            <RemoveIcon />
                                        </IconButton>
                                    </Toolbar>
                                </Typography>
                                <Controller
                                    control={control}
                                    name={`tests.${index}.input`}
                                    render={(fldProps) => (
                                        <TextField
                                            fullWidth
                                            margin='dense'
                                            label='Enter input'
                                            type='text'
                                            multiline
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
                                <Controller
                                    control={control}
                                    name={`tests.${index}.output`}
                                    render={(fldProps) => (
                                        <TextField
                                            fullWidth
                                            margin='dense'
                                            label='Enter output'
                                            type='text'
                                            multiline
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
                            </Stack>
                        ))}
                        <Controller
                            control={control}
                            name='tests'
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
                        <Button
                            onClick={() => testFieldMethods.append({ input: '', output: '' })}
                            sx={{ my: 1, display: 'block' }}
                        >
                            New test
                        </Button>
                    </CardActions>
                </Card>
                <Button fullWidth variant='contained' type='submit'>
                    Add problem
                </Button>
            </Stack>
        </Container>
    );
};

export default ProblemAddPage;
