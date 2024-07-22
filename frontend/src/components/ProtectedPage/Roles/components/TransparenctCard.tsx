import { Grid, Box, Typography } from '@mui/material'
import React from 'react'

const TransparenctCard: React.FC<{title:string; content:string}> = ({title, content}) => {
  return (
    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
    <Box sx={{ bgcolor: '#292929', p: 3, borderRadius: 2, width: '100%', maxWidth: '400px' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>
        <Typography>
                                 Easily create, view, update, and delete roles. Assign different permissions to roles to control access levels across the application.
        </Typography>
    </Box>
</Grid>
  )
}

export default TransparenctCard