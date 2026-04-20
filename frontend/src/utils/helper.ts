export const handlePositionData = (data: ICompany[]) => {
  const positionMap = new Map<string, number>();
  data?.forEach((item) => {
    item?.GeminiSumary?.positions?.forEach((position) => {
      positionMap.set(
        position.title,
        (positionMap.get(position.title) || 0) + 1
      );
    });
  });

  return positionMap;
};

export const handleTechStack = (data: ICompany[], techs: string[]) => {
  const positionMap = new Map<string, number>(techs.map((tech) => [tech, 0]));

  data?.forEach((company) => {
    const allTechStacksSet = company.allTechStacks;
    for (const tech of allTechStacksSet) {
      const exist = positionMap.get(tech);
      if (exist == undefined) {
        continue;
      }
      positionMap.set(tech, (positionMap.get(tech) || 0) + 1);
    }
  });

  const result = new Map<string, number>();

  positionMap.forEach((value, key) => {
    if (value > 0) {
      result.set(key[0].toUpperCase() + key.substring(1), value);
    }
  });

  return new Map([...result.entries()].sort((a, b) => b[1] - a[1]));
};
