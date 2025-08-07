export const revalidate = 10;

export default function ISRPage() {
    const time = new Date().toISOString()
    return (
        <div>
            <h1>ISR Page</h1>
            <p>Generated at: {time}</p>
            <p>Changes every 10 seconds</p>
        </div>
    )
}