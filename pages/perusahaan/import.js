import React, { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import Content from "../../components/Content";
import Footer from "../../components/Footer";
import Swal from "sweetalert2";
import { impor } from "../../services/perusahaan";

export default function ImportPerusahaan() {
  const router = useRouter();

  const [form, setForm] = useState({
    file: "",
  });

  const handleUploadFile = (event) => {
    setForm({
      ...form,
      file: event.target.files[0],
    });
  };

  const handleImport = async () => {
    if (form?.file === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Anda belum mengunggah file .xls atau .xlsx",
      });
    } else {
      const formData = new FormData();
      formData.append("file", form?.file);

      const response = await impor(formData);
      if (response?.data?.statusCode === 201) {
        router.replace("/perusahaan");
        Swal.fire({
          icon: "success",
          title: "Sukses",
          text: "Berhasil import data perusahaan.",
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
            <div className="md:grid md:grid-cols-3 md:gap-6 h-screen">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Import Data Perusahaan
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Silahkan unggah file dengan format .xls atau .xlsx
                  </p>
                </div>
              </div>
              <div className="mt-5 md:col-span-2 md:mt-0">
                <div className="overflow-hidden shadow-2xl sm:rounded-md">
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900"
                      htmlFor="file"
                    >
                      Unggah File
                    </label>
                    <input
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                      aria-describedby="file"
                      id="file"
                      type="file"
                      name="file"
                      onChange={(event) => handleUploadFile(event)}
                      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    />
                    <p className="mt-1 text-sm text-gray-500" id="file">
                      XLS, XLSX.
                    </p>
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
                        onClick={handleImport}
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      >
                        Import
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
