'use client'

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowClockwise, GlobeHemisphereEast } from '@phosphor-icons/react';
import { BeatLoader } from 'react-spinners';

import getConvertedAmount from './action';

import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

import { formSchema, formSchemaType } from '@/validation/form-validation';

type exchangedAmountType = { 
  currency: string;
  rate: number;
  exchangedAmount: number;
};

export default function Home() {
  const [exchangedAmounts, setExchangedAmounts] = useState<exchangedAmountType[] | undefined>([]);

  const router = useRouter();

  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = (data: formSchemaType) => mutate(data);

  const { isPending, mutate } = useMutation({
    mutationFn: async (data: formSchemaType) => await getConvertedAmount(data),
    onSuccess: (res) => {
      setExchangedAmounts(res.data)
    }
  });

  return (
   <div className={`w-full h-full space-y-5`}>
    <div className={`space-y-1`}>
      <p className={`text-xs text-zinc-100`}>You are converting from <span className={`font-bold`}>AUD</span></p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={`flex items-center gap-1`}>
          <FormField
            control={form.control}
            name={`amount`}
            render={({ field }) => 
              <FormItem>
                <Input className={`text-zinc-100`} {...field} />
                <FormMessage />
              </FormItem>
            }
          />
          <Button disabled={isPending} type={`submit`} variant={`secondary`} size={`sm`} className={`gap-1 ${isPending ? 'cursor-not-allowed' : ''}`}>
            <ArrowClockwise className={`w-4 h-4 ${isPending ? 'animate-spin' : ''}`} />
            <span>Convert</span>
          </Button>
        </form>
      </Form>
    </div>
    <div className={`space-y-1`}>
      <p className={`text-xs text-zinc-100`}>Result</p>
      { isPending ? 
        <BeatLoader color={`#FFFFFF`} size={15} />         
        :
        <ScrollArea>
          { exchangedAmounts?.map(amount => 
            <div title={`View Exchange History`} key={amount.currency} onClick={() => router.push(`/${amount.currency}`)} className={`max-w-5xl mb-1 py-2 px-3 flex items-center justify-between bg-zinc-100 text-sm rounded-md hover:bg-blue-300 transition-colors cursor-pointer`}>
              <div className={`flex items-center gap-3`}>
                <GlobeHemisphereEast className={`w-6 h-6`} />
                <div>
                  <p className={`font-bold`}>{amount.currency}</p>
                  <p className={`text-xs`}>1 AUD = {amount.rate} {amount.currency}</p>
                </div>
              </div>
              <p>${amount.exchangedAmount.toFixed(3)}</p>
            </div>
          ) }
        </ScrollArea>
      }
    </div>
   </div>
  );
}
