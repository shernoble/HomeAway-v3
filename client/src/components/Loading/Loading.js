import ClockLoader from "react-spinners/ClockLoader";

export function Loading(){
    return (
        <div style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
        }}>
            <ClockLoader
                color="#25685b"
                size={80}
            />
        </div>
    );
}

