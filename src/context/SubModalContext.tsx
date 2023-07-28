import React, { createContext, useContext, useState } from 'react';

interface SubModalContextType {
    isSubModalOpen: boolean;
    setIsSubModalOpen: (isOpen: boolean) => void;
}

const SubModalContext = createContext<SubModalContextType | undefined>(undefined);

export function useSubModal() {
    const context = useContext(SubModalContext);
    if (!context) {
        throw new Error('useSubModal must be used within a ModalProvider');
    }
    return context;
}

export function SubModalProvider({ children }: { children: React.ReactNode }) {
    const [isSubModalOpen, setIsSubModalOpen] = useState(false);

    return (
        <SubModalContext.Provider value={{ isSubModalOpen, setIsSubModalOpen }}>
            {children}
        </SubModalContext.Provider>
    );
}