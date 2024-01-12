import moment from 'moment';
import React, { useEffect, useState } from 'react';

const AllEvents = () => {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    // console.log(search);

    // useEffect(() => {
    //     fetch('http://localhost:5000/events')
    //         .then(res => res.json())
    //         .then(data => {
    //             setEvents(data);
    //         })
    // }, []);

    useEffect(() => {
        if (search === '') {
            fetch('http://localhost:5000/events')
                .then(res => res.json())
                .then(data => setEvents(data))
                return;
        } else {
            fetch(`http://localhost:5000/eventSearch/${search}`)
                .then(res => res.json())
                .then(data => setEvents(data))
        }
    }, [search])

    return (
        <div>
            <h2 className='text-center bg-white w-100 py-3 rounded-2'>Event Summary</h2>
            <div className='text-center bg-white w-100 my-3 rounded-2 py-2 px-4'>
                <div>
                    <input onChange={(e) => setSearch(e.target.value)} class="form-control w-50" list="datalistOptions" id="exampleDataList" placeholder="search..." />
                    <datalist id="datalistOptions">
                        {events?.map(event => <option key={event._id} value={event.eventTitle} />)}
                    </datalist>
                </div>
            </div>
            <div className='m-3 m-md-4 bg-white p-2 p-md-4 rounded-2'>
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
        </div>
    );
};

export default AllEvents;