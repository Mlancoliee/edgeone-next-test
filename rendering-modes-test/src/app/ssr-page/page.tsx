export const dynamic = "force-dynamic";

export default function SSRPage() {
    const time = new Date().toISOString()
    return (
        <div>
            <h1>SSR Page</h1>
            <p>Generated at: {time}</p>
            <p>Changes on every refresh</p>
        </div>
    )
}