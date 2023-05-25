import React from 'react';
import { Comment as CommentElement, Form, Header, Button as SButton } from 'semantic-ui-react';

import CodeBlock from '../CodeBlock/CodeBlock';
import Comments from '../Comment/Comment';

type Props = {};

const Solves = (props: Props) => {
    return (
        <CommentElement.Group>
            <CommentElement>
                <CommentElement.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                <CommentElement.Content>
                    <CommentElement.Author as='a'>Matt</CommentElement.Author>
                    <CommentElement.Metadata>
                        <div>Today at 5:42PM</div>
                    </CommentElement.Metadata>
                    <CommentElement.Text>
                        <CodeBlock
                            code={
                                'def count_substrings(s):\n    n = len(s)\n    count = 0\n    \n    for center in range(2 * n - 1):\n        left = center // 2\n        right = left + center % 2\n        \n        while left >= 0 and right < n and s[left] == s[right]:\n            count += 1\n            left -= 1\n            right += 1\n        \n    return count'
                            }
                            language='python'
                        />
                    </CommentElement.Text>
                    <CommentElement.Actions>
                        <CommentElement.Action>Reply</CommentElement.Action>
                    </CommentElement.Actions>
                </CommentElement.Content>
                <Comments />
            </CommentElement>

            <CommentElement>
                <CommentElement.Avatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
                <CommentElement.Content>
                    <CommentElement.Author as='a'>Elliot Fu</CommentElement.Author>
                    <CommentElement.Metadata>
                        <div>Yesterday at 12:30AM</div>
                    </CommentElement.Metadata>
                    <CommentElement.Text>
                        <CodeBlock
                            code={
                                'public int countSubstrings(String s) {\n    int n = s.length();\n    int count = 0;\n    \n    for (int center = 0; center < 2 * n - 1; center++) {\n        int left = center / 2;\n        int right = left + center % 2;\n        \n        while (left >= 0 && right < n && s.charAt(left) == s.charAt(right)) {\n            count++;\n            left--;\n            right++;\n        }\n    }\n    \n    return count;\n}'
                            }
                            language='java'
                        />
                    </CommentElement.Text>
                    <CommentElement.Actions>
                        <CommentElement.Action>Reply</CommentElement.Action>
                    </CommentElement.Actions>
                </CommentElement.Content>
            </CommentElement>

            <CommentElement>
                <CommentElement.Avatar src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                <CommentElement.Content>
                    <CommentElement.Author as='a'>Joe Henderson</CommentElement.Author>
                    <CommentElement.Metadata>
                        <div>5 days ago</div>
                    </CommentElement.Metadata>
                    <CommentElement.Text>
                        <CodeBlock
                            code={
                                'function countSubstrings(s) {\n    const n = s.length;\n    let count = 0;\n    \n    for (let center = 0; center < 2 * n - 1; center++) {\n        let left = Math.floor(center / 2);\n        let right = left + center % 2;\n        \n        while (left >= 0 && right < n && s.charAt(left) === s.charAt(right)) {\n            count++;\n            left--;\n            right++;\n        }\n    }\n    \n    return count;\n}'
                            }
                            language='javascript'
                        />
                    </CommentElement.Text>
                    <CommentElement.Actions>
                        <CommentElement.Action>Reply</CommentElement.Action>
                    </CommentElement.Actions>
                </CommentElement.Content>
            </CommentElement>
        </CommentElement.Group>
    );
};

export default Solves;
