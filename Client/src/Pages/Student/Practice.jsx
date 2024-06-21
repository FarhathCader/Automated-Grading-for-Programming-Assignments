import React, { useEffect, useState } from "react";
import Sidebar from "../../Sections/Sidebar";
import Header from "../../Sections/Header";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { CSSProperties } from "react";
import { backendUrl } from "../../../config";
import NotFoundPage from "../../Components/NotFoundPage";
import { useSelector } from "react-redux";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Practice = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page")) || 1);
  const [problemsPerPage] = useState(1); // Set the number of problems per page
  const [totalProblems, setTotalProblems] = useState(0);
  const [showBtn, setShowBtn] = useState(false);
  const [totalPages,setTotalPages] = useState(0)
  const [notFound,setNotFound] = useState(false)
  const user = useSelector(state => state.user);

  useEffect(()=>{
    const total = Math.ceil(totalProblems / problemsPerPage)
    if(total === 0)return
    setTotalPages(total);
    if(  total > 1)setShowBtn(true)
    if(currentPage > total)setNotFound(true)
  },[totalProblems,showBtn])

  useEffect(() => {
    // Fetch questions from API
    fetchQuestions(currentPage);
  }, [currentPage]);

  const fetchQuestions = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/problems/practice`, {
        params: {
          page: page,
          limit: problemsPerPage,
        },
      });
      setProblems(response.data.problems);
      setTotalProblems(response.data.total); // Assuming the backend sends total number of problems
      setSearchParams({ page: page });
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    setCurrentPage(page);
  }, [searchParams]);

  useEffect(() => {
    if(user._id === undefined)return
    console.log("Sending data")
    const pid = localStorage.getItem('problemId');
    const cid = localStorage.getItem('contestId');
    const codes = JSON.parse(localStorage.getItem('codes'))
    const uid = user._id
    if(pid !== null && uid !== null){
      sendDraft(pid,uid,cid,codes)
      localStorage.clear();
    }

  }, [])
  const sendDraft = async (pid,uid,cid,codes) => {
    setLoading(true);
    try {
      const response = await axios.put(`${backendUrl}/api/draft/${pid}/${uid}/${cid}`, {
        codes
      });
      console.log('Draft saved:', response.data);
    } catch (error) {
      console.error('Error saving draft:', error);
    } finally {
      setLoading(false)
    }
  }

  


  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  
  if(notFound){
    return <NotFoundPage/>
  }


  return (
    // <main className="w-full h-screen flex justify-between items-start">
    //   <Sidebar />
    //   {loading ? (
    //     <div className="w-full flex justify-center items-center h-screen">
    //       <ClipLoader color="blue" loading={true} size={150} css={override} />
    //     </div>
    //   ) : (
    //     <section className="w-4/5 grow bg-blue-100 h-screen overflow-y-auto flex flex-col justify-start items-center gap-4 p-4">
    //       <Header bgColor="blue" />
    //       <div className="w-5/6 p-6 bg-blue-400 rounded-xl shadow-lg flex flex-col items-center mt-20">
    //         <h2 className="text-xl italic font-semibold mb-4 text-blue-950 bg-blue-200 p-4 rounded">
    //           Practice Makes Perfect
    //         </h2>
    //         {problems && (
    //           <table className="w-3/5">
    //             <thead>
    //               <tr className="bg-blue-200">
    //                 <th className="px-6 py-3 text-left text-blue-800">Problem Name</th>
    //                 <th className="px-6 py-3 text-left text-blue-800">Difficulty</th>
    //                 <th className="px-6 py-3 text-left text-blue-800">Grade</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {problems.map((problem, index) => (
    //                 <tr
    //                   key={index}
    //                   className={
    //                     index % 2 === 0
    //                       ? "bg-blue-800 cursor-pointer hover:scale-105"
    //                       : "bg-blue-700 cursor-pointer hover:scale-105"
    //                   }
    //                   onClick={() => navigate(`/problems/${problem._id}`)}
    //                 >
    //                   <td className="px-6 py-4 text-blue-200">{problem.name}</td>
    //                   <td className="px-6 py-4 text-blue-200">{problem.difficulty}</td>
    //                   <td className="px-6 py-4 text-blue-200">{problem.grade}</td>
    //                 </tr>
    //               ))}
    //             </tbody>
    //           </table>
    //         )}
    //         <div className="flex justify-between mt-4">
    //           <button
    //             onClick={handlePreviousPage}
    //             disabled={currentPage === 1}
    //             className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
    //           >
    //             Previous
    //           </button>
    //           <span className="px-4 py-2">
    //             Page {currentPage} of {totalPages}
    //           </span>
    //           <button
    //             onClick={handleNextPage}
    //             disabled={currentPage === totalPages}
    //             className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
    //           >
    //             Next
    //           </button>
    //         </div>
    //       </div>
    //     </section>
    //   )}
    // </main>
    <main className="w-full h-screen flex justify-between items-start">
    {/* <Sidebar /> */}
    {loading ? (
      <div className="w-full flex justify-center items-center h-screen">
        <ClipLoader color="blue" loading={true} size={150} css={override} />
      </div>
    ) : (
      <section className="w-full lg:w-4/5 grow bg-blue-100 h-screen overflow-y-auto flex flex-col justify-start items-center gap-4 p-4">
        {
          problems && problems.length === 0 ?

 <div className="w-full h-screen flex justify-center items-center">
              <div className="w-5/6 max-w-xl p-6 rounded-xl shadow-lg flex flex-col items-center">
                <h1 className="text-4xl font-bold text-blue-900 mb-4">No Practice Problems</h1>
                <p className="text-lg text-blue-950 text-center">Sorry We do not have any Practice Problems at the moment. Please come back later!!</p>
              </div>
            </div>
            :

        <div className="w-full p-6 bg-blue-400 rounded-xl shadow-lg flex flex-col items-center mt-20">
          <h2 className="text-xl italic font-semibold mb-4 text-blue-950 bg-blue-200 p-4 rounded">
            Practice Makes Perfect
          </h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-200">
                  <th className="px-6 py-3 text-left text-blue-800 border-b border-blue-300">Problem Name</th>
                  <th className="px-6 py-3 text-left text-blue-800 border-b border-blue-300">Difficulty</th>
                  <th className="px-6 py-3 text-left text-blue-800 border-b border-blue-300">Category</th>
                  <th className="px-6 py-3 text-left text-blue-800 border-b border-blue-300">Grade</th>
                </tr>
              </thead>
              <tbody>
                {problems.map((problem, index) => (
                  <tr
                    key={index}
                    className={`cursor-pointer ${
                      index % 2 === 0 ? "bg-blue-800" : "bg-blue-700"
                    }`}
                    onClick={() => navigate(`/problems/${problem._id}`)}
                  >
                    <td className="px-6 py-4 text-blue-200">{problem.name}</td>
                    <td className="px-6 py-4 text-blue-200">{problem.difficulty}</td>
                    <td className="px-6 py-4 text-blue-200">{problem.category}</td>
                    <td className="px-6 py-4 text-blue-200">{problem.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {showBtn && <div className="w-full flex justify-center items-center mt-4 gap-6">
                <button
                  onClick={handlePrev}
                  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                <span className="text-blue-800 font-semibold">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>}
        </div>

              }
      </section>

    )}
  </main>
  );
};

export default Practice;
