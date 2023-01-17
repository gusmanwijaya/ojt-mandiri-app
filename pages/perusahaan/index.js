import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { useRouter } from "next/router";
import { PieChart } from "react-minimal-pie-chart";
import Navbar from "../../components/Navbar";
import Content from "../../components/Content";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Pagination from "../../components/Pagination";
import Link from "next/link";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPerusahaan,
  setPage,
  setSearch,
} from "../../redux/perusahaan/actions";
import { fetchDashboard } from "../../redux/dashboard/actions";
import { destroy } from "../../services/perusahaan";

export default function Perusahaan() {
  const ROOT_API = process.env.NEXT_PUBLIC_API;
  const API = "api/v1";

  const router = useRouter();
  const dispatch = useDispatch();

  const { allData, search, page, totalPage } = useSelector(
    (state) => state.perusahaanReducers
  );
  const { registered, notRegistered } = useSelector(
    (state) => state.dashboardReducers
  );

  const handlePrevious = () => {
    dispatch(setPage(page <= 1 ? 1 : page - 1));
  };

  const handleNext = () => {
    dispatch(setPage(page === totalPage ? totalPage : page + 1));
  };

  const handleChangeSearchBox = (event) => {
    dispatch(setSearch(event.target.value));
  };

  useEffect(() => {
    dispatch(fetchPerusahaan());
    dispatch(fetchDashboard());
  }, [dispatch, page, search]);

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
        const response = await destroy(id);
        if (response?.data?.statusCode === 200) {
          Swal.fire({
            icon: "success",
            title: "Sukses",
            text: "Berhasil menghapus data perusahaan.",
          });
          dispatch(fetchPerusahaan());
          dispatch(fetchDashboard());
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
      name: "Jenis Usaha",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Nama Perusahaan",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Lokasi",
      selector: (row) => row.location,
      sortable: false,
    },
    {
      name: "Terdaftar",
      selector: (row) => row.isRegistered,
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
          type: value?.type,
          name: value?.name,
          location: value?.location ? (
            <a
              href={value?.location}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-400"
            >
              Lihat
            </a>
          ) : (
            "-"
          ),
          isRegistered: value?.isRegistered,
          action: (
            <div className="flex flex-row space-x-2">
              <Link href={`/perusahaan/${value?.id}/detail`}>
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
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </Link>

              <Link href={`/perusahaan/${value?.id}/ubah`}>
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
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </Link>

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

      <div className="bg-gray-100 h-full">
        <Navbar />
        <Content>
          {allData?.length > 0 && (
            <div className="flex flex-col items-center justify-center mb-6">
              <h3 className="text-base font-bold mb-4">
                Persentase Perusahaan Yang Terdaftar
              </h3>
              <div className="w-1/2 h-1/2 md:w-1/6 md:h-1/6">
                <PieChart
                  data={[
                    {
                      title: "Terdaftar",
                      value: registered,
                      color: "#4BB543",
                    },
                    {
                      title: "Belum Terdaftar",
                      value: notRegistered,
                      color: "#E50914",
                    },
                  ]}
                  label={(data) => `${Math.round(data.dataEntry.percentage)} %`}
                  animate
                  animationDuration={500}
                  animationEasing="ease-out"
                  center={[50, 50]}
                  labelPosition={50}
                  labelStyle={{
                    fontSize: "8px",
                    fontFamily: "sans-serif",
                    fill: "white",
                  }}
                  lengthAngle={360}
                  paddingAngle={0}
                  radius={50}
                  startAngle={0}
                />
              </div>
              <div className="my-4 text-center">
                <p className="text-[#4BB543]">Total Terdaftar : {registered}</p>
                <p className="text-[#E50914]">
                  Total Belum Terdaftar : {notRegistered}
                </p>
              </div>
            </div>
          )}
          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
              <div className="grid grid-cols-2 gap-4 md:gap-0 md:flex md:flex-row md:items-center md:space-x-2">
                <button
                  onClick={() => router.push("/perusahaan/tambah")}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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
                    <p>Tambah</p>
                  </div>
                </button>

                <a
                  href={`${ROOT_API}/${API}/companies/download`}
                  target="_blank"
                  rel="noopener noreferrer"
                  type="button"
                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm p-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
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
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                      />
                    </svg>

                    <p>Unduh Template</p>
                  </div>
                </a>

                <button
                  onClick={() => router.push("/perusahaan/import")}
                  type="button"
                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm p-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
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
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                      />
                    </svg>
                    <p>Import</p>
                  </div>
                </button>

                <button
                  onClick={() => router.replace("/perusahaan/scrap")}
                  type="button"
                  className="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:ring-violet-300 font-medium rounded-lg text-sm p-2 dark:bg-violet-600 dark:hover:bg-violet-700 focus:outline-none dark:focus:ring-violet-800"
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
                        d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                      />
                    </svg>

                    <p>Scrap</p>
                  </div>
                </button>

                <button
                  onClick={() => router.reload()}
                  type="button"
                  className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-sm p-2 dark:bg-slate-600 dark:hover:bg-slate-700 focus:outline-none dark:focus:ring-slate-800"
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
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>

                    <p>Refresh</p>
                  </div>
                </button>
              </div>

              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full md:w-1/4 mt-4 md:mt-0">
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
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                  placeholder="Jenis Usaha / Nama Perusahaan"
                  onChange={handleChangeSearchBox}
                />
              </div>
            </div>

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
      </div>

      <Footer />
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
