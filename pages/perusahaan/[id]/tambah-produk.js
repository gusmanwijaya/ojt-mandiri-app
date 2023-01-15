import React, { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import Content from "../../../components/Content";
import Footer from "../../../components/Footer";
import Swal from "sweetalert2";
import { create } from "../../../services/product";

export default function TambahProdukPerusahaan({ paramsId }) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    companyId: paramsId,
  });

  const handleCreate = async () => {
    if (form?.name !== "") {
      const response = await create(paramsId, form);
      if (response?.data?.statusCode === 201) {
        router.replace(`/perusahaan/${paramsId}/detail`);
        Swal.fire({
          icon: "success",
          title: "Sukses",
          text: "Berhasil menambahkan data produk.",
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
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Nama produk tidak boleh kosong.",
      });
    }
  };

  return (
    <>
      <Header />
      <div className="h-screen w-screen">
        <Navbar />

        <Content>
          <div className="mt-0 h-screen">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Tambah Data Produk
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
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Nama Produk
                        </label>
                        <input
                          onChange={(event) =>
                            setForm({ ...form, name: event.target.value })
                          }
                          required
                          type="text"
                          name="name"
                          autoComplete="name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <div className="flex flex-row justify-end items-center space-x-2">
                      <button
                        onClick={() =>
                          router.replace(`/perusahaan/${paramsId}/detail`)
                        }
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-slate-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                      >
                        Kembali
                      </button>
                      <button
                        onClick={handleCreate}
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Tambah
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

  return {
    props: {
      paramsId: params?.id,
    },
  };
}
