import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FetchAPI = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // const url = "http://localhost:3000/api/data";
    
    axios.get('https://dssj.stou.ac.th/api/data/fg?fac_code=10', {
      headers: {
        'Content-Type': 'application/json',
        'api-token': '$2y$10$TY2vwRplhBQwy1b.nfI2y.PkQzBFb3mEtpkr1ptubTKZfPw6yH.Ae'
      }
    })
    .then(response => {
      console.log(response.data);
      setData(response.data);
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
    });

    // fetch(`${url}`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'api-token': '$2y$10$TY2vwRplhBQwy1b.nfI2y.PkQzBFb3mEtpkr1ptubTKZfPw6yH.Ae',
    //   },
    // })
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     const contentType = response.headers.get('content-type');
    //     if (!contentType || !contentType.includes('application/json')) {
    //       throw new TypeError("Oops, we haven't got JSON!");
    //     }
    //     return response.json();
    //   })
    //   .then(data => setData(data))
    //   .catch(error => console.error('There has been a problem with your fetch operation: ', error));
  }, []);

  const groupedData = data ? data.results.reduce((acc, item) => {
    const key = item.education_type_level_name; 
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {}) : {};

  return (
    <div>
      {data ? (
        Object.keys(groupedData).map((groupName, index) => (
          <div key={index}>
            <h2>{groupName} (Items: {groupedData[groupName].length})</h2>
            <table>
              <thead>
                <tr>
                  {groupedData[groupName][0] && Object.keys(groupedData[groupName][0]).map((key, index) => (
                    <th key={index}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
              {groupedData[groupName].slice(0, 1).map((item, index) => (
                <tr key={index}>
                  {Object.values(item).map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default FetchAPI;