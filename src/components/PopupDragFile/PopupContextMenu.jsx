import { Trash } from '@phosphor-icons/react';
import React, { useState } from 'react';
import Popup from 'reactjs-popup';

// Component sử dụng Popup để tạo menu ngữ cảnh khi click chuột phải
const RightClickMenu = ({ children,setOnDelete}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleContextMenu = (e) => {
        e.preventDefault(); // Ngăn chặn hành động mặc định của chuột phải
        setPosition({ x: e.pageX, y: e.pageY }); // Lưu vị trí chuột click
        setIsOpen(true); // Mở menu ngữ cảnh
    };

    const handleClose = () => {
        setIsOpen(false); // Đóng menu ngữ cảnh khi click ra ngoài menu
    };

    const handleDelete = ()=>{
        setOnDelete(false)
    }

    return (
        <div onContextMenu={handleContextMenu}>
            <Popup
                open={isOpen}
                closeOnDocumentClick
                onClose={handleClose}
                contentStyle={{ padding: '0.5rem' }}
                offsetX={position.x}
                offsetY={position.y}
            // arrowStyle={{
            //     color: 'red',
            //     width: '30px',
            //     bottom: 0,
            //     right: '-10px',
            // }}
            >
                <div
                    className="settings-popup"
                    style={{
                        position: "absolute",
                        // top: "50%",
                        // left: "50%",
                        // transform: "translate(-50%, -50%)",
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
            {children}
        </div>
    );
};

export default RightClickMenu;
