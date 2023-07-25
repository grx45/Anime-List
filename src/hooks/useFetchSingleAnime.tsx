import { gql, useQuery } from "@apollo/client";

export const FetchSingleAnime = (title: string | undefined) => {

  const GET_ANIME = gql`
    query GetAnime($title:String!) {
        Media(search:$title,type:ANIME){
            id
            title{
              english
              romaji
            }
            averageScore
            studios(isMain:true) {
              nodes{
                name
              }
            }
            source
            tags {
              name
            }
            updatedAt
            startDate {
              year
              month
              day
            }
            status
            episodes
            description
            genres
            coverImage {
              large
              extraLarge
            }
            bannerImage 
            }
    }
    `;

  const { loading, error, data } = useQuery(GET_ANIME, {
    variables: { title: title }
  })


  return { loading, error, data }
}