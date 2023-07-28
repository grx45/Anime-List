import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react'
import { FetchSingleAnime } from "../../hooks/useFetchSingleAnime";
import { setupAnimeData } from "../../utils/animeUtils";
import { AiOutlineHome, AiOutlineClockCircle, AiFillStar, AiTwotoneCalendar } from 'react-icons/ai'
import { CgStack } from 'react-icons/cg'
import "../../Animepage.css"
import Tags from '../../components/tags/Tags'
import { changeBack } from "../../helpers/AnimePageFunction";
import CollectionAccordion from "../../components/accordion/CollectionAccordion";
import NewCollectionModal from "../../components/modal/NewCollectionModal";
import CollectionName from "../../components/modal/CollectionName"

interface localStorageItems {
    CollectionName?: string;
    CollectionImage?: string;
    Content: { Name?: string; Image?: string }[];
}

function InfoPage() {

    const params = useParams()
    const title = changeBack(params.title)
    const { loading, error, data } = FetchSingleAnime(title)
    const { name, banner, description, cover, lastUpdatedAt, airingDate, score, id, episodes, source, status, studio, genres } = setupAnimeData(data)
    const [collections, setCollections] = useState<localStorageItems[]>([]);
    const [availableIn, setAvailableIn] = useState<any[]>([])

    function printGenres(): any {
        return genres?.map((val, idx) => {
            return (
                <Tags key={idx} tag={val} />
            )
        })
    }

    function getAvailableIn() {
        let copyOfLocalStorage = [...collections];
        let foundArray = [...availableIn];

        copyOfLocalStorage.forEach((arr) => {
            let condition = arr.Content.some((item => item.Name === name))
            if (condition) {
                foundArray.push(arr?.CollectionName)
            }
        })
        setAvailableIn(foundArray)
    }

    useEffect(() => {
        window.scrollTo(0, 0)

        const storedCollections = localStorage.getItem("collections");
        if (storedCollections) {
            setCollections(JSON.parse(storedCollections));
        }
        getAvailableIn()

    }, [])

    return (
        <>
            {
                loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error : {error.message}</p>
                ) : (
                    <>
                        <NewCollectionModal coverImage={cover} title={name} collections={collections} setCollections={setCollections} />
                        <CollectionName coverImage={cover} title={name} collections={collections} setCollections={setCollections} />
                        <div className="banner-section" style={{ backgroundImage: `url(${banner})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "50% 0%" }}>
                            <div className="gradient-overlay"></div>
                        </div>
                        <div className="container header">
                            <div className="image-container">
                                <img src={cover} alt="cover" />
                            </div>

                            <div className="info-section">
                                <h3 className="anime-heading">{name}</h3>
                                <div>
                                    <AiOutlineHome className="icon" />
                                    <p>{studio}</p>
                                </div>
                                <div>
                                    <AiOutlineClockCircle className="icon" />
                                    <p>{status}</p>
                                </div>
                                <div>
                                    <AiFillStar className="star icon" />
                                    {score ? <p> {score}/ 5.0</p> : <p> REVIEWS_PENDING</p>}
                                </div>
                                <div>
                                    <AiTwotoneCalendar className="icon" />
                                    {airingDate}
                                </div>
                                <div>
                                    <CgStack className="icon" />
                                    {
                                        episodes == "-" ? (<p >{episodes}</p>) : (<p >{episodes} Episodes</p>)
                                    }
                                </div>
                                <div>
                                    <CgStack className="icon" style={{ visibility: "hidden" }} />
                                    <p style={{ position: "absolute", marginLeft: "10px" }}><span style={{ marginRight: "10px" }}>Source:</span>{source} </p>
                                </div>
                                <div className="big-media">
                                    <div className="genre-list">
                                        {printGenres()}
                                    </div>
                                    {description && (
                                        <div >
                                            <div className="description" dangerouslySetInnerHTML={{ __html: description }} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <CollectionAccordion title="Add to Collection" availableIn={availableIn} />

                        <div className="container mobile-section">
                            <div className="genre-list">
                                {printGenres()}
                            </div>
                            {/* <div className="collection-container" >
                                <div className="collection-button">
                                    <BsPlus className="icon" />
                                    Add to Collections

                                </div>

                            </div> */}
                            {description && (
                                <div className="description">
                                    <div dangerouslySetInnerHTML={{ __html: description }} />
                                </div>
                            )}
                        </div>

                        <div className="container" style={{ marginTop: "40px", marginBottom: "40px" }} >
                            Additional Info Pending
                        </div>
                    </>
                )
            }
        </>
    );
}

export default InfoPage;