import { Paper, Typography } from '@mui/material';
import hljs from 'highlight.js';
import { useEffect } from 'react';

type CodeBlockProps = {
    code?: string;
    language?: string;
};

const CodeBlock = (props: CodeBlockProps) => {
    useEffect(()=>hljs.highlightAll())
    return (
        <Paper elevation={1} sx={{ alignSelf: 'center', px: 2, mx: 2 }}>
            <Typography variant='caption'>{props.language}</Typography>
            <pre style={{ maxHeight: '54rem', overflow: 'auto' }}>
                <code className={props.language} style={{ background: 0 }}>
                    {props.code}
                </code>
            </pre>
        </Paper>
    );
};

export default CodeBlock;
