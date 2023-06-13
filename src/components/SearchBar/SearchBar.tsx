import FilterIcon from '@mui/icons-material/FilterAlt';
import ManIcon from '@mui/icons-material/Man';
import SearchIcon from '@mui/icons-material/Search';
import TagIcon from '@mui/icons-material/Tag';
import { Badge, IconButton, InputBase, Paper, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type SearchBarProps = {};

const SearchBar = (props: SearchBarProps) => {
    const [params, setParams] = useSearchParams();
    const [searchText, setSearchTest] = useState(params.get('search') ?? '');

    useEffect(() => setSearchTest(params.get('search') ?? ''), [params]);

    return (
        <Paper
            component='form'
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            onSubmit={(e) => {
                e.preventDefault();
                setSearchTest(searchText.trim());
                if (searchText.trim() === params.get('search')) {
                    return;
                }
                if (searchText.trim() !== '') {
                    params.set('search', searchText.trim());
                } else {
                    params.delete('search');
                }
                setParams(params);
            }}
            elevation={10}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder='Search problems'
                inputProps={{ id: 'searchbar' }}
                value={searchText}
                onChange={(e) => setSearchTest(e.target.value)}
            />
            <Tooltip title='Search'>
                <IconButton sx={{ p: '10px' }} aria-label='search' type='submit'>
                    <SearchIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title='Filter by tag'>
                <IconButton
                    sx={{ p: '10px' }}
                    onClick={() => {
                        setSearchTest('tag: ');
                        document.getElementById('searchbar')?.focus();
                    }}
                >
                    <Badge
                        badgeContent={<TagIcon sx={{ color: 'text.secondary' }} />}
                        sx={{ '& .MuiBadge-badge': { color: 'text.primary' } }}
                    >
                        <FilterIcon />
                    </Badge>
                </IconButton>
            </Tooltip>
            <Tooltip title='Filter by author'>
                <IconButton
                    sx={{ p: '10px' }}
                    onClick={() => {
                        setSearchTest('author: ');
                        document.getElementById('searchbar')?.focus();
                    }}
                >
                    <Badge
                        badgeContent={<ManIcon sx={{ color: 'text.secondary' }} />}
                        sx={{ '& .MuiBadge-badge': { color: 'text.primary' } }}
                    >
                        <FilterIcon />
                    </Badge>
                </IconButton>
            </Tooltip>
        </Paper>
    );
};

export default SearchBar;
