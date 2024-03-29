import React from "react"

interface MobileMenuProps {
    visibile?: boolean
}

const MobileMenu: React.FC<MobileMenuProps> = ({visibile}) => {

  // If the visible property is set to false (if it is not true), then return nothing
  if(!visibile) {
    return null;
  }

  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex">
        <div className="flex flex-col gap-4">
            <div className="px-3 text-center text-white hover:underling">
                Home
            </div>
            <div className="px-3 text-center text-white hover:underling">
                Series
            </div>
            <div className="px-3 text-center text-white hover:underling">
                Films
            </div>
            <div className="px-3 text-center text-white hover:underling">
                New & Popular
            </div>
            <div className="px-3 text-center text-white hover:underling">
                My List
            </div>
            <div className="px-3 text-center text-white hover:underling">
                Browse by languages
            </div>
        </div>
    </div>
  )
}

export default MobileMenu