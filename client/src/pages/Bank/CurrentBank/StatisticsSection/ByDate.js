import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import moment from 'moment-timezone';
import Loading from '../../../../components/Loading'
import Error from '../../../../components/Error'

import axios from 'axios'
import ChartBar from '../../../../components/Charts/Bar';
function ByDate() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    //bydate
    const week = { 1: '일', 2: '월', 3: '화', 4: '수', 5: '목', 6: '금', 7: '토' }
    const [bydatein, setbydatein] = useState();
    const [bydateout, setbydateout] = useState();
    const bydatelabel = ['일', '월', '화', '수', '목', '금', '토']

    const joinedUser = useSelector(state => state.classUser);
    const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);
        try {
            const result = await axios.get(`/api/students/${joinedUser.classUser}/account/statistics`,
                {
                    params: {
                        type: 'bydate',
                        startDate: moment().subtract(1, 'weeks').startOf('isoWeek').format('YYYY-MM-DD'),//지난주 월~
                        endDate: moment().subtract(1, 'weeks').endOf('isoWeek').add(1, 'd').format('YYYY-MM-DD')//일
                    }
                })
            let temp = [0, 0, 0, 0, 0, 0, 0]
            result.data.bydatein.map((v, i) => temp[v._id - 1] = v.sum)
            setbydatein(temp)
            let temp2 = [0, 0, 0, 0, 0, 0, 0]
            result.data.bydateout.map((v, i) => temp2[v._id - 1] = v.sum)
            setbydateout(temp2)
        } catch (error) {
            setIsError(true);
        }
        setIsLoading(false);
    };
    useEffect(() => {
        fetchData();
    }, [])
    const bank_bar_data = [{
        labels: bydatelabel,
        datasets: [{
            label: '입금',
            data: bydatein,
            backgroundColor: [
                'rgba(255, 99, 132)',
                'rgba(255, 159, 64)',
                'rgba(255, 205, 86)',
                'rgba(75, 192, 192)',
                'rgba(54, 162, 235)',
                'rgba(153, 102, 255)',
                'rgba(201, 203, 207)'
            ],
            hoverOffset: 4
        },
        {
            label: '출금',
            data: bydateout,
            backgroundColor:  [
                'rgba(201, 203, 207, 0.2)',
            ],
          }]
    }];
    const barChartField = React.useMemo(
        () => (
            <>
                {bank_bar_data.map((v, i) => {
                    return <ChartBar key={i}
                        id={`bank_bar_${i}`} data={v} />
                })}
            </>
        ), [bydatein,bydateout, bydatelabel]);
    return (
        <div style={{ textAlign: 'center', marginBottom: '5px' }}>
            <h5>지난주 요일별 거래 금액</h5>
            {isError && <Error></Error>}
            {isLoading ?
                <Loading /> : barChartField}
        </div>
    )
}

export default ByDate
