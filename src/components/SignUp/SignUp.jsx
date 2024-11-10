import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../../firebase.init";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";


const SignUp = () => {
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const handleSignUp = e => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        const terms = e.target.terms.checked;
        console.log(email, password, terms);

        // Clear the message
        setErrorMessage('');
        setSuccess(false);

        if(!terms){
            setErrorMessage('Please accept terms and conditions to proceed');
            return;
        }

        if (password.length < 6) {
            setErrorMessage('Password should be 6 characters or longer');
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!passwordRegex.test(password)) {
            setErrorMessage('Required: At least one uppercase, one lowercase, one number, one special character');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess(true)

                // send verification mail
                sendEmailVerification(auth.currentUser)
                .then(() => {
                    console.log('verification email sent')
                })

            })
            .catch(error => {
                console.log('ERROR', error.message);
                setErrorMessage(error.message);
                setSuccess(false);
            })
    }


    return (
        <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
            <h1 className="text-2xl ml-4  font-bold">Sign Up now!</h1>
            <form onSubmit={handleSignUp} className="card-body">
            {/* Email  */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                </div>
            {/* Password  */}
                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="password"
                        className="input input-bordered" required />
            {/* Show Password  */}
                    <button type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="btn btn-xs absolute right-2 top-12">
                        {
                            showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                        }
                    </button>
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label justify-start cursor-pointer gap-3">
                        <input type="checkbox" name="terms" className="checkbox" />
                        <span className="label-text">Accept our terms and conditions.</span>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Sign Up</button>
                </div>
            </form>
            {
                errorMessage && <p className="text-red-600">{errorMessage}</p>
            }
            {
                success && <p className="text-green-600">Account Successfully Created</p>
            }

            <p className="text-center m-2">Already have an account? <Link className="text-green-300 font-bold" to={'/login'}>Login</Link></p>
        </div>
    );
};

export default SignUp;