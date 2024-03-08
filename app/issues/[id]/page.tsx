import authOptions from '@/app/auth/authOptions';
import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import Assignee from './Assignee';
import IssueDeleteButton from './IssueDeleteButton';
import IssueDetail from './IssueDetail';
import IssueEditButton from './IssueEditButton';

interface Props {
    params: {id : string}
}

const IssueDetailPage = async ({ params }: Props) => {
    const session = await getServerSession(authOptions);
    const issue = await prisma.issue.findUnique({ where : {id : parseInt(params.id)}
    });
    if (!issue)
      notFound();
  

  return (
    <Grid columns={{initial: '1', sm: '5'}} gap='5'>
      <Box className='md:col-span-4'>
        <IssueDetail issue={issue}/>
      </Box>
        { session && (<Box>
          <Flex direction='column' gap='4'>
            <Assignee issue={issue} />
          <IssueEditButton issueId={issue.id} />
          <IssueDeleteButton issueId={issue.id} />
          </Flex>
        </Box>) }
    </Grid>
  )
}

export default IssueDetailPage