export default function About() {

    return (
        <div style={{ maxWidth: 600, margin: "80px auto" }}>
            <h1>About</h1>
            <p>This is a React + Flask + Docker application for SummitHack 2026.</p>
            <p>Built with modern web technologies and containerized for easy deployment.</p>

            <h2>Features</h2>
            <ul>
                <li>React frontend with client-side routing</li>
                <li>Flask backend API</li>
                <li>Docker containerization</li>
                <li>Nginx reverse proxy</li>
            </ul>
        </div>
    );
}