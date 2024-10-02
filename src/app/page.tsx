'use client'

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import getConvertedAmount from './action';

import { formSchema, formSchemaType } from '@/validation/form-validation';

type exchangedAmountType = { 
  currency: string;
  rate: number;
  exchangedAmount: number;
};

export default function Home() {
  const [exchangedAmounts, setExchangedAmounts] = useState<exchangedAmountType[] | undefined>([]);

  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = (data: formSchemaType) => mutate(data);

  const { isPending, data, mutate } = useMutation({
    mutationFn: async (data: formSchemaType) => await getConvertedAmount(data),
    onSuccess: (res) => {
      setExchangedAmounts(res.data)
    }
  });

  return (
   <div>
    <div>
      <p>Currency Converter</p>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <input {...form.register('amount')} />
        <p>{form.formState.errors?.amount?.message}</p>

        <input type="submit" />
      </form>
      <p>
        { exchangedAmounts?.map(amount => 
          <p key={amount.currency}>{amount.currency} - {amount.rate} - {amount.exchangedAmount}</p>
        )}
      </p>
    </div>
   </div>
  );
}
