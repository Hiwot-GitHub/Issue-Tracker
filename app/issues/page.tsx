import prisma from '@/prisma/client';
import { Table, TableColumnHeaderCell, TableRow, TableRowHeaderCell } from '@radix-ui/themes';
import {IssueStatusBadge, Link } from '@/app/components'
import NewIssue from './NewIssue';


const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
 
  return (
    <div>
      <NewIssue />
    <Table.Root variant='surface'>
      <Table.Header>
        <TableRow>
          <TableColumnHeaderCell>Issue</TableColumnHeaderCell>
          <TableColumnHeaderCell className='hidden md:table-cell'>Status</TableColumnHeaderCell>
          <TableColumnHeaderCell className='hidden md:table-cell'>Created</TableColumnHeaderCell>
        </TableRow>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <TableRowHeaderCell><Link href={`/issues/${issue.id}`}>{issue.title}</Link>
            <div className='block md:hidden'><IssueStatusBadge  status={issue.status} /></div></TableRowHeaderCell>
            <Table.Cell className='hidden md:table-cell'>
              <IssueStatusBadge  status={issue.status} />
            </Table.Cell>
            <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
    </div>
  )
}
export const dynamic = 'force-dynamic';
export default IssuesPage;
