import { Entry } from 'contentful';

export interface VillaContentModel {
  id: string;
  title: string;
  faciliteiten: string;
  description: string;
  plattegrond: Entry<ContentfulPhoto>;
  infoRechts: string;
  prijsVanaf: string;
  sliderPhotos: Entry<SliderPhotoContentModel>[];
  prijzen: Entry<PriceRange>[];
  slug: string;
}
export interface VillaFaciliteiten extends Partial<VillaContentModel> {
  id: string;
  title: string;
  faciliteiten: string;
  prijsVanaf: string;
  slug: string;
}

export interface ContentfulPhoto {
  description: string;
  title: string;
  file: {
    url: string;
    file_name: string;
  };
}

export interface PriceRange {
  vanaf: Date;
  tot: Date;
  prijs: string;
  styles: PriceRangeStyles[];  
}

export type PriceRangeStyles = 'lastminute' | 'block' | 'laagseizoen' | 'midseizoen' | 'hoogseizoen';

export interface ChateauPost {
  title: string;
  description: string;
  content: string;
  cover: Entry<ContentfulPhoto>;
  slug: string;
}
export interface SliderPhotoContentModel {
  title: string;
  image: Entry<ContentfulPhoto>;
  order: number;
}
export type ContentModelTypes = ChateauPost | VillaContentModel | ChateauPost | SliderPhotoContentModel;