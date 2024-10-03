'use client'

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { BeatLoader } from 'react-spinners';
import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from 'recharts';
import { ArrowLeft } from '@phosphor-icons/react';

import getHistoricalExchangeRate from './action';

import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Button } from '@/components/ui/button';

import logProcessor from '@/lib/log-processor';

const ExchangeHistory = ({ params } : { params: { id: string } }) => {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryFn: async () => await getHistoricalExchangeRate(params.id),
    queryKey: ['exchange-history', params.id]
  });

  if (isLoading) return <BeatLoader color={`#FFFFFF`} size={15} />;

  return (
    <div className={`w-full h-full`}>
      <Button variant={`secondary`} size={`sm`} onClick={() => router.push('/')} className={`gap-1`}>
        <ArrowLeft className={`w-4 h-4`} />
        <span>Back</span>
      </Button>
      <p className={`text-zinc-100 text-center`}>Exchange Rate Last 14 Days: {params.id}</p>
      { data ? 
        <div className={`lg:w-1/2 w-full`}>
          <ChartContainer config={{ rateOnDate: { label: 'rateOnDate', color: 'hsl(var(--chart-2))' } }}>
            <LineChart accessibilityLayer data={logProcessor(data, params.id)} margin={{ top: 30, right: 30 }}>
              <CartesianGrid vertical={true} />
              <XAxis
                  dataKey={`date`}
                  tickLine={true}
                  axisLine={false}
                  tickSize={10}
                  tickFormatter={(value) => value}
              />
              <YAxis tickCount={10} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                  dataKey={'rateOnDate'}
                  type={'linear'}
                  stroke={'var(--color-rateOnDate)'}
                  strokeWidth={1}
                  dot={{ fill: 'var(--color-rateOnDate)' }}
                  activeDot={{ r: 4 }}
              >
                  <LabelList
                      position={'top'}
                      offset={5}
                      className={'#000000'}
                      fontSize={9}
                  />
              </Line>
              <ChartLegend content={<ChartLegendContent />} />           
            </LineChart>
          </ChartContainer>
        </div>
        :
        <p className={`py-5 text-center text-zinc-400 text-sm italic`}>Cannot Find Any Data :/</p>
      }
    </div>
  );
};

export default ExchangeHistory;
