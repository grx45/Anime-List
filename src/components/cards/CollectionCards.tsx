import { BsTrash3 } from 'react-icons/bs'
import { useSubModal } from '../../context/SubModalContext';
import { useNavigate } from 'react-router-dom';

interface CollectionCardsProps {
    cardName?: string;
    image?: string;
    setToDelete: React.Dispatch<React.SetStateAction<string | undefined>>;
    onDeleteClick: (modalType: string) => void
}


function CollectionCards({ cardName, image, setToDelete, onDeleteClick }: CollectionCardsProps) {

    const navigate = useNavigate()

    function onBtClick(): void {
        onDeleteClick("delete")
        setToDelete(cardName)
    }


    return (
        <div className="collection-card-container no-border" >
            <img src={image} alt='card-cover' />
            <button onClick={onBtClick} ><BsTrash3 style={{ color: "black" }} className='icon' /></button>
            <h2 onClick={() => navigate(`/collections/info/${cardName}`)}>{cardName}</h2>

        </div>
    );
}

export default CollectionCards;