import prisma from '@/prisma/client';
import { Table, TableColumnHeaderCell, TableRow, TableRowHeaderCell } from '@radix-ui/themes';
import { IssueStatusBadge, Link } from '@/app/components'
import NewIssue from './NewIssue';
import { Issue, Status } from '@prisma/client';
import NextLink from 'next/link'
import { ArrowUpIcon } from '@radix-ui/react-icons';


interface Props{
  searchParams: {status: Status, orderedBy: keyof Issue}
}


const IssuesPage = async ({ searchParams}: Props) => {
  const columns: {label: string, value: keyof Issue, className?: string}[] = [
    {label: "Issue", value: "title" },
    {label: "Status", value: "status", className: 'hidden md:table-cell'},
    {label: "Created", value: "createdAt", className: 'hidden md:table-cell'}
  ]

  const statuses =  Object.values(Status);
  const status = statuses.includes(searchParams.status)? searchParams.status : undefined;

  const orderBy = columns.map(column => column.value)
  .includes(searchParams.orderedBy)
  ? {[searchParams.orderedBy] : 'asc'} : undefined;

  const issues = await prisma.issue.findMany({
    where: {status},
    orderBy
  });
  
 
  return (
    <div>
      <NewIssue />
    <Table.Root variant='surface'>
      <Table.Header>
        <TableRow>
          {columns.map(column => (
             <TableColumnHeaderCell key={column.value} className={column.className}>
              <NextLink href={{
                query: {...searchParams, orderedBy: column.value}
                }}>
                 {column.label}
              </NextLink>
              {column.value === searchParams.orderedBy && <ArrowUpIcon className='inline'/>}
              </TableColumnHeaderCell>
          ))}
         
        </TableRow>
      </Table.Header>
      <Table.Body>
        {issues?.map((issue) => (
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
