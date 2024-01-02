import { DozerInfo } from "./types";

export const convertDataToDozers = (data: any) => {
    const dozerInfos: DozerInfo[] = data.models.map((m: any) => {
      const powerSpec = m.specs.find(
        (s: any) =>
          s.spec_name.toLowerCase().includes('power') &&
          !s.spec_name.toLowerCase().includes('speed'),
      );
      const powerString: string =
        powerSpec == undefined ? 'Unknown' : powerSpec.spec_value[0];
      const powerNumber: number | undefined =
        powerSpec == undefined
          ? undefined
          : Number(powerSpec.spec_value[0].split(' ')[0]);

      const weightSpec = m.specs.find((s: any) =>
        s.spec_name.toLowerCase().includes('operating weight'),
      );
      const weigthString: string =
        weightSpec == undefined ? 'Unknown' : weightSpec.spec_value[0];
      const weightNumber: number | undefined =
        weightSpec == undefined
          ? undefined
          : Number(weightSpec.spec_value[0].split(' ')[0]);
      const productCategory = m.productCategory.split('/')[2];

      const dozerInfo: DozerInfo = {
        category: productCategory,
        engineHp: powerNumber,
        engineHpString: powerString,
        makeName: m.brand,
        modelId: m.idmodel,
        modelName: m.model_name,
        operatingWeightString: weigthString,
        operatingWeight: weightNumber,
        imageUrl: m.image_url,
      };
      return dozerInfo;
    });

    return dozerInfos;
  }