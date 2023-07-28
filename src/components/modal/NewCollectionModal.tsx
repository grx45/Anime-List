import ModalLayout from "./ModalLayout";
import defaultImage from '../../assets/collection.png'
import { useSubModal } from "../../context/SubModalContext";
import { useModal } from "../../context/ModalContext";

interface localStorageItems {
    CollectionName?: string;
    CollectionImage?: string;
    Content: { Name?: string; Image?: string }[];
}

interface CollectionNameProps {
    title?: string;
    coverImage?: string;
    collections: localStorageItems[];
    setCollections: React.Dispatch<React.SetStateAction<localStorageItems[]>>;
}


function NewCollectionModal({ collections, setCollections, title, coverImage }: CollectionNameProps) {
    const { isSubModalOpen, setIsSubModalOpen } = useSubModal()
    const { setIsModalOpen } = useModal()

    function makeNewCollection() {
        setIsModalOpen(false)
        setIsSubModalOpen(!isSubModalOpen)
    }

    function addItemToCollection(idx: any,) {
        const targetCollection = collections[idx];

        // Check if the title already exists in the Content array
        const isTitleExist = targetCollection.Content.some((item) => item.Name === title);

        if (isTitleExist) {
            alert('Title already exists in the collection!');
        } else {
            const newItem = { Name: title, Image: coverImage };
            targetCollection.Content.push(newItem);

            // Create a new array with the updated collection
            const copyOfCollections = [...collections];
            copyOfCollections[idx] = targetCollection;

            // Update the state with the updated array
            setCollections(copyOfCollections);
            localStorage.setItem("collections", JSON.stringify(collections));
            setIsModalOpen(false)
        }

    }

    function printCollections() {
        if (collections) {
            return collections.map((val, idx) => {
                return (
                    <div key={idx} className='add-collection' onClick={() => addItemToCollection(idx)}>
                        <div className='collection-image-container'>
                            <img src={val?.CollectionImage ? (val?.CollectionImage) : (defaultImage)} alt="collection-mage" />
                        </div>
                        <p>{val.CollectionName}  </p>
                        <p>( {val.Content.length} items )</p>
                    </div>
                )
            })
        }
    }

    return (
        <ModalLayout title="ADD NEW COLLECTION">
            <div className='add-collection' onClick={makeNewCollection}>
                <div className='collection-image-container'>
                    <img src={defaultImage} alt="collection-mage" />
                </div>
                <p >+ New Collection</p>
            </div>
            {printCollections()}
        </ModalLayout>
    );
}

export default NewCollectionModal;