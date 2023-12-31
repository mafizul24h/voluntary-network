import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';

const image_Hosting_Key = import.meta.env.VITE_IMAGE_API_TOKEN;

const AddEvent = () => {
    const { user } = useContext(AuthContext);
    const [image, setImage] = useState();
    const imageURL = `https://api.imgbb.com/1/upload?key=${image_Hosting_Key}`

    const handleAddEvent = (event) => {
        event.preventDefault();

        const form = event.target;
        const eventTitle = form.title.value;
        const eventDate = form.date.value;
        const description = form.description.value;

        const newEvent = {
            eventTitle, eventDate, description, image, email: user?.email
        }

        const formData = new FormData();
        formData.append('image', image);

        fetch(imageURL, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(resData => {
                if (resData.success) {
                    newEvent.image = resData.data.display_url;

                    console.log(newEvent);
                    fetch('http://localhost:5000/events', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(newEvent)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.insertedId) {
                                Swal.fire({
                                    position: "center",
                                    icon: "success",
                                    title: "Your event has been saved",
                                    showConfirmButton: false,
                                    timer: 1500
                                  });
                                  
                            }
                        })
                }
            })
    }

    return (
        <div>
            <h2 className='text-center bg-white w-100 py-3 rounded-2'>Add Your Event</h2>
            <div className='m-3 m-md-4 bg-white p-2 p-md-4 rounded-2'>
                <form onSubmit={handleAddEvent}>
                    <div className='row row-cols-1 row-cols-lg-2'>
                        <div className="form-group mb-2">
                            <label className='fw-bold'>Event Title</label>
                            <input type="text" name='title' className="form-control" placeholder="Enter Event" />
                        </div>
                        <div className="form-group mb-2">
                            <label className='fw-bold'>Event Date</label>
                            <input type="date" name='date' className="form-control" placeholder="Enter Date" />
                        </div>
                        <div className="form-group mb-2">
                            <label className='fw-bold'>Event Description</label>
                            <textarea className="form-control" name="description" placeholder="Enter Description" cols="10" rows="2"></textarea>
                        </div>
                        <div className="form-group mb-2">
                            <label className='fw-bold'>Event Banner</label>
                            <input type="file" name='banner' onChange={(e) => setImage(e.target.files[0])} className="form-control" placeholder="Enter Banner" />
                        </div>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Add Event" />
                </form>
            </div>
        </div>
    );
};

export default AddEvent;