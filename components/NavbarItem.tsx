import React from "react";

interface NavbarItemProps {
    label: string;
}

// Custom component to create label for the Navigation Bar
const NavbarItem: React.FC<NavbarItemProps> = ({label}) => {

    return (
        <div className="text-white cursor-pointer hover:text-gray-300 transition">
            {label}
        </div>
    )
}

export default NavbarItem