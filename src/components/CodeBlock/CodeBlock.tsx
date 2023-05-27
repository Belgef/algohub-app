import { Paper, Typography } from '@mui/material';

type CodeBlockProps = {
    code?: string;
    language?: string;
};

const CodeBlock = (props: CodeBlockProps) => {
    return (
        <Paper elevation={4} sx={{ alignSelf: 'stretch', px: 2, mx: 2 }}>
            <Typography variant='caption'>{props.language}</Typography>
            <pre style={{ maxHeight: '54rem', overflow: 'auto' }}>
                <code className={props.language}>{props.code}</code>
            </pre>
        </Paper>
    );
};

export default CodeBlock;
