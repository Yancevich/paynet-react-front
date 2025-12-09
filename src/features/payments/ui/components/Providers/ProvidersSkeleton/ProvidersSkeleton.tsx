import { Grid, Skeleton } from '@mantine/core'
import '../ProviderCard/ProviderCard.css'

const PLACEHOLDERS = 12

const ProvidersSkeleton = () => (
  <Grid className="providers" gutter={{ base: 8, xs: 12, md: 16 }}>
    {Array.from({ length: PLACEHOLDERS }).map((_, index) => (
      <Grid.Col key={index} span={{ base: 6, sm: 6, md: 4, lg: 3 }}>
        <div
          className="provider provider--skeleton"
          style={{ aspectRatio: '203 / 96' }}
        >
          <Skeleton className="provider__skeleton" width="100%" height="100%" />
        </div>
      </Grid.Col>
    ))}
  </Grid>
)

export default ProvidersSkeleton
