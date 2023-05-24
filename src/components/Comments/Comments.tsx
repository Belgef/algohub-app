import React from 'react';
import { Header, Comment as CommentElement, Form, Button as SButton } from 'semantic-ui-react';

type Props = {};

const Comments = (props: Props) => {
    return (
        <CommentElement.Group>
            <CommentElement>
                <CommentElement.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                <CommentElement.Content>
                    <CommentElement.Author as='a'>Matt</CommentElement.Author>
                    <CommentElement.Metadata>
                        <div>Today at 5:42PM</div>
                    </CommentElement.Metadata>
                    <CommentElement.Text>How artistic!</CommentElement.Text>
                    <CommentElement.Actions>
                        <CommentElement.Action>Reply</CommentElement.Action>
                    </CommentElement.Actions>
                </CommentElement.Content>
            </CommentElement>

            <CommentElement>
                <CommentElement.Avatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
                <CommentElement.Content>
                    <CommentElement.Author as='a'>Elliot Fu</CommentElement.Author>
                    <CommentElement.Metadata>
                        <div>Yesterday at 12:30AM</div>
                    </CommentElement.Metadata>
                    <CommentElement.Text>
                        <p>This has been very useful for my research. Thanks as well!</p>
                    </CommentElement.Text>
                    <CommentElement.Actions>
                        <CommentElement.Action>Reply</CommentElement.Action>
                    </CommentElement.Actions>
                </CommentElement.Content>
                <CommentElement.Group>
                    <CommentElement>
                        <CommentElement.Avatar src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
                        <CommentElement.Content>
                            <CommentElement.Author as='a'>Jenny Hess</CommentElement.Author>
                            <CommentElement.Metadata>
                                <div>Just now</div>
                            </CommentElement.Metadata>
                            <CommentElement.Text>Elliot you are always so right :)</CommentElement.Text>
                            <CommentElement.Actions>
                                <CommentElement.Action>Reply</CommentElement.Action>
                            </CommentElement.Actions>
                        </CommentElement.Content>
                    </CommentElement>
                </CommentElement.Group>
            </CommentElement>

            <CommentElement>
                <CommentElement.Avatar src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                <CommentElement.Content>
                    <CommentElement.Author as='a'>Joe Henderson</CommentElement.Author>
                    <CommentElement.Metadata>
                        <div>5 days ago</div>
                    </CommentElement.Metadata>
                    <CommentElement.Text>Dude, this is awesome. Thanks so much</CommentElement.Text>
                    <CommentElement.Actions>
                        <CommentElement.Action>Reply</CommentElement.Action>
                    </CommentElement.Actions>
                </CommentElement.Content>
            </CommentElement>
        </CommentElement.Group>
    );
};

export default Comments;
