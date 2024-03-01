import React from 'react'
import  prisma  from '@/prisma/client'
import { notFound } from 'next/navigation';
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { Pencil2Icon } from '@radix-ui/react-icons'
import IssueEditButton from './IssueEditButton';
import IssueDetail from './IssueDetail';
import IssueDeleteButton from './IssueDeleteButton';

interface Props {
    params: {id : string}
}

const IssueDetailPage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({ where : {id : parseInt(params.id)}
    });
    if (!issue)
      notFound();
  

  return (
    <Grid columns={{initial: '1', sm: '5'}} gap='5'>
      <Box className='md:col-span-4'>
        <IssueDetail issue={issue}/>
      </Box>
        <Box>
          <Flex direction='column' gap='4'>
          <IssueEditButton issueId={issue.id} />
          <IssueDeleteButton issueId={issue.id} />
          </Flex>
        </Box>
    </Grid>
  )
}

export default IssueDetailPage