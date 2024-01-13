import React, { useEffect, useState } from 'react';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch('https://volunteer-network-server-gamma.vercel.app/event')
            .then(res => res.json())
            .then(data => {
                setEvents(data);
            })
    }, []);

    // Function to generate a random RGB color
    const generateRandomColor = () => {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);

        return `rgb(${randomR}, ${randomG}, ${randomB})`;
    };

    const handleSearch = () => {
        // console.log(search);
        if (search === '') {
            fetch('https://volunteer-network-server-gamma.vercel.app/event')
                .then(res => res.json())
                .then(data => setEvents(data))
            return;
        } else {
            fetch(`https://volunteer-network-server-gamma.vercel.app/eventSearch?text=${search}`)
                .then(res => res.json())
                .then(data => setEvents(data))
        }
    }

    return (
        <div className='my-5'>
            <h2 className='text-center text-uppercase fw-bold'>I grow by helping people in need.</h2>
            <div className="input-group w-50 mx-auto my-4">
                <input onChange={(e) => setSearch(e.target.value)} type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" list="datalistOptions" />
                <span onClick={handleSearch} style={{ cursor: 'pointer' }} className="input-group-text bg-primary text-white" id="basic-addon2">Search</span>
                <datalist id="datalistOptions">
                    {events?.map(event => <option key={event._id} value={event.eventTitle} />)}
                </datalist>
            </div>

            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
                {events?.map(event => (
                    <div key={event._id} className="col">
                        <div className="card h-100">
                            <img src={event.image} style={{ height: '200px', width: '100%' }} className="card-img-top" alt={event.eventTitle} />
                            <div className="card-body text-white rounded-bottom text-center" style={{ backgroundColor: generateRandomColor() }}>
                                <h5 className="card-title" >{event.eventTitle}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Events;