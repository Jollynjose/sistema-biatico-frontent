import { Box } from '@mui/material';
import { FieldArray } from 'formik';
import React from 'react';

function ParadasArrayInput() {
  return (
    <FieldArray name="ruta.paradas">
      {() => (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            minHeight: '60px',
            maxHeight: '140px',
          }}
        >
          <Box
            sx={{
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '.525rem',
            }}
          >
            {/* {formikProps.values.ruta.paradas.map((parada, index) => (
              <Box
                key={parada.id}
                sx={{
                  paddingRight: '1rem',
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '1rem',
                  pt: '.525rem',
                  width: '100%',
                  justifyContent: 'space-between',
                }}
              >
                <RutaInput
                menuItems={[]}
                  formLabel={`Seleccione Parada ${index + 1}`}
                //   menuItems={data.map((item) => ({
                //     label: item.name,
                //     value: item.id,
                //     disabled: formikProps.values.ruta.paradas.some(
                //       (parada) =>
                //         formikProps.values.ruta.origen === item.id ||
                //         parada.municipioId === item.id,
                //     ),
                //   }))}
                  selectProps={{
                    sx: {
                      width: '300px',
                    },
                    name: `ruta.paradas[${index}].municipioId`,
                    // onChange: formikProps.handleChange,
                    // onBlur: formikProps.handleBlur,
                  }}
                  textFieldProps={{
                    sx: {
                      width: 'max-content',
                    },
                    name: `ruta.paradas[${index}].kms`,
                    // onChange: formikProps.handleChange,
                    // onBlur: formikProps.handleBlur,
                  }}
                />

                <Box
                  sx={{
                    display: 'flex',
                    gap: '1rem',
                  }}
                >
                  <RemoveButton
                    variant="outlined"
                    onClick={() => {
                      arrayHelper.remove(index);
                    }}
                    // disabled={formikProps.values.ruta.paradas.length === 1}
                  />

                  <AddButton
                    variant="contained"
                    onClick={() => {
                      arrayHelper.push({
                        municipioId: '',
                        kms: 0,
                        id: Math.random().toString(36).substring(7),
                      });
                    }}
                  />
                </Box>
              </Box>
            ))} */}
          </Box>
        </Box>
      )}
    </FieldArray>
  );
}

export default ParadasArrayInput;
