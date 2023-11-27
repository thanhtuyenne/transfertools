import React from "react";

function Button({title}) {
    return (  
        <button className="bg-blue border-transparent rounded-md text-white p-2 text-sm font-bold w-24 hover:w-28 transition-all">
            {title}
        </button>
    );
}

export default Button;