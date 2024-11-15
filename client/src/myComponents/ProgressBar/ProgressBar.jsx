import React from "react";
import { Progress } from "@nextui-org/react";

export default function ProgressBar() {
    const [value, setValue] = React.useState(0);

    React.useEffect(() => {
        if (value < 100) {
            const interval = setInterval(() => {
                setValue((v) => (v >= 100 ? 0 : v + 10));
            }, 500);

            return () => clearInterval(interval);
        }
    }, [value]);

    return (
        <>
            <div className="min-h-screen absolute w-full bg-black opacity-80 z-[50]">
            </div>
            <div className="w-full flex flex-col absolute justify-center items-center min-h-screen z-[51] text-white">
                <Progress
                    aria-label="Uploading..."
                    size="md"
                    value={value}
                    color="success"
                    showValueLabel={true}
                    className="max-w-md"
                />
                <p className="mt-3 animate-pulse">Uploading Please Wait...</p>
            </div>
        </>
    );
}
