// ... code trước đó
import { Trash } from '@phosphor-icons/react';
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
const RightClickMenu = ({ children, setOnDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleContextMenu = (e) => {
        e.preventDefault();
        setPosition({ x: e.pageX, y: e.pageY }); // Lưu vị trí chuột click
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleDelete = () => {
        setOnDelete(false);
    };

    return (
        <>
            <div onContextMenu={handleContextMenu} className="relative">
                {children}
                <Popup
                    open={isOpen}
                    closeOnDocumentClick
                    onClose={handleClose}
                    contentStyle={{
                        padding: '0.5rem',
                        position: 'absolute',
                        top: position.y,
                        left: position.x + 50, // Xác định khoảng cách từ children sang phải popup
                    }}
                >
                    <div
                        className="settings-popup"
                        style={{
                            width: "300px",
                            height: "400px",
                            backgroundColor: "white",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            padding: "20px",
                        }}
                    >
                        <ul>
                            <li
                                className="flex p-[10px] cursor-pointer hover:bg-[#CCCCCC]"
                                onClick={handleDelete}
                            >
                                <Trash size={20} />
                                <div className="pl-10">Delete</div>
                            </li>
                        </ul>
                    </div>
                </Popup>
            </div>
        </>
    );
};

export default RightClickMenu;
