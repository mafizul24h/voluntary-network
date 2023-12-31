import React from 'react';

const AddEvent = () => {
    return (
        <div>
            <h2 className='text-center bg-white w-100 py-3 rounded-2'>Add Your Event</h2>
            <div className='m-3 m-md-4 bg-white p-2 p-md-4 rounded-2'>
                <form>
                    <div className='row row-cols-1 row-cols-lg-2'>
                        <div className="form-group mb-2">
                            <label className='fw-bold'>Event Title</label>
                            <input type="text" name='event' className="form-control" placeholder="Enter Event" />
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
                            <input type="file" name='banner' className="form-control" placeholder="Enter Banner" />
                        </div>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Add Event" />
                </form>
            </div>
        </div>
    );
};

export default AddEvent;