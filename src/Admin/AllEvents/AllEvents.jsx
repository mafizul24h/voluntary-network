import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const AllEvents = () => {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const { totalEvents } = useLoaderData();
    // console.log(totalEvents);
    // const itemPerPage = 5;
    const totalPages = Math.ceil(totalEvents / itemsPerPage);
    // console.log(totalPages);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    // console.log(pageNumbers);

    // const pageNums = [...Array(totalPages).keys()]
    // console.log(pageNums);

    useEffect(() => {
        if (search === '') {
            fetch(`https://volunteer-network-server-gamma.vercel.app/events?page=${currentPage}&limit=${itemsPerPage}`)
                .then(res => res.json())
                .then(data => setEvents(data))
            return;
        } else {
            fetch(`https://volunteer-network-server-gamma.vercel.app/eventSearch?text=${search}&page=${currentPage}&limit=${itemsPerPage}`)
                .then(res => res.json())
                .then(data => setEvents(data))
        }
    }, [search, currentPage, itemsPerPage]);

    // useEffect(() => {
    //     if (search === '') {
    //         fetch('https://volunteer-network-server-gamma.vercel.app/events')
    //             .then(res => res.json())
    //             .then(data => setEvents(data))
    //         return;
    //     } else {
    //         fetch(`https://volunteer-network-server-gamma.vercel.app/eventSearch/${search}`)
    //             .then(res => res.json())
    //             .then(data => setEvents(data))
    //     }
    // }, [search]);

    const options = [5, 10, 20, 50, 100, totalEvents]
    // console.log(options);
    const handleSelectChange = (event) => {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(1);
    }

    return (
        <div>
            <h2 className='text-center bg-white w-100 py-3 rounded-2'>Event Summary</h2>
            <div className='text-center bg-white w-100 my-3 rounded-2 py-2 px-4 d-flex justify-content-between align-items-cener'>
                <select className="btn border" onChange={handleSelectChange}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={totalEvents}>All</option>
                </select>
                <div className='w-25'>
                    <input onChange={(e) => setSearch(e.target.value)} className="form-control " list="datalistOptions" id="exampleDataList" placeholder="search..." />
                    <datalist id="datalistOptions">
                        {events?.map(event => <option key={event._id} value={event.eventTitle} />)}
                    </datalist>
                </div>
            </div>
            <div className='m-3 mx-md-4 bg-white p-2 px-md-4 rounded-2'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">SL</th>
                            <th scope="col">Image</th>
                            <th scope="col">Event Name</th>
                            <th scope="col">Entry By</th>
                            <th scope="col">Event Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events?.map((event, index) => (
                            <tr key={index}>
                                <th scope="row">{1 + index}</th>
                                <td><img style={{ width: '40px', height: '30px', borderRadius: '5px' }} src={event.image} alt="" /></td>
                                <td>{event.eventTitle}</td>
                                <td>{event.email}</td>
                                <td>{moment(event.eventDate).format('LL')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Paginaation  */}
            <div className='text-center mb-4'>
                <p className='my-2'>Current Page {currentPage} and Items Per Page {itemsPerPage}</p>
                {pageNumbers?.map(number => <button className={`${currentPage === number && 'btn-primary text-white'} btn btn-outline-primary me-2`}
                    key={number}
                    onClick={() => setCurrentPage(number)}
                >{number}</button>)}
            </div>
        </div>
    );
};

export default AllEvents;