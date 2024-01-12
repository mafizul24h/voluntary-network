import React, { useEffect, useState } from 'react';

const AllEvents = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/events')
            .then(res => res.json())
            .then(data => {
                setEvents(data);
            })
    }, [])

    return (
        <div>
            <h2 className='text-center bg-white w-100 py-3 rounded-2'>Event Summary</h2>
            <div className='m-3 m-md-4 bg-white p-2 p-md-4 rounded-2'>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">SL</th>
                            <th scope="col">Image</th>
                            <th scope="col">Event Name</th>
                            <th scope="col">Entry By</th>
                            <th scope="col">Event Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events?.map((event, index) => (
                            <tr key={index}>
                                <th scope="row">{1 + index}</th>
                                <td><img style={{width: '40px', height: '30px', borderRadius: '5px'}} src={event.image} alt="" /></td>
                                <td>{event.eventTitle}</td>
                                <td>{event.email}</td>
                                <td>{event.eventDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllEvents;