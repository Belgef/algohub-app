import { FormHelperText, Typography } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Form } from 'semantic-ui-react';
import { Comment as CommentElement } from 'semantic-ui-react';

import { CommentViewModel } from '../../api/api';
import useAuthorization from '../../hooks/useAuthorization';
import Comment from '../Comment/Comment';

type CommentsSectionProps = {
    comments?: CommentViewModel[];
    noTitle?: boolean;
    onReply?: (message: string, parentComment?: number | undefined) => void;
};

const CommentsSection = (props: CommentsSectionProps) => {
    const user = useAuthorization();
    const { control, handleSubmit, reset } = useForm<{ reply: string }>({ defaultValues: { reply: '' } });

    return (
        <>
            {!props.noTitle && (
                <Typography gutterBottom variant='h5' component='div' mt={'1em'}>
                    Comments
                </Typography>
            )}
            {user && (
                <Form reply>
                    <Controller
                        control={control}
                        name={'reply'}
                        render={({ field, fieldState }) => (
                            <>
                                <Form.TextArea {...field} />
                                <FormHelperText error={fieldState.invalid}>{fieldState.error?.message}</FormHelperText>
                            </>
                        )}
                        rules={{ required: { value: true, message: 'Comment cannot be empty' } }}
                    />

                    <Button
                        content='Add Reply'
                        labelPosition='left'
                        icon='edit'
                        primary
                        onClick={handleSubmit(({ reply }) => {
                            props.onReply?.(reply);
                            reset();
                        })}
                    />
                </Form>
            )}
            <CommentElement.Group>
                {props.comments?.map((c) => (
                    <Comment key={c.id} comment={c} onReply={props.onReply} />
                ))}
            </CommentElement.Group>
        </>
    );
};

export default CommentsSection;
