import React, { useState } from 'react';
import { useFuels } from '@/hook/useFuels';
import { Fuel } from '@/interfaces/fuel';
import { Button, TextField, Stack } from '@mui/material';
import axios from 'axios';
import DataTable from './components/DataTable';
import LoadingBackdrop from '@/components/LoadingBackdrop';

const FuelPage: React.FC = () => {
  const { fuels, isLoading, error, refetch, isRefetching } = useFuels();
  const [price, setPrice] = useState<number>(0);

  const handleSaveFuel = async (fuel: Fuel) => {
    if (price && fuel) {
      const payload = {
        fuel_id: fuel.id,
        price
      };

      try {
        await axios.post(`/api/fuel/update-history`, payload);
        refetch()
      } catch (error) {
        console.error('Error updating fuel:', error);
      }
    }
  };

  const handlerChange = ({ target }) => setPrice(parseFloat(target.value))

  const columns = [
    { header: 'Nombre', accessor: 'name' },
    { header: 'Tipo', accessor: 'type' },
    { header: 'Precio', accessor: 'price', render: (fuel: Fuel) => `$${fuel.fuel_histories.at(-1)?.price}` },
  ];

  const commonStyles = {
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
  };

  const collapsibleContentFuel = (fuel: Fuel) => (
    <div style={commonStyles}>
      <h3>Editar Combustible</h3>
      <Stack direction="row" spacing={2} sx={{ width: '100%' }} marginTop={2}>
        <TextField
          label="Precio"
          type="number"
          defaultValue={fuel.fuel_histories.at(-1)?.price}
          onChange={handlerChange}
          fullWidth
          margin="normal"
          name="price"
        />
      </Stack>
      <Button onClick={() => handleSaveFuel(fuel)}>Guardar</Button>
    </div>
  );

  if (isLoading || isRefetching) return <LoadingBackdrop />
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      <DataTable
        data={fuels!}
        columns={columns}
        collapsibleContent={collapsibleContentFuel}
      />
    </div>
  );
};

export default FuelPage;

