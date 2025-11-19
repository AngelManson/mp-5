
export default function Header(){
    return (
        <header className={`flex w-full flex-col justify-between items-center p-4 bg-green-200`}>
            <h1 className={`text-center font-extrabold text-3xl`}>The URL Shortener</h1>
            <p className={`text-center`}>Use This To Shorten Your Urls!</p>
        </header>
    );
}