import { Table, TableRow, TableColumnHeaderCell, TableRowHeaderCell } from '@radix-ui/themes'
import React from 'react'
import IssueStatusBadge from '../components/IssueStatusBadge';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import NewIssue from './NewIssue';

const loadingIssuesPage = () => {
    const issues = [1,2,3,4,5];
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
          <Table.Row key={issue}>
            <TableRowHeaderCell><Skeleton />
            <div className='block md:hidden'><Skeleton /></div></TableRowHeaderCell>
            <Table.Cell className='hidden md:table-cell'>
            
            </Table.Cell>
            <Table.Cell className='hidden md:table-cell'><Skeleton /></Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
    </div>
  )
}

export default loadingIssuesPage