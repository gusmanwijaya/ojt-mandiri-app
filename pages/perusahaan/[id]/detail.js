import React, { useEffect } from "react";
import Header from "../../../components/Header";
import Content from "../../../components/Content";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import Pagination from "../../../components/Pagination";
import DataTable from "react-data-table-component";
import { useRouter } from "next/router";
import { detail } from "../../../services/perusahaan";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct, setPage } from "../../../redux/product/actions";

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

  useEffect(() => {
    dispatch(fetchProduct(paramsId));
  }, [dispatch, paramsId, page, name]);

  const columns = [
    {
      name: "No",
      selector: (row) => row.no,
      sortable: true,
      width: "5rem",
    },
    {
      name: "Produk",
      selector: (row) => row.name,
      sortable: true,
    },
  ];

  const data =
    allData?.length > 0
      ? allData?.map((value, index) => ({
          no: index + 1,
          name: value?.name,
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
