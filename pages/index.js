/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { signIn } from "../services/authentication";

export default function Home() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleSignIn = async () => {
    if (form?.username !== "" && form?.password !== "") {
      const response = await signIn(form);
      if (response?.data?.statusCode === 200) {
        Cookies.set("tk", response?.data?.data?.token);
        router.replace("/perusahaan");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Kredensial tidak valid.",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Silahkan isi username dan password Anda.",
      });
    }
  };

  return (
    <>
      <Header />
      <main className="w-screen h-screen">
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <img
                className="mx-auto h-16 w-auto"
                src="/logo.png"
                alt="Bank Mandiri"
              />
            </div>
            <div className="mt-8 space-y-6">
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="username" className="sr-only">
                    Username
                  </label>
                  <input
                    onChange={(event) =>
                      setForm({ ...form, username: event.target.value })
                    }
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Username"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    onChange={(event) =>
                      setForm({ ...form, password: event.target.value })
                    }
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={handleSignIn}
                  type="button"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Masuk
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps({ req }) {
  const { tk } = req.cookies;
  if (tk)
    return {
      redirect: {
        destination: "/perusahaan",
        permanent: false,
      },
    };

  return {
    props: {},
  };
}
