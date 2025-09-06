import { useEffect, useState } from "react";

export function useDeviceType() {
    const [deviceType, setDeviceType] = useState("desktop"); // فقط یک مقدار اولیه

    useEffect(() => {
        const checkDevice = () => {
            const ua = navigator.userAgent;
            const isTabletUA = /iPad|Tablet/i.test(ua);
            const isMobileUA = /Mobi|Android|iPhone|iPod/i.test(ua);

            if (isTabletUA || (window.innerWidth >= 768 && window.innerWidth < 1024)) {
                setDeviceType("tablet");
            } else if (isMobileUA || window.innerWidth < 768) {
                setDeviceType("mobile");
            } else {
                setDeviceType("desktop");
            }
        };

        checkDevice();
        window.addEventListener("resize", checkDevice);
        return () => window.removeEventListener("resize", checkDevice);
    }, []);

    return deviceType;
}