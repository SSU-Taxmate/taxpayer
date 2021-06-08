import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react';
import { forwardRef } from 'react';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
/*theme */
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  FavoriteBorderIcon: forwardRef((props, ref) => <FavoriteBorderIcon {...props} ref={ref} />),
  FavoriteIcon: forwardRef((props, ref) => <FavoriteIcon {...props} ref={ref} />)

};

/* Icon */

export default function EditableTable(props) {
  const [title, setTitle] = useState(props.title);
  const [columns, setColumns] = useState(props.columns);
  const [data, setData] = useState(props.data);
  const [options, setOptions] = useState(props.options);

  const theme = createMuiTheme({
    overrides: {
      MuiTableCell: {
        root: {
          paddingTop: 5,
          paddingBottom: 5,
          "&:last-child": {
            paddingRight: 5
          },

        }
      }
    },

    palette: {
      primary: {
        main: '#4caf50',
      },
      secondary: {
        main: '#ff9100',
      },
    },

  });

  return (
    <MuiThemeProvider theme={theme}>
      <MaterialTable
        title={title}
        columns={columns}
        data={data}
        options={options}
        icons={tableIcons}

        //editable
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);
                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);

                resolve();
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                //이 부분에 함수를 만들자!
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                resolve();
              }, 1000)
            }),
        }}
        // other props
        localization={{

          header: {
            actions: '수정/삭제'
          },
          body: {
            editRow: {
              deleteText: '이 행을 정말 삭제 하시겠습니까?',
            },
            emptyDataSourceMessage: '보여줄 데이터가 없습니다.',
            filterRow: {
              filterTooltip: '필터'
            }
          },
          grouping: {
            placeholder: '여기에 그룹화 할 헤더를 끌어다놓으세요',
            groupedBy: '그룹화 : '
          },
          pagination: {
            labelDisplayedRows: '{from}-{to} of {count}'
          },
          toolbar: {
            nRowsSelected: '{0} 행이 선택되었습니다.',
            searchTooltip: '검색'

          },
        }}
      />
    </MuiThemeProvider>
  )
}
