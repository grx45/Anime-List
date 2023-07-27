import { useState } from 'react'
import { BsPlus, BsChevronDown, BsChevronUp } from 'react-icons/bs'
import { useModal } from '../../context/ModalContext'

type AccordionProps = {
    title: string
}

function CollectionAccordion({ title }: AccordionProps) {

    const [isOpen, setIsOpen] = useState(false)
    const { setIsModalOpen, isModalOpen } = useModal()

    return (
        <div className={`Accordion-container ${isOpen ? "active" : ""}`} style={{ flexDirection: "row" }} >
            <div className="button-group">
                <div onClick={() => setIsModalOpen(!isModalOpen)} className="add-button" >
                    <BsPlus className="icon" />
                    {title}
                </div>
                {
                    isOpen === false ? (
                        <button className='Accordion-expand' onClick={() => setIsOpen(!isOpen)}><BsChevronDown /></button>
                    ) : (
                        <button className='Accordion-expand' onClick={() => setIsOpen(!isOpen)}><BsChevronUp /></button>
                    )
                }
            </div>
            <h1>content</h1>

        </div>

    );
}

export default CollectionAccordion;
