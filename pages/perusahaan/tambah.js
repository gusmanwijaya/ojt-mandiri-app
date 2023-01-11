import React from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import Content from "../../components/Content";
import Footer from "../../components/Footer";

export default function TambahPerusahaan() {
  const router = useRouter();

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
                          htmlFor="jenisUsaha"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Jenis Usaha
                        </label>
                        <input
                          type="text"
                          name="jenisUsaha"
                          id="jenisUsaha"
                          autoComplete="jenisUsaha"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="namaPerusahaan"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Nama Perusahaan
                        </label>
                        <input
                          type="text"
                          name="namaPerusahaan"
                          id="namaPerusahaan"
                          autoComplete="namaPerusahaan"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="alamat"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Alamat
                        </label>
                        <textarea
                          name="alamat"
                          id="alamat"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        ></textarea>
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="noTelepon"
                          className="block text-sm font-medium text-gray-700"
                        >
                          No Telepon
                        </label>
                        <input
                          type="tel"
                          name="noTelepon"
                          id="noTelepon"
                          autoComplete="noTelepon"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="lokasi"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Lokasi
                        </label>
                        <input
                          type="text"
                          name="lokasi"
                          id="lokasi"
                          autoComplete="lokasi"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="terdaftar"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Terdaftar
                        </label>
                        <select
                          name="terdaftar"
                          id="terdaftar"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value=""></option>
                          <option value="Sudah">Sudah</option>
                          <option value="Belum">Belum</option>
                        </select>
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="keterangan"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Keterangan
                        </label>
                        <textarea
                          name="keterangan"
                          id="keterangan"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        ></textarea>
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
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Simpan
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
