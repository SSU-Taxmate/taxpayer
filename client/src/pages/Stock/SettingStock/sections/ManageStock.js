import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import NewsItem from './NewsItem'
import ManageValueDialog from './ManageValueDialog'
import moment from 'moment-timezone';
import { useHistory } from "react-router-dom";
import PageHeading from '../../../../components/PageHeading';
import axios from 'axios';
import Error from '../../../../components/Error'
import Loading from '../../../../components/Loading'
import PageFrame from '../../../PageFrame';
function ManageStock(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    console.log('ManageStock', props.location.state)
    let history = useHistory();

    const stockId = props.location.state.stockId
    const [stock, setstock] = useState()

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const result = await axios.get(`/api/stocks/${stockId}/manage`);
                //console.log("/api/stocks/manage", result.data);
                setstock(result.data)
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [stockId])
    return (
        <PageFrame>
            <PageHeading title="주식설정" />

            {isError && <Error />}
            {isLoading ?
                <Loading /> : (
                    stock && <>
                        <div>주식 설정 확인<ManageValueDialog type={"add"} stockId={stock._id} /></div>
                        <Button onClick={() => history.push("/classes/:classId/stock/manage")} color="primary" autoFocus>
                            주식 설정 메인으로 돌아가기
                        </Button>

                        <div className="row py-2">
                            <div className="font-weight-bold mx-2 job-label">주식이름</div>
                            <div className="seperator-gray mx-1"></div>
                            <div className="text-gray-900 mx-2 job-input">{stock.stockName}</div>
                        </div>
                        <div className="row py-2">
                            <div className="font-weight-bold m-2 job-label">설명</div>
                            <div className="seperator-gray m-1"></div>
                            <div className="text-gray-900 m-2 job-input">{stock.description}</div>
                            <div className="font-weight-bold m-2 job-label">상장 폐지 예정</div>
                            <div className="seperator-gray m-1"></div>
                            <div className="text-gray-900 m-2 job-input">{stock.ondelete ? moment(stock.ondeleteDay).tz('Asia/Seoul').format('YYYY-MM-DD') : ''}</div>
                        </div>
                        <hr />
                        <List dense>
                            {stock.prices.map((price, i) => {
                                return (
                                    <ListItem key={i}>
                                        <NewsItem price={price} stockId={stock._id} />
                                    </ListItem>
                                );
                            })}
                        </List>
                    </>
                )
            }
        </PageFrame>
    )
}

export default ManageStock
