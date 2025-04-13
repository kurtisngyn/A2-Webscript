import React, { useState } from 'react';

function SignUp() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        fetch("http://localhost:3000/users/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password
            })
        })
        .then(response => response.json())
        .then(returnedJSON => {
            console.log(returnedJSON);
        });
    };

    return (
        <main>
            <div>
                <div>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                required
                                onChange={(event) => {
                                    setFormData({ ...formData, email: event.target.value });
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                required
                                onChange={(event) => {
                                    setFormData({ ...formData, password: event.target.value });
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm-password"
                                name="confirm-password"
                                placeholder="Retype Password"
                                onChange={(event) => {
                                    setFormData({ ...formData, confirmPassword: event.target.value });
                                }}
                            />
                        </div>
                        <input type="submit" value="Register" />
                    </form>
                </div>
            </div>
        </main>
    );
}

export default SignUp;
