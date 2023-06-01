import 'highlight.js/styles/vs.css';

import { Container, Grid, Typography } from '@mui/material';
import hljs from 'highlight.js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetProblemByIdQuery } from '../../api/slices/problemApi';
import { useAddSolveMutation } from '../../api/slices/solveApi';
import CodeEditor from '../../components/CodeEditor/CodeEditor';
import Content from '../../components/Content/Content';
import ResultsModal from '../../components/ResultsModal/ResultsModal';
import useAuthorization from '../../hooks/useAuthorization';

const ProblemSolvePage = () => {
    useAuthorization('User');

    const { id: idRaw } = useParams();
    const id = Number(idRaw);
    const { data: problem } = useGetProblemByIdQuery(id, { skip: isNaN(id) });
    const [addSolve] = useAddSolveMutation();
    const [results, setResults] = useState<string[]>();

    useEffect(() => hljs.highlightAll());

    return (
        <>
            <Grid container sx={{ width: '100%' }} alignItems={'stretch'}>
                <Grid item sm={12} md={8} lg={8}>
                    <CodeEditor
                        default=''
                        onSubmit={async (code, lang) => {
                            const res = await addSolve({ code: code, languageName: lang, problemId: id });
                            setResults('data' in res ? res.data ?? undefined : []);
                        }}
                    />
                </Grid>
                <Grid item sm={12} md={4} lg={4}>
                    <Container sx={{ mt: '1em' }}>
                        <Typography variant='h5' component={'div'}>
                            {problem?.problemName}
                        </Typography>
                        <Container
                            maxWidth='md'
                            style={{ height: 'calc(87vh - 64px)', overflow: 'auto', margin: '2em 0' }}
                        >
                            <Content content={problem?.problemContent} />
                        </Container>
                    </Container>
                </Grid>
            </Grid>
            <ResultsModal results={results} setResults={setResults} />
        </>
    );
};

export default ProblemSolvePage;
