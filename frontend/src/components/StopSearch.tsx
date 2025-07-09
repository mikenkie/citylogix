import { useState } from 'react';
import { searchStops } from '../services/api';
import { TextField, List, ListItem, ListItemText, Button } from '@mui/material';

type Stop = { id: number; name: string; location: string };

export default function StopSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Stop[]>([]);

  const handleSearch = async () => {
    if (query) {
      const res = await searchStops(query);
      setResults(res.data);
    }
  };

  return (
    <>
      <TextField
        label="Search stop name"
        value={query}
        onChange={e => setQuery(e.target.value)}
        sx={{ mr: 2 }}
      />
      <Button variant="contained" onClick={handleSearch}>Search</Button>
      <List>
        {results.map(stop => (
            <ListItem key={stop.id}>
                <ListItemText primary={stop.name} secondary={stop.location} />
                </ListItem>
        )) as React.ReactNode}
      </List>
    </>
  );
}