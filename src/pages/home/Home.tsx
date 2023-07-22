import { useQuery, gql } from "@apollo/client";
import { useNavigate } from 'react-router-dom'

function Home() {

    const navigate = useNavigate()

    interface Media {
        id: number;
        title: {
            romaji: string;
            english: string;
            native: string;
        };
    }

    interface QueryData {
        Media: Media;
    }

    const GET_LOCATIONS = gql`
    query GetLocations {
      Media(id: 30013) {
        id
        title {
          romaji
          english
          native
        }
      }
    }
  `;

    function DisplayData() {
        const { loading, error, data } = useQuery<QueryData>(GET_LOCATIONS);

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;

        const anime: Media | undefined = data?.Media;

        return (
            <div>
                <h3>Id:{anime?.id}</h3>
                <h3>Title (eng): {anime?.title?.english}</h3>
                <h3>Title (rom): {anime?.title?.romaji}</h3>
                <h3>Title (native): {anime?.title?.native}</h3>
                <h1 onClick={() => navigate(`/mediapage/${anime?.title?.english}`)}>click here ... </h1>
            </div>
        );
    }

    return (
        <div>
            <DisplayData />
        </div>
    );
}

export default Home;