import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Manager = ({ navigateTo }) => {
  const ref = useRef();
  const passwordRef = useRef();

  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  const getPasswords = async () => {
    const userid = localStorage.getItem("userid");
    if (!userid) return; // Wait for redirect

    try {
      let req = await fetch(`http://localhost:3000/?userid=${userid}`);
      let passwords = await req.json();
      if (passwords) {
        setpasswordArray(passwords);
      }
    } catch (error) {
      console.error("Error fetching passwords:", error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigateTo('login');
    } else {
      getPasswords();
    }
  }, []);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

  const showPassword = () => {
    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text";
      ref.current.src = "/show.svg"; // Assuming you have a show icon
    } else {
      passwordRef.current.type = "password";
      ref.current.src = "/noshow.svg";
    }
  };

  const savePassword = async () => {
    const userid = localStorage.getItem("userid");
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      const id = form.id || uuidv4();
      const newEntry = { ...form, id, userid }; // Add userid

      setpasswordArray((prevArray) => {
        const index = prevArray.findIndex((item) => item.id === id);
        if (index > -1) {
          const newArray = [...prevArray];
          newArray[index] = newEntry;
          return newArray;
        } else {
          return [...prevArray, newEntry];
        }
      });

      try {
        if (form.id) {
          await fetch("http://localhost:3000/", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, userid }), // Send userid for auth check
          });
        }

        await fetch("http://localhost:3000/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEntry),
        });

        setform({ site: "", username: "", password: "" });
        toast("Password Saved!", {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
        });
      } catch (error) {
        toast.error("Error saving password");
      }
    } else {
      toast.error("Error: Please fill all fields correctly");
    }
  };

  const deletePassword = async (id) => {
    const userid = localStorage.getItem("userid");
    let c = confirm("Do you really want to delete this password?");
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
      try {
        await fetch("http://localhost:3000/", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, userid }), // Send userid
        });
        toast("Password Deleted", {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
        });
      } catch (error) {
        toast.error("Error deleting password");
      }
    }
  };

  const editPassword = (id) => {
    setform({ ...passwordArray.find((item) => item.id === id) });
    // Keep item in list until saved
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {/* Main Container */}
      <div className="pt-24 pb-20 md:mycontainer min-h-[85vh] text-white">
        <h1 className="text-4xl text font-bold text-center mb-2">
          <span className="text-green-500">&lt;</span>
          <span>Vault</span>
          <span className="text-green-500">Key/&gt;</span>
        </h1>
        <p className="text-green-400 text-lg text-center mb-8">
          Your Own Personal Password Manager
        </p>

        {/* Input Section */}
        <div className="flex flex-col p-8 text-black gap-6 items-center bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-white/10 w-full md:w-3/4 mx-auto transition-all hover:bg-slate-800/60">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-green-500 w-full py-2 px-6 bg-slate-900/80 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            type="text"
            name="site"
            id="site"
          />

          <div className="flex flex-col md:flex-row justify-center w-full gap-6">
            <input
              value={form.username}
              onChange={handleChange}
              className="rounded-full border border-green-500 w-full py-2 px-6 bg-slate-900/80 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="Enter Username"
              name="username"
              type="text"
              id="username"
            />

            <div className="relative w-full">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                className="rounded-full border border-green-500 w-full py-2 px-6 bg-slate-900/80 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Enter Password"
                name="password"
                type="password"
                id="password"
              />
              <span
                className="absolute right-3 top-2 cursor-pointer hover:scale-110 transition-transform"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="w-6 p-0.5 invert opacity-70 hover:opacity-100 transition-opacity"
                  src="/noshow.svg"
                  alt="eye"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 bg-green-600 hover:bg-green-500 rounded-full px-8 py-2 w-fit font-bold text-white shadow-lg shadow-green-900/50 transition-all hover:-translate-y-1 hover:shadow-green-500/40 ring-1 ring-white/20"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              colors="primary:#ffffff"
            ></lord-icon>
            Save Password
          </button>
        </div>

        {/* Display Passwords Section */}
        <div className="passwords mt-10 w-full md:w-3/4 mx-auto">
          <h2 className="text-2xl font-bold py-4 text-center md:text-left text-green-300">
            Your Passwords
          </h2>

          {passwordArray.length === 0 && (
            <div className="text-slate-400 text-center text-lg italic mt-10">
              No passwords to show. Secure some now!
            </div>
          )}

          {passwordArray.length !== 0 && (
            <div className="overflow-x-auto rounded-xl shadow-2xl border border-white/10">
              <table className="table-auto w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-800 text-green-400 uppercase text-xs font-bold tracking-wider">
                  <tr>
                    <th className="py-4 px-6">Site URL</th>
                    <th className="py-4 px-6">Username</th>
                    <th className="py-4 px-6">Password</th>
                    <th className="py-4 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-slate-900/40 backdrop-blur-sm divide-y divide-slate-700">
                  {passwordArray.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-slate-800/80 transition-colors duration-200"
                    >
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <a
                            href={item.site}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-green-400 transition-colors underline decoration-slate-600 hover:decoration-green-400"
                          >
                            {item.site}
                          </a>
                          <img
                            className="w-4 cursor-pointer invert opacity-50 hover:opacity-100 transition-opacity hover:scale-110"
                            onClick={() => copyText(item.site)}
                            src="/copy.svg"
                            alt="copy"
                            title="Copy URL"
                          />
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <span>{item.username}</span>
                          <img
                            className="w-4 cursor-pointer invert opacity-50 hover:opacity-100 transition-opacity hover:scale-110"
                            onClick={() => copyText(item.username)}
                            src="/copy.svg"
                            alt="copy"
                            title="Copy Username"
                          />
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs tracking-widest">
                            {"*".repeat(item.password.length)}
                          </span>
                          <img
                            className="w-4 cursor-pointer invert opacity-50 hover:opacity-100 transition-opacity hover:scale-110"
                            onClick={() => copyText(item.password)}
                            src="/copy.svg"
                            alt="copy"
                            title="Copy Password"
                          />
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center whitespace-nowrap">
                        <div className="flex justify-center items-center gap-4">
                          <span
                            className="cursor-pointer group flex items-center gap-1 hover:text-green-400 transition-colors"
                            onClick={() => editPassword(item.id)}
                          >
                            <img
                              className="w-5 invert opacity-70 group-hover:opacity-100 transition-all group-hover:scale-110"
                              src="/edit.svg"
                              alt="Edit"
                            />
                          </span>
                          <span
                            className="cursor-pointer group flex items-center gap-1 hover:text-red-400 transition-colors"
                            onClick={() => deletePassword(item.id)}
                          >
                            <img
                              className="w-5 invert opacity-70 group-hover:opacity-100 transition-all group-hover:scale-110"
                              src="/delete.svg"
                              alt="Delete"
                            />
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
