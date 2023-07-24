import { gql, useQuery } from "@apollo/client";
import { findSeason } from "../helpers/useFindSeason";


interface Title {
  english?: string;
  romaji?: string;
}

export interface Media {
  id: number;
  title: Title;
  coverImage: {
    large: string;
  }
  episodes?: number;
}

interface PageData {
  pageInfo: {
    total?: number;
    perPage?: number;
    currentPage?: number;
    lastPage?: number;
    hasNextPage?: boolean;
  };
  media: Media[];
}

export const FetchSeasonalAnime = (page: number) => {
  const { season, year } = findSeason()

  const GET_SEASONAL = gql`
    query GetSeasonal($season:MediaSeason!, $year:Int!, $page:Int!) {
        Page(page:$page,perPage:10,){
            pageInfo {
              total
              perPage
              currentPage
              lastPage
              hasNextPage
            }
            media(season:$season, seasonYear: $year,type:ANIME){
              id
              title{
                english
                romaji
              }
                  coverImage {
                    large
                  }
              episodes
            }
          }
    }
  `;

  const { loading, error, data, refetch } = useQuery(GET_SEASONAL, {
    variables: { season: season.toUpperCase(), year, page }
  })


  return { loading, error, data, refetch }
}