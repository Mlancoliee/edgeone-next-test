export default function SSGPage() {
    const time = new Date().toISOString()
    return (
        <div>
            <h1>SSG Page</h1>
            <p>Generated at: {time}</p>
            <p>static</p>
        </div>
    )
}