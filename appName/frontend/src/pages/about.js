// export default function About() {

//     return (
//         <div style={{ maxWidth: 600, margin: "80px auto" }}>
//             <h1>About</h1>
//             <p>This is a React + Flask + Docker application for SummitHack 2026.</p>
//             <p>Built with modern web technologies and containerized for easy deployment.</p>

//             <h2>Features</h2>
//             <ul>
//                 <li>React frontend with client-side routing</li>
//                 <li>Flask backend API</li>
//                 <li>Docker containerization</li>
//                 <li>Nginx reverse proxy</li>
//             </ul>
//         </div>
//     );
// }

export default function About() {
    return (
        <div style={{ maxWidth: 600, margin: "80px auto", lineHeight: 1.7, fontFamily: "sans-serif" }}>
            <h1>About</h1>
            <p>
                Your dishwasher is a bigger pollutant at 6:17pm than it is at midnight. It's not 
                broken — it's how the electric grid works. At peak hours, fossil fuel plants ramp
                up to meet the needs of the grid. At other times, surplus renewable energy goes 
                to waste. PowerCueue tells you when to run your heavy appliances so they use that 
                clean energy instead.
            </p>

            <h2>How it works</h2>
            <p>
                Every five minutes, the electric grid emits different carbon intensity levels depending on
                which power plants are actively generating electricity. We pull that data in real time
                from <a href="https://watttime.org" target="_blank" rel="noreferrer">WattTime</a>, a
                nonprofit that tracks marginal grid emissions across the US. When the grid is running
                on surplus renewables — and the marginal carbon intensity drops to zero — we flag that
                as the ideal window to run your clothes washer, dryer, dishwasher, oven, HVAC, water
                heater, or charge your EV.
            </p>

            <h2>How your savings are calculated</h2>
            <p>
                We assume you follow the suggestions and run your heavy appliances during the cleanest
                available window each day. We compare that against what a typical person in your grid
                region would emit running the same appliances at random times throughout the day —
                using the regional average carbon intensity as the baseline.
            </p>
            <p>
                Appliance energy consumption is based on US national averages, meaning we don't track
                your devices or connect to your home systems. Your savings are an estimate, not a 
                verified measurement but they're based in real grid data and averages.
            </p>

            <h2>What the health impact number means</h2>
            <p>
                Carbon emissions aren't the only harm from fossil fuel power plants. They also emit
                sulfur dioxide, nitrogen oxides, and fine particulate matter — pollutants that affect
                people living downwind, contributing to asthma, heart disease, and premature death.
                WattTime's health damage signal estimates the real-world harm of electricity use in
                dollar terms, based on the number of people affected and the value of a statistical
                life used by the US EPA. The health impact figure we show you represents that harm
                avoided by shifting your usage to cleaner windows.
            </p>

            <h2>What we don't do</h2>
            <p>
                We don't track your actual behavior, connect to your devices, or store any personal
                energy data. All calculations are based on grid data for your region and fixed
                appliance averages — nothing is specific to your household.
            </p>

            <h2>Data</h2>
            <p>
                Grid emissions data provided by <a href="https://watttime.org" target="_blank" rel="noreferrer">WattTime</a>.
            </p>

            <p style={{ marginTop: 40, color: "#888", fontSize: 14 }}>
                Built for SummitHack 2026.
            </p>
        </div>
    );
}
