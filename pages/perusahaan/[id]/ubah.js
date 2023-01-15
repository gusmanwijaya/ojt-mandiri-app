/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import Content from "../../../components/Content";
import Footer from "../../../components/Footer";
import { detail, edit } from "../../../services/perusahaan";
import Swal from "sweetalert2";

export default function UbahPerusahaan({ data, paramsId }) {
  const router = useRouter();

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

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setForm({
        ...form,
        type: data?.type || "",
        name: data?.name || "",
        email: data?.email || "",
        website: data?.website || "",
        address: data?.address || "",
        telephone: data?.telephone || "",
        location: data?.location || "",
        isRegistered: data?.isRegistered || "Belum",
        additionalInfo: data?.additionalInfo || "",
      });
    }
  }, []);

  const handleEdit = async () => {
    if (form?.type === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Jenis usaha tidak boleh kosong.",
      });
    } else if (form?.name === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Nama perusahaan tidak boleh kosong.",
      });
    } else if (form?.address === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Alamat tidak boleh kosong.",
      });
    } else {
      const response = await edit(paramsId, form);
      if (response?.data?.statusCode === 200) {
        router.replace("/perusahaan");
        Swal.fire({
          icon: "success",
          title: "Sukses",
          text: "Berhasil mengubah data perusahaan.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            response?.data?.message ||
            "Nampaknya terjadi kesalahan pada API, silahkan hubungi teknisi Anda.",
        });
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
                    Ubah Data Perusahaan
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
                          onChange={(event) =>
                            setForm({ ...form, type: event.target.value })
                          }
                          required
                          value={form?.type}
                          type="text"
                          name="type"
                          autoComplete="type"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                          onChange={(event) =>
                            setForm({ ...form, name: event.target.value })
                          }
                          required
                          value={form?.name}
                          type="text"
                          name="name"
                          autoComplete="name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                          onChange={(event) =>
                            setForm({ ...form, address: event.target.value })
                          }
                          required
                          value={form?.address}
                          name="address"
                          id="address"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="telephone"
                          className="block text-sm font-medium text-gray-700"
                        >
                          No Telepon
                        </label>
                        <input
                          onChange={(event) =>
                            setForm({ ...form, telephone: event.target.value })
                          }
                          value={form?.telephone}
                          type="tel"
                          name="telephone"
                          autoComplete="telephone"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                          onChange={(event) =>
                            setForm({ ...form, location: event.target.value })
                          }
                          value={form?.location}
                          type="text"
                          name="location"
                          autoComplete="location"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                          onChange={(event) =>
                            setForm({
                              ...form,
                              isRegistered: event.target.value,
                            })
                          }
                          value={form?.isRegistered}
                          name="isRegistered"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                          onChange={(event) =>
                            setForm({
                              ...form,
                              additionalInfo: event.target.value,
                            })
                          }
                          value={form?.additionalInfo}
                          name="additionalInfo"
                          id="additionalInfo"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <div className="flex flex-row justify-end items-center space-x-2">
                      <button
                        onClick={() => router.replace("/perusahaan")}
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-slate-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                      >
                        Kembali
                      </button>
                      <button
                        onClick={handleEdit}
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Ubah
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

export async function getServerSideProps({ req, params }) {
  const { tk } = req.cookies;
  if (!tk)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  const response = await detail(params?.id, tk);

  return {
    props: {
      data: response?.data?.data || {},
      paramsId: params?.id,
    },
  };
}
