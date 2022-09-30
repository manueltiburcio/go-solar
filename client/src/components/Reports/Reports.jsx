import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import ReportCard from '../ReportCard.jsx';
import { Typography } from '@mui/material';

function Reports({ loading, reportsList, formData, reportData, handleDelete }) {
  const [empty, setEmpty] = useState(true);

  useEffect(() => {
    if (Array.isArray(reportsList)) {
      setEmpty(false);
    }
  }, [reportsList]);

  return (
    <Container>
      <Grid container>
        {empty ? <Typography variant='h4'>It seems there's no savings reports created yet!</Typography> :

          reportsList.map((item) => {
            return (
              <Grid key={item._id} sx={{ mb: 3 }}>
                <ReportCard
                  id={item._id}
                  reportData={item}
                  handleDelete={handleDelete}
                ></ReportCard>
              </Grid>
            )
          })

        }

        {/* {loading ? <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>

          :

          reportsList.map((item) => {
            return (
              <Grid key={item._id}>
                <ReportCard
                  id={item._id}
                  reportData={item}
                ></ReportCard>
              </Grid>
            )
          })

        } */}


        {/* {!loading ? reportsList.map((item) => {
          return (
            <Grid key={item._id}>
              <ReportCard
                id={item._id}
                reportData={item}
              ></ReportCard>
            </Grid>
          )
        })
          :
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        } */}
      </Grid >
    </Container>
  )
}

export default Reports