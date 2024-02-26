import { Flex, Card, Box } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingIsseDetail = () => {
  return (
    <Box className='max-w-xl'>
    <Skeleton />
    <Flex className='space-x-3 my' my='2'>
    <Skeleton width='5rem' />
    <Skeleton width='8rem' />
    </Flex>
    <Card className='prose' >
    <Skeleton count={3} />
    </Card>
</Box>
  )
}

export default LoadingIsseDetail