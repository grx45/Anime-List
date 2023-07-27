import ModalLayout from "./ModalLayout";
import defaultImage from '../../assets/collection.png'
import { useSubModal } from "../../context/SubModalContext";
import { useModal } from "../../context/ModalContext";

function NewCollectionModal() {
    const { isSubModalOpen, setIsSubModalOpen } = useSubModal()
    const { setIsModalOpen } = useModal()

    function newCollectionButton() {
        setIsModalOpen(false)
        setIsSubModalOpen(!isSubModalOpen)

    }
    return (
        <ModalLayout title="ADD NEW COLLECTION">
            <div className='add-collection'>
                <div className='collection-image-container'>
                    <img src={defaultImage} alt="collection-mage" />
                </div>
                <p onClick={newCollectionButton}>+ New Collection</p>
            </div>

            {/* map colllections here */}
        </ModalLayout>
    );
}

export default NewCollectionModal;