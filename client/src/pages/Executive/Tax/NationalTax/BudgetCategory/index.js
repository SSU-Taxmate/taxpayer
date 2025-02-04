import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Error from "../../../../../components/Error";
import Loading from "../../../../../components/Loading";
import Expenditure from "./Expenditure";
import Revenue from "./Revenue";
function TaxTypeArea() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let classData = useSelector((state) => state.classInfo.classData);
  const [data, setdata] = useState();
  const fetchData = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const result = await axios.get("/api/budget/month", {
        params: { classId: classData.classId },
      });
      setdata(result.data);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="row row-cols-1 row-cols-md-2">
      {isError && <Error></Error>}
      {isLoading ? (
        <Loading />
      ) : (
        data && (
          <>
            <Revenue data={data.revenue} />
            <Expenditure data={data.expenditure} />
          </>
        )
      )}
    </div>
  );
}

export default TaxTypeArea;
