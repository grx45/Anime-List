import { useNavigate } from 'react-router-dom'
import { findSeason } from "../../helpers/useFindSeason";
import { FetchSeasonalAnime, Media } from "../../hooks/useFetchSeasonalAnime";
import VerticalRectangle from '../../components/cards/VerticalRectangle';
import VerticalRectangleSkeleton from '../../components/skeleton/VerticalRectangleSkeleton';
import { useState } from 'react'



function Home() {
    const navigate = useNavigate()
    const { season, year } = findSeason()

    const [currentPage, setCurrentPage] = useState(1)

    function SeasonalAnime() {
        const { loading, error, data, refetch } = FetchSeasonalAnime(currentPage);

        if (loading) {
            const skeletonArray = Array.from({ length: 10 }, (_, index) => (
                <VerticalRectangleSkeleton key={index} />
            ));
            return <div className='list-container' > {skeletonArray}</div >;
        }

        if (error) return <p>Error: {error.message}</p>;

        console.log("asdads", data)
        const { Page: { media } } = data;

        return (
            <>
                <div className='list-container'>
                    {
                        media.map((val: Media) => {
                            return (
                                <VerticalRectangle key={val.id} large={val?.coverImage?.large} episodes={val?.episodes} english={val?.title?.english} romaji={val?.title?.romaji} />
                            )
                        })

                    }
                </div>
                <div>Pagination component put here</div>
            </>
        )
    }

    return (
        <div>
            <h3 className="headers">{season} {year} Anime</h3>
            <SeasonalAnime />
        </div>
    );
}

export default Home;