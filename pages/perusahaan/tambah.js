import React, { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import Content from "../../components/Content";
import Footer from "../../components/Footer";
import Swal from "sweetalert2";
import { create } from "../../services/perusahaan";

export default function TambahPerusahaan() {
  const router = useRouter();

  const [disabledButton, setDisabledButton] = useState(false);

  const [form, setForm] = useState({
    type: "",
    name: "",
    email: "",
    website: "",
    address: "",
    telephone: "",
    location: "",
    isRegistered: "Belum",
    additionalInfo: "",
  });

  const handleCreate = async () => {
    setDisabledButton(true);
    if (form?.type === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Jenis usaha tidak boleh kosong.",
      });
      setDisabledButton(false);
    } else if (form?.name === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Nama perusahaan tidak boleh kosong.",
      });
      setDisabledButton(false);
    } else if (form?.address === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Alamat tidak boleh kosong.",
      });
      setDisabledButton(false);
    } else {
      const response = await create(form);
      if (response?.data?.statusCode === 201) {
        router.replace("/perusahaan");
        Swal.fire({
          icon: "success",
          title: "Sukses",
          text: "Berhasil menambahkan data perusahaan.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            response?.data?.message ||
            "Nampaknya terjadi kesalahan pada API, silahkan hubungi teknisi Anda.",
        });
        setDisabledButton(false);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="h-screen w-screen">
        <Navbar />

        <Content>
          <div className="mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Tambah Data Perusahaan
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Silahkan lengkapi form yang tersedia.
                  </p>
                </div>
              </div>
              <div className="mt-5 md:col-span-2 md:mt-0">
                <div className="overflow-hidden shadow-2xl sm:rounded-md">
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6">
                        <label
                          htmlFor="type"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Jenis Usaha
                        </label>
                        <input
                          type="text"
                          name="type"
                          autoComplete="type"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                          onChange={(event) =>
                            setForm({ ...form, type: event.target.value })
                          }
                        />
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Nama Perusahaan
                        </label>
                        <input
                          type="text"
                          name="name"
                          autoComplete="name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                          onChange={(event) =>
                            setForm({ ...form, name: event.target.value })
                          }
                        />
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          autoComplete="email"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                          onChange={(event) =>
                            setForm({ ...form, email: event.target.value })
                          }
                        />
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="website"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Website
                        </label>
                        <input
                          type="text"
                          name="website"
                          autoComplete="website"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                          onChange={(event) =>
                            setForm({ ...form, website: event.target.value })
                          }
                        />
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Alamat
                        </label>
                        <textarea
                          name="address"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                          onChange={(event) =>
                            setForm({ ...form, address: event.target.value })
                          }
                        ></textarea>
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="telephone"
                          className="block text-sm font-medium text-gray-700"
                        >
                          No Telepon
                        </label>
                        <input
                          type="tel"
                          name="telephone"
                          autoComplete="telephone"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          onChange={(event) =>
                            setForm({ ...form, telephone: event.target.value })
                          }
                        />
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="location"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Lokasi
                        </label>
                        <input
                          type="text"
                          name="location"
                          autoComplete="location"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          onChange={(event) =>
                            setForm({ ...form, location: event.target.value })
                          }
                        />
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="isRegistered"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Terdaftar
                        </label>
                        <select
                          name="isRegistered"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          onChange={(event) =>
                            setForm({
                              ...form,
                              isRegistered: event.target.value,
                            })
                          }
                        >
                          <option value=""></option>
                          <option value="Sudah">Sudah</option>
                          <option value="Belum">Belum</option>
                        </select>
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="additionalInfo"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Keterangan
                        </label>
                        <textarea
                          name="additionalInfo"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          onChange={(event) =>
                            setForm({
                              ...form,
                              additionalInfo: event.target.value,
                            })
                          }
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <div className="flex flex-row justify-end items-center space-x-2">
                      <button
                        disabled={disabledButton}
                        onClick={() => router.replace("/perusahaan")}
                        type="button"
                        className={`inline-flex justify-center rounded-md border border-transparent bg-slate-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 ${
                          disabledButton && "cursor-not-allowed"
                        }`}
                      >
                        Kembali
                      </button>
                      <button
                        disabled={disabledButton}
                        onClick={handleCreate}
                        type="button"
                        className={`inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                          disabledButton && "cursor-not-allowed"
                        }`}
                      >
                        {disabledButton ? (
                          <>
                            <svg
                              aria-hidden="true"
                              role="status"
                              className="inline w-4 h-4 mr-3 text-white animate-spin"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="#E5E7EB"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentColor"
                              />
                            </svg>
                            Loading...
                          </>
                        ) : (
                          "Simpan"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Content>

        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const { tk } = req.cookies;
  if (!tk)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return {
    props: {},
  };
}
