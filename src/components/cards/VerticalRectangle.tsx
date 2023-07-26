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

    function handleLinkClick(url: string) {
        let replacedString = url.replaceAll(" ", "%")
        navigate(replacedString);
    }

    return (
        <div className="card-container">
            <img className="cover" src={large} onClick={() => handleLinkClick(`/info/${english || romaji}`)} />
            <p className="title" onClick={() => handleLinkClick(`/info/${english || romaji}`)}>{english ? shortenString(english) : shortenString(romaji)}</p>
            <span className="episodes">{episodes ? episodes + " Episodes" : "-"}</span>
        </div>
    );
}

export default VerticalRectangle;