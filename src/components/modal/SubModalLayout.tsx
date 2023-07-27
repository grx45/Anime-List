import { useSubModal } from '../../context/SubModalContext'
import { ReactNode, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai'

interface SubModalLayoutProps {
    children: ReactNode;
    title: string
}

function SubModalLayout({ children, title }: SubModalLayoutProps) {

    const { isSubModalOpen, setIsSubModalOpen } = useSubModal()

    return (
        <>
            <div className={`submodal-overlay ${isSubModalOpen ? "active" : ""}`} onClick={() => setIsSubModalOpen(!isSubModalOpen)} />
            <div className={`submodal ${isSubModalOpen ? "active" : ""}`}>
                <div className="submodal-box">
                    <div className='submodal-header-container'>
                        <span>{title}</span>
                        <AiOutlineClose className='close' style={{ fontSize: "30px" }} onClick={() => setIsSubModalOpen(false)} />
                    </div>
                    <div className='submodal-content'>
                        {children} {/* content sohuld be customisable */}
                    </div>

                </div>
            </div>
        </>
    );
}

export default SubModalLayout;