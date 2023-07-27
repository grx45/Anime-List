import React, { useState, ChangeEvent, useEffect } from "react";
import SubModalLayout from "./SubModalLayout";

function CollectionName() {
    const [inputValue, setInputValue] = useState("");
    const [collections, setCollections] = useState<{ CollectionName: string }[]>([]);

    const MAX_LENGTH = 20;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        // Use the regex pattern to check for special characters
        const regexPattern = /^[a-zA-Z0-9\s]+$/;

        if (inputValue.length <= MAX_LENGTH && regexPattern.test(inputValue)) {
            setInputValue(inputValue);
        }
    };

    const handleButtonClick = () => {
        if (inputValue.trim() !== "") {
            const newCollection = { CollectionName: inputValue.trim() };
            setCollections([...collections, newCollection]);
            setInputValue("");
        }
    };

    useEffect(() => {
        // Retrieve the collections from local storage
        const storedCollections = localStorage.getItem("collections");
        if (storedCollections) {
            setCollections(JSON.parse(storedCollections));
        }
    }, []);

    useEffect(() => {
        // Update the collections in local storage whenever it changes
        localStorage.setItem("collections", JSON.stringify(collections));
    }, [collections]);

    const isDuplicate = collections.some(
        (item) => item.CollectionName.toLowerCase() === inputValue.trim().toLowerCase()
    );

    return (
        <SubModalLayout title="ENTER COLLECTION NAME">
            <input
                className="submodal-input"
                placeholder="Enter Name"
                value={inputValue}
                onChange={handleChange}
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
                Make Collection
            </button>
            {isDuplicate && <p>Collection name already exists!</p>}
        </SubModalLayout>
    );
}

export default CollectionName;
