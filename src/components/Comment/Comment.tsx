import { FormHelperText } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Comment as CommentElement, Form } from 'semantic-ui-react';

import { CommentViewModel } from '../../api/api';
import { STORAGE_BASE_URL } from '../../api/constants';
import useAuthorization from '../../hooks/useAuthorization';

type CommentsProps = {
    comment?: CommentViewModel;
    onReply?: (message: string, parentComment: number | undefined) => void;
};

const Comment = (props: CommentsProps) => {
    const user = useAuthorization();
    const [reply, setReply] = useState(false);
    const { control, handleSubmit, reset } = useForm<{ reply: string }>({ defaultValues: { reply: '' } });
    return (
        <CommentElement>
            <CommentElement.Avatar
                src={
                    props.comment?.author?.iconName
                        ? STORAGE_BASE_URL + props.comment?.author.iconName
                        : 'https://ui-avatars.com/api/?rounded=true&name=' + props.comment?.author?.fullName ??
                          props.comment?.author?.userName
                }
                className='roundedIcon'
            />
            <CommentElement.Content>
                <CommentElement.Author as='a'>
                    {props.comment?.author?.fullName ?? '@' + props.comment?.author?.userName ?? 'deleted'}
                </CommentElement.Author>
                <CommentElement.Metadata>
                    <div>{moment.utc(props.comment?.createDate).local().calendar().toLocaleString()}</div>
                </CommentElement.Metadata>
                <CommentElement.Text className='prelined'>{props.comment?.content}</CommentElement.Text>
                {user && (
                    <CommentElement.Actions>
                        <CommentElement.Action onClick={() => setReply(!reply)}>
                            {reply ? 'Cancel reply' : 'Reply'}
                        </CommentElement.Action>
                    </CommentElement.Actions>
                )}
                {reply && (
                    <Form reply>
                        <Controller
                            control={control}
                            name={'reply'}
                            render={({ field, fieldState }) => (
                                <>
                                    <Form.TextArea {...field} />
                                    <FormHelperText error={fieldState.invalid}>
                                        {fieldState.error?.message}
                                    </FormHelperText>
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
                                props.onReply?.(reply, props.comment?.id);
                                reset();
                                setReply(false);
                            })}
                        />
                    </Form>
                )}
            </CommentElement.Content>
            {props.comment?.replies && props.comment?.replies.length !== 0 && (
                <CommentElement.Group>
                    {props.comment?.replies?.map((r) => (
                        <Comment key={r.id} comment={r} onReply={props.onReply} />
                    ))}
                </CommentElement.Group>
            )}
        </CommentElement>
    );
};

export default Comment;
