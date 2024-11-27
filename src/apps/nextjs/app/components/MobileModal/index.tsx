import {useEffect, useState} from "react";
import {NauSea} from "@/app/fonts/fonts";

export default function MobileModal() {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => setIsOpen(false);
    useEffect(() => {
        // Delay the modal appearance by 2 seconds
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 5000);

        // Cleanup the timeout on component unmount
        return () => clearTimeout(timer);
    }, []);
  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fadeIn">
        {/* Modal Box */}
        <div className="bg- bg-yellow-800 shadow-lg w-11/12 max-w-sm p-6 text-center rounded-lg">
          <h2 className={`${NauSea.className} "text-xl font-semibold tracking-[1px] text-white"`}>Welcome to SolanaSpin!</h2>
          <p className="text-white mt-2 ">
              For the best experience, we recommend using a desktop screen.
          </p>
          {/*<button*/}
          {/*  onClick={closeModal}*/}
          {/*  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"*/}
          {/*>*/}
          {/*  Got It*/}
          {/*</button>*/}
        </div>
      </div>
    )
  );
}
