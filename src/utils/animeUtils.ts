import { convertToDate, checkDemographic, changeDateFormat, ratingFormat } from "../helpers/AnimePageFunction";

interface AnimeData {
    Media: {
      id: number;
      averageScore: number;
      bannerImage: string;
      coverImage: { large: string; extraLarge: string };
      description: string;
      episodes: number;
      genres: string[];
      source: string;
      startDate: { year: number; month: number; day: number };
      status: string;
      tags: { name: string }[];
      title: { english: string; romaji: string };
      updatedAt: number;
      studios:{nodes:{name:string}[]}
    };
  }


export const setupAnimeData = (data:AnimeData) =>{

  if (!data){
    return {};
  }

    const animeData = data?.Media
    const copyOfGenre = [...animeData?.genres];
    
    const id = animeData?.id
    const episodes:number | string = animeData?.episodes || "-"
    const source = animeData?.source
    const status = animeData?.status
    const studio:string = animeData?.studios?.nodes[0]?.name || "NO_INFORMATION"
    const name = animeData?.title?.english || animeData?.title?.romaji
    const demographic: string | null = animeData?.tags?.find(checkDemographic)?.name || null
    const banner = animeData?.bannerImage || animeData?.coverImage?.extraLarge
    const description = animeData?.description || "NO_DESCRIPTION_PROVIDED"
    const cover = animeData?.coverImage?.extraLarge
    const lastUpdatedAt = convertToDate(animeData?.updatedAt) || null
    const airingDate = changeDateFormat(animeData?.startDate?.day, animeData?.startDate?.month, animeData?.startDate?.year)
    const score: number | null = ratingFormat(animeData?.averageScore) || null

    if (demographic){ 
      copyOfGenre.push(demographic)
    };
    
    const genres = copyOfGenre

    return { name, demographic, banner, description, cover, lastUpdatedAt, airingDate, score,id,episodes,source,status,studio,genres };
}