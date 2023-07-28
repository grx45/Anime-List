import React, { useState } from "react";
import SubModalLayout from "./SubModalLayout";
import defaultImage from "../../assets/blank.png"

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
    closeFunction: () => void
}

function NewNameModal({ title, coverImage, collections, setCollections, closeFunction }: CollectionNameProps) {
    const [inputValue, setInputValue] = useState("");

    const MAX_LENGTH = 20;

    const handleButtonClick = () => {


        if (inputValue.trim() !== "") {
            const newCollection = {
                CollectionName: inputValue.trim(),
                CollectionImage: coverImage || defaultImage,
                Content: [{ Name: title, Image: coverImage }]
            };

            setCollections([...collections, newCollection]);

            let copyOfCollections = [...collections, newCollection]
            setInputValue("");
            localStorage.setItem("collections", JSON.stringify(copyOfCollections));
            closeFunction()
        }
    };

    const isDuplicate = collections.some(
        (item) => item?.CollectionName?.toLowerCase() === inputValue.trim().toLowerCase()
    );

    return (
        <SubModalLayout title="ENTER COLLECTION NAME">
            <input
                className="submodal-input"
                placeholder="Enter Name"

                onChange={(event) => setInputValue(event.target.value)}
            />
            <span className="input-count">
                {inputValue.length}/{MAX_LENGTH}
            </span>
            <button
                disabled={
                    inputValue.length === 0 ||
                    inputValue.trim() === "" ||
                    inputValue.length > MAX_LENGTH ||
                    !/^[a-zA-Z0-9\s]+$/.test(inputValue) ||
                    isDuplicate
                }
                onClick={handleButtonClick}
                className="submit-collection"
            >
                Create
            </button>
            {isDuplicate && <p>Collection name already exists!</p>}
        </SubModalLayout>
    );
}

export default NewNameModal;
