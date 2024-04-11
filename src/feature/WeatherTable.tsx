import { Space, Table, TableProps, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import './weather-table.css';
import axios from 'axios';
interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }

interface City {
    'cou_name_en': string,
    'country_code': string,
    timezone: string,
    name: string,
    coordinates: {
        lat: number,
        lon: number,
    }
}

interface ApiResponse {
    config: Object,
    data: {
        results: City[],
        total_count: number,
    }
}

const WeatherTable = () => {

    const [cityData, setCityData] = useState<City[]>();

    useEffect( () => {
        const temp = async() => {
            const apiURL = 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100'
            const result: City[] = await axios.get(apiURL).then((response: ApiResponse) => {
                console.log({response});
                return response.data.results;
            })
            const data = result.map((eachCity) => ({
                cou_name_en: eachCity.cou_name_en,
                country_code: eachCity.country_code,
                timezone: eachCity.timezone,
                name: eachCity.name,
                coordinates: eachCity.coordinates
            }))
            setCityData(data);
        }
        temp();
    }, [])



    console.log({cityData})

    // const data = [
    //     {
    //       key: '1',
    //       name: 'John Brown',
    //       age: 32,
    //       address: 'New York No. 1 Lake Park',
    //       tags: ['nice', 'developer'],
    //     },
    //     {
    //       key: '2',
    //       name: 'Jim Green',
    //       age: 42,
    //       address: 'London No. 1 Lake Park',
    //       tags: ['loser'],
    //     },
    //     {
    //       key: '3',
    //       name: 'Joe Black',
    //       age: 32,
    //       address: 'Sydney No. 1 Lake Park',
    //       tags: ['cool', 'teacher'],
    //     },
    //   ];


      
const columns: TableProps<City>['columns'] = [
    {
      title: 'Country Name',
      dataIndex: 'cou_name_en',
      key: 'cou_name_en',
      render: (text) => <a>{text}</a>,
    },
    {
        title: 'Country Code',
        dataIndex: 'country_code',
        key: 'country_code',
      },
      {
        title: 'Timezone',
        dataIndex: 'timezone',
        key: 'timezone',
      },
      {
        title: 'City Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Coordinates',
        dataIndex: 'coordinates',
        key: 'coordinates',
        render: (text) => <>{JSON.stringify(text)}</>
      },
    
  ];



    return <div className='container'>
        <Table columns={columns} dataSource={cityData}/>
    </div>
}


export default WeatherTable;