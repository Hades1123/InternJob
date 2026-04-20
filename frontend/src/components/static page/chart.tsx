import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import { useCompanyQueryAll } from '@/hooks/query/companyQuery';
import { useMemo } from 'react';

interface IProps {
  chartName: string;
  labelName: string;
  techs: string[];
  handleData: (value: ICompany[], tech: string[]) => Map<string, number>;
  options?: ApexOptions;
  type?:
    | 'bar'
    | 'line'
    | 'area'
    | 'pie'
    | 'donut'
    | 'radialBar'
    | 'scatter'
    | 'bubble'
    | 'heatmap'
    | 'candlestick'
    | 'boxPlot'
    | 'radar'
    | 'polarArea'
    | 'rangeBar'
    | 'rangeArea'
    | 'treemap'
    | undefined;
}

export const StaticChart = (props: IProps) => {
  const { data: companyList, isError, isLoading } = useCompanyQueryAll();
  const { chartName, labelName, handleData, techs } = props;

  const chartData = useMemo(() => {
    if (!companyList) return { series: [], categories: [] };
    const positionData = handleData(companyList, techs);
    return {
      series: [{ name: 'Jobs', data: [...positionData.values()] }],
      categories: [...positionData.keys()],
    };
  }, [companyList]);

  if (isError) {
    return <div>Some errors occurred</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const options: ApexOptions = {
    colors: [],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 5,
        borderRadiusApplication: 'end',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: chartData.categories,
    },
    yaxis: {
      title: {
        text: labelName,
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + '';
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mt-8">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          {chartName}
        </h4>
      </div>
      <div>
        <Chart
          options={options}
          series={chartData.series}
          type={'bar'}
          height={350}
        />
      </div>
    </div>
  );
};
