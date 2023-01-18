import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import Content from "../../../components/Content";
import Footer from "../../../components/Footer";
import Swal from "sweetalert2";
import { create, get } from "../../../services/product";

export default function TambahProdukPerusahaan({ paramsId }) {
  const router = useRouter();

  const [disabledButton, setDisabledButton] = useState(false);

  const [checkboxValue, setCheckboxValue] = useState([]);

  const handleChange = (event) => {
    // Destructuring
    const { value, checked } = event.target;

    // Case 1 : The user checks the box
    if (checked) {
      setCheckboxValue([...checkboxValue, value]);
    }

    // Case 2  : The user unchecks the box
    else {
      setCheckboxValue(checkboxValue.filter((result) => result !== value));
    }
  };

  const fetchProductsExisting = useCallback(async () => {
    const response = await get(paramsId, 1, 999999999, "");
    if (response?.data?.statusCode === 200) {
      const payload = [];
      response?.data?.data?.length > 0 &&
        response?.data?.data?.map((value) => payload.push(value?.name));

      if (payload.length > 0) {
        setCheckboxValue(payload);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          response?.data?.message ||
          "Nampaknya terjadi kesalahan pada API, silahkan hubungi teknisi Anda.",
      });
    }
  }, [paramsId]);

  useEffect(() => {
    fetchProductsExisting();
  }, [fetchProductsExisting]);

  const handleCreate = async () => {
    setDisabledButton(true);
    if (checkboxValue.length > 0) {
      const data = {
        name: checkboxValue,
      };

      const response = await create(paramsId, data);
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
        setDisabledButton(false);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Silahkan pilih minimal 1 produk.",
      });
      setDisabledButton(false);
    }
  };

  return (
    <>
      <Header />
      <div className="h-screen w-screen">
        <Navbar />

        <Content>
          <div className="mt-0 h-full">
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
                    <div className="flex items-center pl-4 border border-gray-200 rounded mb-4">
                      <input
                        id="bordered-checkbox-1"
                        type="checkbox"
                        name="name"
                        className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500`}
                        onChange={(event) => handleChange(event)}
                        value="Giro"
                        checked={checkboxValue.includes("Giro") || false}
                      />
                      <label
                        htmlFor="bordered-checkbox-1"
                        className={`w-full py-4 ml-2 text-sm font-medium text-gray-900`}
                      >
                        Giro
                      </label>
                    </div>

                    <div className="flex items-center pl-4 border border-gray-200 rounded mb-4">
                      <input
                        id="bordered-checkbox-2"
                        type="checkbox"
                        name="name"
                        className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500`}
                        onChange={(event) => handleChange(event)}
                        value="Tabungan"
                        checked={checkboxValue.includes("Tabungan") || false}
                      />
                      <label
                        htmlFor="bordered-checkbox-2"
                        className={`w-full py-4 ml-2 text-sm font-medium text-gray-900`}
                      >
                        Tabungan
                      </label>
                    </div>

                    <div className="flex items-center pl-4 border border-gray-200 rounded mb-4">
                      <input
                        id="bordered-checkbox-3"
                        type="checkbox"
                        name="name"
                        className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500`}
                        onChange={(event) => handleChange(event)}
                        value="Deposito"
                        checked={checkboxValue.includes("Deposito") || false}
                      />
                      <label
                        htmlFor="bordered-checkbox-3"
                        className={`w-full py-4 ml-2 text-sm font-medium text-gray-900`}
                      >
                        Deposito
                      </label>
                    </div>

                    <div className="flex items-center pl-4 border border-gray-200 rounded mb-4">
                      <input
                        id="bordered-checkbox-4"
                        type="checkbox"
                        name="name"
                        className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500`}
                        onChange={(event) => handleChange(event)}
                        value="Reksadana"
                        checked={checkboxValue.includes("Reksadana") || false}
                      />
                      <label
                        htmlFor="bordered-checkbox-4"
                        className={`w-full py-4 ml-2 text-sm font-medium text-gray-900`}
                      >
                        Reksadana
                      </label>
                    </div>

                    <div className="flex items-center pl-4 border border-gray-200 rounded mb-4">
                      <input
                        id="bordered-checkbox-5"
                        type="checkbox"
                        name="name"
                        className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500`}
                        onChange={(event) => handleChange(event)}
                        value="Mandiri Tabungan Rencana (MTR)"
                        checked={
                          checkboxValue.includes(
                            "Mandiri Tabungan Rencana (MTR)"
                          ) || false
                        }
                      />
                      <label
                        htmlFor="bordered-checkbox-5"
                        className={`w-full py-4 ml-2 text-sm font-medium text-gray-900`}
                      >
                        Mandiri Tabungan Rencana (MTR)
                      </label>
                    </div>

                    <div className="flex items-center pl-4 border border-gray-200 rounded mb-4">
                      <input
                        id="bordered-checkbox-6"
                        type="checkbox"
                        name="name"
                        className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500`}
                        onChange={(event) => handleChange(event)}
                        value="Kartu Kredit"
                        checked={
                          checkboxValue.includes("Kartu Kredit") || false
                        }
                      />
                      <label
                        htmlFor="bordered-checkbox-6"
                        className={`w-full py-4 ml-2 text-sm font-medium text-gray-900`}
                      >
                        Kartu Kredit
                      </label>
                    </div>

                    <div className="flex items-center pl-4 border border-gray-200 rounded mb-4">
                      <input
                        id="bordered-checkbox-7"
                        type="checkbox"
                        name="name"
                        className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500`}
                        onChange={(event) => handleChange(event)}
                        value="Kredit Serbaguna Mandiri (KSM)"
                        checked={
                          checkboxValue.includes(
                            "Kredit Serbaguna Mandiri (KSM)"
                          ) || false
                        }
                      />
                      <label
                        htmlFor="bordered-checkbox-7"
                        className={`w-full py-4 ml-2 text-sm font-medium text-gray-900`}
                      >
                        Kredit Serbaguna Mandiri (KSM)
                      </label>
                    </div>

                    <div className="flex items-center pl-4 border border-gray-200 rounded mb-4">
                      <input
                        id="bordered-checkbox-8"
                        type="checkbox"
                        name="name"
                        className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500`}
                        onChange={(event) => handleChange(event)}
                        value="Kredit Usaha Mikro (KUM)"
                        checked={
                          checkboxValue.includes("Kredit Usaha Mikro (KUM)") ||
                          false
                        }
                      />
                      <label
                        htmlFor="bordered-checkbox-8"
                        className={`w-full py-4 ml-2 text-sm font-medium text-gray-900`}
                      >
                        Kredit Usaha Mikro (KUM)
                      </label>
                    </div>

                    <div className="flex items-center pl-4 border border-gray-200 rounded mb-4">
                      <input
                        id="bordered-checkbox-9"
                        type="checkbox"
                        name="name"
                        className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500`}
                        onChange={(event) => handleChange(event)}
                        value="Kredit Usaha Rakyat (KUR)"
                        checked={
                          checkboxValue.includes("Kredit Usaha Rakyat (KUR)") ||
                          false
                        }
                      />
                      <label
                        htmlFor="bordered-checkbox-9"
                        className={`w-full py-4 ml-2 text-sm font-medium text-gray-900`}
                      >
                        Kredit Usaha Rakyat (KUR)
                      </label>
                    </div>

                    <div className="flex items-center pl-4 border border-gray-200 rounded mb-4">
                      <input
                        id="bordered-checkbox-10"
                        type="checkbox"
                        name="name"
                        className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500`}
                        onChange={(event) => handleChange(event)}
                        value="Kredit Pemilikan Rumah (KPR)"
                        checked={
                          checkboxValue.includes(
                            "Kredit Pemilikan Rumah (KPR)"
                          ) || false
                        }
                      />
                      <label
                        htmlFor="bordered-checkbox-10"
                        className={`w-full py-4 ml-2 text-sm font-medium text-gray-900`}
                      >
                        Kredit Pemilikan Rumah (KPR)
                      </label>
                    </div>

                    <div className="flex items-center pl-4 border border-gray-200 rounded mb-4">
                      <input
                        id="bordered-checkbox-11"
                        type="checkbox"
                        name="name"
                        className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500`}
                        onChange={(event) => handleChange(event)}
                        value="Small Medium Enterprise (SME)"
                        checked={
                          checkboxValue.includes(
                            "Small Medium Enterprise (SME)"
                          ) || false
                        }
                      />
                      <label
                        htmlFor="bordered-checkbox-11"
                        className={`w-full py-4 ml-2 text-sm font-medium text-gray-900`}
                      >
                        Small Medium Enterprise (SME)
                      </label>
                    </div>

                    <div className="flex items-center pl-4 border border-gray-200 rounded mb-4">
                      <input
                        id="bordered-checkbox-12"
                        type="checkbox"
                        name="name"
                        className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500`}
                        onChange={(event) => handleChange(event)}
                        value="Kredit Kendaraan Bermotor (KKB)"
                        checked={
                          checkboxValue.includes(
                            "Kredit Kendaraan Bermotor (KKB)"
                          ) || false
                        }
                      />
                      <label
                        htmlFor="bordered-checkbox-12"
                        className={`w-full py-4 ml-2 text-sm font-medium text-gray-900`}
                      >
                        Kredit Kendaraan Bermotor (KKB)
                      </label>
                    </div>

                    <div className="flex items-center pl-4 border border-gray-200 rounded mb-4">
                      <input
                        id="bordered-checkbox-13"
                        type="checkbox"
                        name="name"
                        className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500`}
                        onChange={(event) => handleChange(event)}
                        value="Kredit Pemilikan Gudang (KPG)"
                        checked={
                          checkboxValue.includes(
                            "Kredit Pemilikan Gudang (KPG)"
                          ) || false
                        }
                      />
                      <label
                        htmlFor="bordered-checkbox-13"
                        className={`w-full py-4 ml-2 text-sm font-medium text-gray-900`}
                      >
                        Kredit Pemilikan Gudang (KPG)
                      </label>
                    </div>

                    <div className="flex items-center pl-4 border border-gray-200 rounded mb-4">
                      <input
                        id="bordered-checkbox-14"
                        type="checkbox"
                        name="name"
                        className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500`}
                        onChange={(event) => handleChange(event)}
                        value="AXA Mandiri"
                        checked={checkboxValue.includes("AXA Mandiri") || false}
                      />
                      <label
                        htmlFor="bordered-checkbox-14"
                        className={`w-full py-4 ml-2 text-sm font-medium text-gray-900`}
                      >
                        AXA Mandiri
                      </label>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <div className="flex flex-row justify-end items-center space-x-2">
                      <button
                        disabled={disabledButton}
                        onClick={() =>
                          router.replace(`/perusahaan/${paramsId}/detail`)
                        }
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
