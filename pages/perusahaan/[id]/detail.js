import React, { useEffect } from "react";
import Header from "../../../components/Header";
import Content from "../../../components/Content";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import Pagination from "../../../components/Pagination";
import DataTable from "react-data-table-component";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { detail } from "../../../services/perusahaan";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct, setName, setPage } from "../../../redux/product/actions";
import { destroy } from "../../../services/product";

const DetailPerusahaan = ({ oneData, paramsId }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { allData, page, totalPage, name } = useSelector(
    (state) => state?.productReducers
  );

  const handlePrevious = () => {
    dispatch(setPage(page <= 1 ? 1 : page - 1));
  };

  const handleNext = () => {
    dispatch(setPage(page === totalPage ? totalPage : page + 1));
  };

  const handleChangeSearchBox = (event) => {
    dispatch(setName(event.target.value));
  };

  useEffect(() => {
    dispatch(fetchProduct(paramsId));
  }, [dispatch, paramsId, page, name]);

  const onDelete = (id) => {
    Swal.fire({
      title: "Hapus data?",
      text: "Data yang telah dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E50914",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await destroy(paramsId, id);
        if (response?.data?.statusCode === 200) {
          Swal.fire({
            icon: "success",
            title: "Sukses",
            text: "Berhasil menghapus data produk.",
          });
          dispatch(fetchProduct(paramsId));
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${
              response?.data?.message ||
              "Nampaknya terjadi kesalahan pada API, silahkan hubungi teknisi Anda."
            }`,
          });
        }
      }
    });
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "5rem",
    },
    {
      name: "Produk",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => row.action,
      sortable: false,
    },
  ];

  const data =
    allData?.length > 0
      ? allData?.map((value) => ({
          id: value?.id,
          name: value?.name,
          action: (
            <div className="flex flex-row space-x-2">
              <div onClick={() => onDelete(value?.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>
            </div>
          ),
        }))
      : [];

  return (
    <>
      <Header />
      <Navbar />
      <Content>
        <div className="overflow-hidden bg-white shadow-xl sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Detail Perusahaan
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Berikut data detail terkait perusahaan.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Jenis usaha
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {oneData?.type || "-"}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Nama perusahaan
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {oneData?.name || "-"}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Alamat</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {oneData?.address || "-"}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  No telepon
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {oneData?.telephone || "-"}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Lokasi</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {oneData?.location ? (
                    <a
                      href={oneData?.location}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-blue-400"
                    >
                      Lihat
                    </a>
                  ) : (
                    "-"
                  )}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Terdaftar</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {oneData?.isRegistered || "-"}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Keterangan
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {oneData?.additionalInfo || "-"}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="flex flex-row items-center justify-start space-x-2">
          <button
            onClick={() => router.push("/perusahaan")}
            type="button"
            className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-sm p-2 my-6 dark:bg-slate-600 dark:hover:bg-slate-700 focus:outline-none dark:focus:ring-slate-800"
          >
            <div className="flex flex-row justify-center items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                />
              </svg>
              <p>Kembali</p>
            </div>
          </button>
          {oneData?.isRegistered === "Sudah" && (
            <button
              onClick={() =>
                router.push(`/perusahaan/${paramsId}/tambah-produk`)
              }
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2 my-6 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              <div className="flex flex-row justify-center items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <p>Tambah Produk</p>
              </div>
            </button>
          )}
        </div>

        <div className="py-4 shadow-xl rounded">
          {allData?.length > 0 && (
            <div className="flex items-center justify-center md:justify-end mx-2 mb-2 md:mx-0 md:mb-1 md:mr-2">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full md:w-1/4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  onChange={handleChangeSearchBox}
                  type="text"
                  name="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                  placeholder="Cari berdasarkan nama produk"
                />
              </div>
            </div>
          )}
          <DataTable columns={columns} data={data} />
          {allData?.length > 0 && (
            <Pagination
              page={page}
              totalPage={totalPage}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
              disabledNext={page === totalPage ? true : false}
              disabledPrevious={page <= 1 ? true : false}
            />
          )}
        </div>
      </Content>
      <Footer />
    </>
  );
};

export default DetailPerusahaan;

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
      oneData: response?.data?.data || {},
      paramsId: params?.id,
    },
  };
}
