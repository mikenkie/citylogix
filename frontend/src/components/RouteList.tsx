import { useEffect, useState } from 'react';
import { fetchRoutes } from '../services/api';
import { List, ListItem, ListItemText, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';

type Route = { id: number; name: string; type: string; active: boolean };

export default function RouteList() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRoutes({ page, pageSize: 10 }).then(res => {
      setRoutes(res.data);
      setTotal(2); // You can replace with actual total pages if available
    });
  }, [page]);

  return (
    <>‹
      <List>
        {routes.map(route => (
          <ListItem key={route.id} disablePadding>
            <ListItemButton onClick={() => navigate(`/routes/${route.id}`)}>
              <ListItemText primary={route.name} secondary={route.type} />
            </ListItemButton>
          </ListItem>
        )) as React.ReactNode}
      </List>
      <Pagination count={total} page={page} onChange={(_, v) => setPage(v)} />
    </>
  );
}