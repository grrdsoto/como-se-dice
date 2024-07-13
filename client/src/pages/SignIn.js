import React, { useState } from "react";
import { NavLink } from "react-router-dom";

/**
 * Sign in page. Will ask the user to input their email and password and it'll try to sign them into the game.
 *
 * @returns Sign in page.
 */
function SignIn() {
  // Instantiate the email state.
  const [email, setEmail] = useState("");
  // Instantiate the password state.
  const [password, setPassword] = useState("");
  // Instantiate the alert state, which will be used to show the user if their email and password do not match.
  const [alert, setAlert] = useState(false);

  // Method that will make the post call to the backend to get see if we can register the user.
  async function validateNewUser(e) {
    e.preventDefault();

    console.log("Email: " + email + " password: " + password);
  }

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>

              {/* Form that will take in the users wmail and password. */}
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={validateNewUser}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    type="email"
                    name="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your remail"
                    required
                  ></input>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  ></input>
                  <p
                    style={{ display: alert ? "inline" : "none" }}
                    className="mt-2 text-sm text-red-600 dark:text-red-500"
                  >
                    <span className="font-medium">
                      Password and email does not match.
                    </span>
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <a
                    href="/comingsoon"
                    className="text-sm text-blue-600 font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                >
                  Sign in
                </button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account yet?{" "}
                  <NavLink
                    to="/signup"
                    className="font-medium text-blue-600 text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </NavLink>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignIn;
