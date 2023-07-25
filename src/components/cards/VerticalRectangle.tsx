import { useNavigate } from "react-router-dom"
import { shortenString } from "../../helpers/useShortenTitle"


type CardProps = {
    large?: string
    episodes?: number
    english?: string
    romaji?: string
}


function VerticalRectangle({ large, episodes, english, romaji }: CardProps) {
    const navigate = useNavigate()

    return (
        <div className="card-container">
            <img className="cover" src={large} onClick={() => navigate(`/info/${english || romaji}`)} />
            <p className="title" onClick={() => navigate(`/info/${english || romaji}`)}>{english ? shortenString(english) : shortenString(romaji)}</p>
            <span className="episodes">{episodes ? episodes + " Episodes" : "-"}</span>
        </div>
    );
}

export default VerticalRectangle;