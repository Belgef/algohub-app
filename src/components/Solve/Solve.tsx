import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Chip, FormHelperText, IconButton } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Comment as CommentElement, Form } from 'semantic-ui-react';

import { CommentViewModel, SolveCommentViewModel, SolveViewModel } from '../../api/api';
import { STORAGE_BASE_URL } from '../../api/constants';
import { useAddSolveCommentMutation, useGetSolveCommentsQuery } from '../../api/slices/commentApi';
import { useGetVoteForSolveQuery, useVoteForSolveMutation } from '../../api/slices/solveApi';
import useAuthorization from '../../hooks/useAuthorization';
import CodeBlock from '../CodeBlock/CodeBlock';
import Comment from '../Comment/Comment';

const normalizeComments = (comments: SolveCommentViewModel[]): CommentViewModel[] =>
    comments?.map((c) => ({
        ...c,
        id: c.solveCommentId,
        rootId: c.solveId,
        replies: c.replies ? normalizeComments(c.replies) : undefined,
    }));

    const getMemoryString = (bytes:number)=>{
        if(bytes < 512){
            return `${bytes} bytes`
        }else if(bytes/1024 < 512){
            return `${Math.trunc(bytes/1024*10)/10} Kb`
        }else if(bytes/1024/1024 < 512){
            return `${Math.trunc(bytes/1024/1024*10)/10} Mb`
        }
    }

type SolveProps = {
    solve: SolveViewModel;
};

const Solve = (props: SolveProps) => {
    const user = useAuthorization();
    const { data: comments } = useGetSolveCommentsQuery(props.solve.solveId ?? -1);
    const [addSolveComment] = useAddSolveCommentMutation();
    const { data: vote } = useGetVoteForSolveQuery(props.solve.solveId ?? -1);
    const [voteForSolve] = useVoteForSolveMutation();
    const [reply, setReply] = useState(false);
    const { control, handleSubmit, reset } = useForm<{ reply: string }>({ defaultValues: { reply: '' } });

    const onReply = (message: string, parentCommentId?: number | undefined) => {
        addSolveComment({
            content: message,
            parentCommentId: parentCommentId,
            rootId: props.solve.solveId,
        });
    };

    return (
        <CommentElement>
            <CommentElement.Avatar
                src={
                    props.solve?.author?.iconName
                        ? STORAGE_BASE_URL + props.solve?.author.iconName
                        : 'https://ui-avatars.com/api/?rounded=true&name=' + props.solve?.author?.fullName ??
                          props.solve?.author?.userName
                }
                className='roundedIcon'
            />
            <CommentElement.Content>
                <CommentElement.Author as='a'>
                    {props.solve?.author?.fullName ?? '@' + props.solve?.author?.userName ?? 'deleted'}
                </CommentElement.Author>
                <CommentElement.Metadata>
                    <div>{moment.utc(props.solve?.createDate).local().calendar().toLocaleString()}</div>
                </CommentElement.Metadata>
                <CommentElement.Text>
                    <Chip size='small' label={`Time: ${props.solve.timeMs} ms`} color='primary' sx={{mr:1}} />
                    <Chip size='small' label={`Memory: ${getMemoryString(props.solve.memoryBytes??0)}`} color='primary' />
                </CommentElement.Text>
                <CommentElement.Text>
                    <CodeBlock code={props.solve?.code} language={props.solve?.language?.languageInternalName} />
                </CommentElement.Text>
                {user && (
                    <CommentElement.Actions>
                        <CommentElement.Action onClick={() => setReply(!reply)}>
                            {reply ? 'Cancel reply' : 'Reply'}
                        </CommentElement.Action>
                        <CommentElement.Action active>
                            <IconButton
                                onClick={() => voteForSolve({ solveId: props.solve.solveId ?? -1, isUpvote: true })}
                                disabled={!user || vote === true}
                            >
                                <ThumbUpIcon fontSize='small' color={vote === true ? 'primary' : undefined} />
                            </IconButton>
                            {props.solve?.upvotes ?? 0}
                        </CommentElement.Action>
                        <CommentElement.Action active>
                            <IconButton
                                onClick={() => voteForSolve({ solveId: props.solve.solveId ?? -1, isUpvote: false })}
                                disabled={!user || vote === false}
                            >
                                <ThumbDownIcon fontSize='small' color={vote === false ? 'primary' : undefined} />
                            </IconButton>
                            {props.solve?.downvotes ?? 0}
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
                                onReply(reply);
                                reset();
                                setReply(false);
                            })}
                        />
                    </Form>
                )}
            </CommentElement.Content>
            <CommentElement.Group>
                {comments &&
                    normalizeComments(comments)?.map((c) => <Comment key={c.id} comment={c} onReply={onReply} />)}
            </CommentElement.Group>
        </CommentElement>
    );
};

export default Solve;
