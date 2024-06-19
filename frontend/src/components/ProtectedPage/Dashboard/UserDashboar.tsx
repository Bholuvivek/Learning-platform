import { Card, Container, Grid } from '@mui/material'
import Chart from 'react-apexcharts'
const UserDashboar = () => {

  return (
    <Container >
    <Grid container spacing={3} sx={{ display: 'flex', flexWrap: 'wrap',  }}>
      <Grid item xs={12} sm={6}>
        <Card sx={{ mx: 1, width: '100%', background: '#484848'}}>
        <Chart
    type="bar"
    height={'400px'}
    series={[
        { name: 'c1', data: [12, 23, 122, 221], color: '#292929' },
        { name: 'c2', data: [121, 23, 134, 121], color: '#2FFFF0' },
        { name: 'c3', data: [22, 121, 212, 171], color: '#FFF929' },
        { name: 'c4', data: [121, 23, 212, 145], color: '#0er929' },
    ]}
    options={{
        chart: { stacked: false },
        dataLabels: { style: { colors: ['#FFF'] } },
        colors:['#FFF'],
       xaxis:{
       labels:{
        style:{
          colors: "#FFF",
          fontSize: "20px",      
          fontWeight:600,
           
          
        }
       }
       },
       yaxis:{
        labels:{
         style:{
           colors: "#FFF",
           fontSize: "20px",      
           fontWeight:600,
            
           
         }
        }
        }
    }}
    
/>

        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card sx={{mx: 1, width: '100%' ,background: '#484848' }}>
          <Chart
            type="line"
            height={'400px'}
            series={[
              { name: 'c1', data: [12, 23, 122, 221], color: '#292929' },
              { name: 'c3', data: [22, 121, 212, 171], color: '#FFF929' },
              { name: 'c4', data: [121, 23, 212, 145], color: '#0er929' },
            ]}
            options={{
              chart: { stacked: false },
              dataLabels: { style: { colors: ['#FFF'] } },
              colors:['#FFF'],
             xaxis:{
             labels:{
              style:{
                colors: "#FFF",
                fontSize: "20px",      
                fontWeight:600,
                 
                
              }
             }
             },
             yaxis:{
              labels:{
               style:{
                 colors: "#FFF",
                 fontSize: "20px",      
                 fontWeight:600,
                  
                 
               }
              }
              }
          }}
          />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card sx={{ mx: 1, width: '100%', background: '#484848' }}>
          <Chart
            type="heatmap"
            height={'400px'}
            series={[
              { name: 'c1', data: [12, 23, 122, 221], color: '#292929' },
              { name: 'c2', data: [121, 23, 134, 121], color: '#2FFFF0' },
              { name: 'c3', data: [22, 121, 212, 171], color: '#FFF929' },
              { name: 'c4', data: [121, 23, 212, 145], color: '#0er929' },
            ]}
            options={{
              chart: { stacked: false },
              dataLabels: { style: { colors: ['#FFF'] } },
              colors:['#FFF'],
             xaxis:{
             labels:{
              style:{
                colors: "#FFF",
                fontSize: "20px",      
                fontWeight:600,
                 
                
              }
             }
             },
             yaxis:{
              labels:{
               style:{
                 colors: "#FFF",
                 fontSize: "20px",      
                 fontWeight:600,
                  
                 
               }
              }
              }
          }}
          />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card sx={{ mx: 1, width: '100%', background: '#484848' }}>
          <Chart
            type="area"
            height={'400px'}
            series={[
              { name: 'c1', data: [12, 23, 122, 221], color: '#FFF000' },
              { name: 'c3', data: [22, 121, 212, 171], color: '#FFF000' },
              { name: 'c4', data: [121, 23, 212, 145], color: '#000000' },
            ]}
            options={{
              chart: { stacked: false },
              dataLabels: { style: { colors: ['#FFF'] } },
              colors:['#FFF'],
             xaxis:{
             labels:{
              style:{
                colors: "#FFF",
                fontSize: "20px",      
                fontWeight:600,
              }
             }
             },
             yaxis:{
              labels:{
               style:{
                 colors: "#FFF",
                 fontSize: "20px",      
                 fontWeight:600,
                  
                 
               }
              }
              }
          }}
          />
        </Card>
      </Grid>
    </Grid>
  </Container>
  )
}

export default UserDashboar
