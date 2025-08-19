import React from "react";

const Logout = ({ message, onConfirm, onCancel }) => {
    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                textAlign: "center",
                maxWidth: "300px",
                width: "90%"
            }}>
                <p>{message}</p>
                <div style={{ marginTop: "20px" }}>
                    <button
                        onClick={onConfirm}
                        style={{
                            marginRight: "10px",
                            padding: "10px 20px",
                            backgroundColor: "#4CAF50",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                            marginLeft:"5px"
                        }}
                    >
                        بله
                    </button>
                    <button
                        onClick={onCancel}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#f44336",
                            color: "white",
                            border: "none",
                            cursor: "pointer"
                        }}
                    >
                        خیر
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Logout;