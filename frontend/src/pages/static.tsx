import { StaticChart } from '@/components/static page/chart';
import { PositionChart } from '@/components/static page/position.chart';
import {
  BACKEND,
  DB_CLOUD,
  FRONTEND,
  MOBILE,
  OTHERS,
  PROGRAMING_LANGUAGE,
} from '@/constants/techStacks';
import { handleTechStack } from '@/utils/helper';

export const StaticPage = () => {
  return (
    <div className="p-16">
      <PositionChart />

      <div className="grid grid-cols-2 gap-4">
        <StaticChart
          chartName="Programing Language"
          handleData={handleTechStack}
          labelName="Jobs"
          techs={PROGRAMING_LANGUAGE}
        />

        <StaticChart
          chartName="Frontend"
          handleData={handleTechStack}
          labelName="Jobs"
          techs={FRONTEND}
        />

        <StaticChart
          chartName="Backend"
          handleData={handleTechStack}
          labelName="Jobs"
          techs={BACKEND}
        />

        <StaticChart
          chartName="Mobile"
          handleData={handleTechStack}
          labelName="Jobs"
          techs={MOBILE}
        />

        <StaticChart
          chartName="Database && Cloud"
          handleData={handleTechStack}
          labelName="Jobs"
          techs={DB_CLOUD}
        />

        <StaticChart
          chartName="Others"
          handleData={handleTechStack}
          labelName="Jobs"
          techs={OTHERS}
        />
      </div>
    </div>
  );
};
