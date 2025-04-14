import { Link } from 'react-router-dom'; // Make sure this is 'react-router-dom' in React apps

function Home() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-white">
            <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md w-full text-center">
                <h1 className="text-4xl font-bold text-green-700 mb-4">Welcome!</h1>
                <h3 className="text-lg text-gray-600 mb-8">wee</h3>
                <div className="flex flex-col gap-4">
                    <Link 
                        to="/sign-up" 
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
                    >
                        Sign Up
                    </Link>
                    <Link 
                        to="/sign-in" 
                        className="border border-green-500 text-green-600 hover:bg-green-50 font-semibold py-2 px-4 rounded-xl transition duration-300"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default Home;
