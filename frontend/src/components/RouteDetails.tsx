import { useEffect, useState } from 'react';
import { fetchRouteStops } from '../services/api';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

type Stop = {
  stopSequence: number;
  stopId: number;
  stopName: string;
  arrivalTime: string;
  departureTime: string;
};

type Trip = {
  tripId: number;
  departureTime: string;
  arrivalTime: string;
  notes?: string;
  stops: Stop[];
};

export default function RouteDetails() {
  const { id } = useParams();
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    if (id) {
      fetchRouteStops(Number(id)).then(res => setTrips(res.data));
    }
  }, [id]);

  return (
    <>
      <Typography variant="h5">Trips</Typography>
      {trips.map(trip => (
        <Card key={trip.tripId} sx={{ my: 2 }}>
          <CardContent>
            <Typography variant="h6">
              Trip #{trip.tripId} | {new Date(trip.departureTime).toLocaleString()} → {new Date(trip.arrivalTime).toLocaleString()}
            </Typography>
            <List>
            <>
              {trip.stops.map(stop => (
                <ListItem key={stop.stopSequence}>
                  <ListItemText
                    primary={`${stop.stopSequence}. ${stop.stopName}`}
                    secondary={`Arr: ${new Date(stop.arrivalTime).toLocaleTimeString()} | Dep: ${new Date(stop.departureTime).toLocaleTimeString()}`}
                  />
                </ListItem>
              ))}
            </>
            </List>

          </CardContent>
        </Card>
      ))}
    </>
  );
}