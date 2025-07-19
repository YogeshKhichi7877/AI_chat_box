import React, { useEffect, useState } from "react";

const OfflineAlert = () => {
  const [offline, setOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const goOnline = () => setOffline(false);
    const goOffline = () => setOffline(true);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  if (!offline) return null;
  // You can style this as a pop-up, toast, or banner.
  return (
    <div
      className="fixed z-50 top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded shadow-lg animate-bounce"
      role="alert"
    >
      ⚠️ You are currently <b>offline</b>. <br/> <b>AI Chat Box</b> will not be able to answer your questions.
    </div>
  );
};

export default OfflineAlert;
