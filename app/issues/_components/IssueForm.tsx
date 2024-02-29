'use client';
import { ErrorMessage, Spinner} from '@/app/components';
import { IssueSchema as createIssueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false});

type IssueFormData = z.infer<typeof createIssueSchema>

const IssueForm = async ({issue}: {issue?: Issue}) => {
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({resolver: zodResolver(createIssueSchema)});

  return (
   
    <div className='max-w-xl'>
     {error && <Callout.Root color='red' className='mb-5'>
      <Callout.Text>{error}</Callout.Text></Callout.Root>}
    <form className='space-y-3' onSubmit={handleSubmit(async (data) => {
                   try {
                     setSubmitting(true);
                     if (issue)
                     await axios.patch('/api/issues/'+ issue.id, data);
                     else
                     await axios.post('/api/issues', data)
                     router.push('/issues') 
                  } catch (error) {
                    setSubmitting(false);
                    setError('unexpected error has occured.');
                   }
                  })}>
        <TextField.Root>
            <TextField.Input defaultValue={issue?.title} placeholder='Title' {...register('title')} />
        </TextField.Root>
         <ErrorMessage>{errors.title?.message}</ErrorMessage>
       <Controller name="description" defaultValue={issue?.description} control={control} render={({ field }) => <SimpleMDE placeholder='Description'   {...field} />}

       />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={submitting}>{issue ? 'Update Issue' : 'Submit new Issue'}{' '} { submitting && <Spinner />}</Button>
    </form>
    </div>
  )
}

export default IssueForm