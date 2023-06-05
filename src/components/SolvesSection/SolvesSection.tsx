import { FormControl, InputLabel, MenuItem, Select, Stack, Toolbar } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Comment as CommentElement } from 'semantic-ui-react';

import { useGetSolvesQuery } from '../../api/slices/solveApi';
import Solve from '../Solve/Solve';

type SolvesSectionProps = {};
type Sort = 'pop' | 'new' | 'old' | 'rate' | 'time' | 'mem';
type Language = '-' | 'csharp' | 'java' | 'javascript' | 'php' | 'python' | 'cpp';

const SolvesSection = (props: SolvesSectionProps) => {
    const { id: idRaw } = useParams();
    const id = Number(idRaw);
    const { data: solves } = useGetSolvesQuery(id, { skip: isNaN(id) });
    const [sort, setSort] = useState<Sort>('new');
    const [lang, setLang] = useState<Language>('-');
    return (
        <Stack gap={1}>
            <Toolbar component={Stack} direction={'row'}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel>Sort by</InputLabel>
                    <Select value={sort} onChange={(e) => setSort(e.target.value as Sort)} label='Sort by' size='small'>
                        <MenuItem value={'pop'}>Popularity</MenuItem>
                        <MenuItem value={'rate'}>Rating</MenuItem>
                        <MenuItem value={'new'}>Newest</MenuItem>
                        <MenuItem value={'old'}>Oldest</MenuItem>
                        <MenuItem value={'time'}>Fastest</MenuItem>
                        <MenuItem value={'mem'}>Lowest memory</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel>Language</InputLabel>
                    <Select
                        value={lang}
                        label='Language'
                        onChange={(e) => setLang(e.target.value as Language)}
                        size='small'
                    >
                        <MenuItem value='-'>Any</MenuItem>
                        <MenuItem value='cpp'>C++</MenuItem>
                        <MenuItem value='csharp'>C#</MenuItem>
                        <MenuItem value='java'>Java</MenuItem>
                        <MenuItem value='javascript'>JavaScript</MenuItem>
                        <MenuItem value='php'>PHP</MenuItem>
                        <MenuItem value='python'>Python</MenuItem>
                    </Select>
                </FormControl>
            </Toolbar>
            <CommentElement.Group>
                {[...(solves ?? [])]
                    .filter((s) => lang === '-' || s.language?.languageInternalName === lang)
                    .sort((a, b) => {
                        if (sort === 'pop') {
                            return (b.upvotes ?? 0) - (a.upvotes ?? 0);
                        } else if (sort === 'rate') {
                            return (
                                (b.upvotes ?? 0) / ((b.upvotes ?? 0) + (b.downvotes ?? 0) + 1) -
                                (a.upvotes ?? 0) / ((a.upvotes ?? 0) + (a.downvotes ?? 0) + 1)
                            );
                        } else if (sort === 'new') {
                            return a.createDate! < b.createDate! ? 1 : -1;
                        } else if (sort === 'time') {
                            return (a.timeMs ?? 0) - (b.timeMs ?? 0);
                        } else if (sort === 'mem') {
                            return (a.memoryBytes ?? 0) - (b.memoryBytes ?? 0);
                        } else {
                            return a.createDate! > b.createDate! ? 1 : -1;
                        }
                    })
                    .map((solve) => (
                        <Solve solve={solve} />
                    ))}
            </CommentElement.Group>
        </Stack>
    );
};

export default SolvesSection;
