function NoMovies() {
    return (
        <div
            style={{
                background: "#1e1e1e",
                border: "1px solid #2a2a2a",
                borderRadius: "16px",
                width: "100%",
                maxWidth: "1200px",
                margin: "auto",
                textAlign: "center",
                marginTop: "50px",
                display: "flex",

                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                padding: "16px 20px",
                boxShadow: `0 4px 10px rgba(0, 0, 0, 0.5),
        0 0 0 1px rgba(255, 255, 255, 0.06)`,
            }}
        >
            <h1>There is nothing here 🌵🌵.</h1>
            <h3>Go watch a movie and come back 😎.</h3>
        </div>
    );
}

export default NoMovies;
