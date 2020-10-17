import React, { useState, useEffect } from 'react';
import {
  DataTableSkeleton,
  InlineNotification,
} from 'carbon-components-react';
import EmployeeTable from '../../components/EmployeeTable';
import EmployeeForm from '../../components/EmployeeForm';

const headers = [
    {
        key: 'firstName',
        header: 'First Name'
    },
    {
        key: 'lastName',
        header: 'Last Name'
    },
    {
        key: 'hireDate',
        header: 'Hire Date'
    },
    {
        key: 'role',
        header: 'Role'
    },
    {
        key: 'favoriteJoke',
        header: 'Favorite Joke'
    },
    {
        key: 'favoriteQuote',
        header: 'Favorite Quote'
    }
]

const cleanData = (rows) => {
    const data = []
    for (var row in rows) {
        data.push(rows[row])
    }
    return data.map(row => ({
      ...row,
      id: row._id,
      favoriteJoke: row.favoriteJoke.setup + " " +  row.favoriteJoke.punchline,
      favoriteQuote: row.favoriteQuote[0],
      hireDate: new Date(row.hireDate).toLocaleDateString(),
    }));

  };

const EmployeePage = () => {
    const [loaded, setLoaded] = useState(null);
    const [rows, setRows] = useState([]);

    const updateData = (_rows, loaded = true) => {
        _rows = cleanData(_rows);
        console.log(_rows)
        setRows(_rows);
        setLoaded(loaded);
    }

    const fetchData = () => {
        const url = process.env.REACT_APP_API_URL + "/api/employees"
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            response.json().then((response) => {
                updateData(response, true);
            }).catch((error) => {
                updateData([], false);
                console.log(error);
            })
        }).catch((error) => {
            updateData([], false);
            console.log(error);
        })
    }

    useEffect(() => {
        fetchData();
    }, [loaded]);

    if (loaded === null) {
        return (
            <div className="bx--grid bx--grid--full-width bx--grid--no-gutter">
              <DataTableSkeleton
                columnCount={headers.length + 1}
                rowCount={10}
                headers={headers}
              />
            </div>
          );
    } else if (loaded === false) {
        return (
            <div className="bx--grid bx--grid--full-width bx--grid--no-gutter employee-page">
                <InlineNotification
                kind="error"
                title="Failed to fetch API"
                />
                <EmployeeTable
                    headers={headers}
                    rows={rows}
                />
            </div>
        )
        
    } else if (loaded === true) {
        return (
            <div className="bx--grid bx--grid--full-width bx--grid--no-gutter employee-page">
                <EmployeeForm 
                />
                <EmployeeTable
                    headers={headers}
                    rows={rows}
                />
            </div>
        )
    }
    
}

export default EmployeePage;