import React, {
    useState,
    useRef,
    useMemo,
    useLayoutEffect,
    useContext,
    useImperativeHandle,
    useTransition,
} from "react";
import PopupDragFile from "../PopupDragFile/PopupDragFile";
import {
    Eraser,
    Trash,
    DotsThreeOutlineVertical,
    XCircle,
} from "@phosphor-icons/react";
import { useEffect } from "react";
import ContextMenu from "./ContextMenu";
import { Popup } from "reactjs-popup";
import InputOption from "../Navbar/InputOption";
import { useDispatch, useSelector } from "react-redux";
import { onClickImage } from "../../redux/clickImageSlice";
import { onClickDelete } from "../../redux/clickDeletefile";
import { BoxContext, useBoxContext } from "../Whitespace/Element";
import { blobToFile, createName_Blob } from "../../Utils/helpers";

function MediaBase({
    IconComp,
    placeholder: placeholderText,
    accept,
    children,
    childRef,
    handleRef,
}) {
    const { handleBoxChange } = useBoxContext();
    const [popup, setShowPopup] = useState(false);
    const [showPlaceholder, setShowPlaceholder] = useState(false);
    const [file, setFile] = useState(null);
    const [rightClick, setRightClick] = useState(false);
    const [isPending, startTransition] = useTransition();
    function getFileType(file) {
        // Use the file.type property and match it with regular expressions
        if (file.type.match("image.*")) return "image";
        if (file.type.match("video.*")) return "video";
        if (file.type.match("audio.*")) return "audio";
        // If none of the above matches, return "other"
        return "other";
    }
    const selectDataImage = useSelector((state) => state.clickSelect.data);

    const handleSetFile = (file) => {
        startTransition(() => {
            setFile((old) => {
                children.ref.current.removeAttribute("src");
                return file;
            });
        });
    };

    useEffect(() => {
        setShowPlaceholder(file == null);
        handleBoxChange(file, file != null);
        if (file && children.ref.current.src === "")
            children.ref.current.src = URL.createObjectURL(file);
    }, [file]);

    let removeRef = useRef();
    // const mediaRef = useRef();
    const handleRightClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setRightClick(true);
    };

    const removeInput = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setFile(null);
        children.ref.current.removeAttribute("src");
        handleBoxChange(null, false);
        setRightClick(false);
    };

    const closeContext = () => {
        setRightClick(false);
    };
    const dispatch = useDispatch();
    const handleClickDelete = () => {
        dispatch(onClickDelete());
    };

    useEffect(() => {
        if (children && children.ref) {
            const { ref } = children;
            const shouldDisplay = file != null;
            if (ref.current) {
                ref.current.style.display = shouldDisplay ? "block" : "none";
            }
        }
    }, [file, children, showPlaceholder]);
    document.addEventListener("mousedown", closeContext);
    useImperativeHandle(
        handleRef,
        () => {
            return {
                setInput(file) {
                    if (!file) {
                        throw new Error('Please choose a file');
                    }

                    var fileNameParts = file.name.split('.');
                    var fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();

                    if (!accept.includes(fileExtension)) {
                        throw new Error('Invalid file type. Allowed types: ' + accept.join(', '));
                    }

                    handleSetFile(file);
                }
            };
        },
        []
    );
    return (
        <>
            <div
                className="touch-none cursor-pointer w-full h-full bg-white border-blue border-2 rounded-md inline-flex items-center overflow-hidden p-[11px]"
                onDoubleClick={() => setShowPopup(true)}
            >
                <IconComp size={25} className="text-blue mr-2 shrink-0 flex-0" />
                <div
                    className="relative outline-none border-0 border-none focus:ring-0 h-full flex items-center justify-center flex-1"
                    onContextMenu={(e) => handleRightClick(e)}
                >
                    {children}
                    {showPlaceholder ? (
                        <span className="text-black w-full text-center">
                            {placeholderText}
                        </span>
                    ) : null}
                    {file != null && rightClick && (
                        <>
                            <div
                                ref={removeRef}
                                onClick={(e) => removeInput(e)}
                                className="rounded-md items-center justify-around w-[150px] border-black bg-red-600 h-[40px] absolute bottom-0 right-0 flex transition-[0.25s] animate-blur-option"
                            >
                                <Eraser size={18} color="white" className="" />
                                <span>Remove file</span>
                            </div>
                            <ContextMenu
                                contextMenuRef={removeRef}
                                callback={closeContext}
                            ></ContextMenu>
                        </>
                    )}
                </div>
                <div className="absolute right-0 top-0 transition-[0.25s] font-bold flex flex-col bg-[#3498DB] rounded-bl-[15px] p-1 ">
                    <div
                        className="flex items-center justify-center cursor-pointer"
                        onClick={handleClickDelete}
                        onTouchStart={handleClickDelete}
                    >
                        <XCircle size={22} color="white" />
                    </div>
                </div>
            </div>
            {popup && (
                <div className="fixed top-0 left-0 w-full h-full">
                    <PopupDragFile
                        toggle={setShowPopup}
                        accepts={accept}
                        fileOutput={handleSetFile}
                    />
                </div>
            )}
        </>
    );
}

export default MediaBase;
