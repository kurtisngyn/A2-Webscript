import { Link } from 'react-router';


function Home() {
    return (
        <main>
            <div>
                <div>
                    <h1>Welcome!</h1>
                    <h3>wee</h3>
                    <div>
                        <Link to="/sign-up">Sign Up</Link>
                        <Link to="/sign-in">Sign In</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Home;
