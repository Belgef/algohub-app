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

import { ContentCreateElement, ContentElement, ContentType } from '../../api/api';
import { storeClient } from '../../api/clients';
import { useAddLessonMutation } from '../../api/slices/lessonApi';
import ContentCodeEditor from '../../components/ContentCodeEditor/ContentCodeEditor';
import StyledDropzone from '../../components/Dropzone/Dropzone';
import useAuthorization from '../../hooks/useAuthorization';

export interface LessonCreate {
    title: string | null | undefined;
    lessonContent: ContentCreateElement[];
    image: File | null | undefined;
}

const LessonAddPage = () => {
    useAuthorization('User');

    const { control, handleSubmit } = useForm<LessonCreate>({
        defaultValues: {
            lessonContent: [{ contentType: ContentType.Paragraph }],
        },
    });

    const contentFieldMethods = useFieldArray({
        control,
        name: 'lessonContent',
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

    const navigate = useNavigate();

    const [addLesson] = useAddLessonMutation();

    const onSubmit = async (lesson: LessonCreate) => {
        console.log(lesson);
        const newContent: ContentElement[] = [];
        for (let i = 0; i < (lesson.lessonContent?.length ?? 0); i++) {
            const imageName =
                lesson.lessonContent![i].contentType === ContentType.Image
                    ? await storeClient.uploadImage(lesson.lessonContent![i].image)
                    : undefined;
            newContent.push({
                ...lesson.lessonContent![i],
                imageName: imageName,
            });
        }

        const result = await addLesson({
            ...lesson,
            lessonContent: JSON.stringify(newContent),
        });

        if ('data' in result) {
            navigate('/Lessons/' + result.data);
        }
    };

    return (
        <Container maxWidth='lg' sx={{ pt: 2 }}>
            <Typography gutterBottom ml={1} variant='h4' component='h4'>
                Create new lesson
            </Typography>
            <Stack gap={2} component='form' onSubmit={handleSubmit(onSubmit, (err) => console.log(err))}>
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
                    name='title'
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
                        required: { value: true, message: 'Lesson title is required' },
                        minLength: { value: 5, message: 'Lesson title must be at least 5 symbols long' },
                        maxLength: { value: 100, message: 'Lesson title cannot exceed 100 symbols' },
                        pattern: {
                            value: /^[\S ]+$/,
                            message: 'Lesson title must not contain tabs or enters',
                        },
                    }}
                />
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
                                        name={`lessonContent.${index}.image`}
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
                                        name={`lessonContent.${index}.value`}
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
                                        name={`lessonContent.${index}`}
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
                            name='lessonContent'
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
                <Button fullWidth variant='contained' type='submit'>
                    Add lesson
                </Button>
            </Stack>
        </Container>
    );
};

export default LessonAddPage;
