import { useNavigate } from 'react-router-dom'
import { findSeason } from "../../helpers/useFindSeason";
import { FetchSeasonalAnime, Media } from "../../hooks/useFetchSeasonalAnime";
import VerticalRectangle from '../../components/cards/VerticalRectangle';
import VerticalRectangleSkeleton from '../../components/skeleton/VerticalRectangleSkeleton';
import { useState, useEffect } from 'react'
import Pagination from '../../components/pagination/Pagination';



function Home() {
    const navigate = useNavigate()
    const { season, year } = findSeason()
    const itemsPerPage = 10
    const [currentPage, setCurrentPage] = useState<number>(1)
    const { loading, error, data: SeasonalAnimeData, refetch } = FetchSeasonalAnime(currentPage, itemsPerPage);
    const media = SeasonalAnimeData?.Page?.media;
    const pageInfo = SeasonalAnimeData?.Page?.pageInfo;

    function SeasonalAnime() {
        if (loading) {
            const skeletonArray = Array.from({ length: 10 }, (_, index) => (
                <VerticalRectangleSkeleton key={index} />
            ));
            return skeletonArray;
        }

        if (error) return <p>Error: {error.message}</p>;

        return media.map((val: Media) => {
            return (
                <VerticalRectangle key={val.id} large={val?.coverImage?.large} episodes={val?.episodes} english={val?.title?.english} romaji={val?.title?.romaji} />
            )
        })
    }

    function handlePageChange(pageNumber: { selected: number }) {
        setCurrentPage(pageNumber.selected + 1);
    }

    useEffect(() => {
        refetch();
        window.scrollTo(0, 0)
    }, [currentPage])

    return (
        <div>
            <div className='list-container'>
                <h3 className="headers">{season} {year} Anime</h3>
                <SeasonalAnime />
            </div>
            <div className='pagination-container'>
                <Pagination handlePageChange={handlePageChange} size={itemsPerPage} totalData={82} />
            </div>
        </div>
    );
}

export default Home;