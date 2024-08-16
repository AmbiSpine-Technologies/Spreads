import React, { useState } from 'react'
import { MdOutlineAdd } from "react-icons/md";

const CreatePollModal = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [duration, setDuration] = useState({ days: 1, hours: 0, minutes: 0 });
  
    const handleOptionChange = (index, value) => {
      const newOptions = [...options];
      newOptions[index] = value;
      setOptions(newOptions);
    };
  
    const addOption = () => {
      setOptions([...options, '']);
    };
  
    const removeAllOptions = () => {
      setOptions(['', '']);
    };
  
    const handleDurationChange = (field, value) => {
      setDuration({ ...duration, [field]: parseInt(value, 10) });
    };
  
    const handleSubmit = () => {
      const pollData = { question, options, duration };
      console.log('Poll data:', pollData);
      // Add your submission logic here
    };
  return (
    <div className="modal-dialog">
      <div className="modal-content" style={{ width: "500px" }}>
        <div className="modal-header">
          <h6 className="modal-title">Creat Your Poll</h6>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body d-flex justify-content-center">
        <div className='m-4 border rounded-3 w-75'>
      <div className='p-2 ps-4 pe-4'>
        <input
          type="text"
          placeholder="Poll question"
          value={question}
          className='p-3 border w-100 m-1'
          style={{ outline: "blue" }}
          onChange={(e) => setQuestion(e.target.value)}
        />
        {options.map((option, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              className='p-3 border w-100 m-1'
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
          </div>
        ))}
        <button className='float-end btn text-primary' onClick={addOption}>
          <MdOutlineAdd size={25} />
        </button>
      </div>
      <hr/>
      <div className='p-2'>
        <h5 className='fs-6 m-1'>Poll length</h5>
        <div className='d-flex gap-3 align-item-center'>
          <label className='border p-2 w-25 rounded-2'>
            <span className='text-small d-block'>Days</span>
            <select
              style={{ border: "none", outline: "none" }}
              className='w-100 fs-6'
              value={duration.days}
              onChange={(e) => handleDurationChange('days', e.target.value)}
            >
              {[...Array(7).keys()].map(day => (
                <option key={day + 1} value={day + 1}>{day + 1}</option>
              ))}
            </select>
          </label>
          <label className='border p-2 w-25 rounded-2'>
            <span className='text-small d-block'>Hours</span>
            <select
              style={{ border: "none", outline: "none" }}
              className='w-100 fs-6'
              value={duration.hours}
              onChange={(e) => handleDurationChange('hours', e.target.value)}
            >
              {[...Array(24).keys()].map(hour => (
                <option key={hour} value={hour}>{hour}</option>
              ))}
            </select>
          </label>
          <label className='border p-2 w-25 rounded-2'>
            <span className='text-small d-block'>Minutes</span>
            <select
              style={{ border: "none", outline: "none" }}
              className='w-100 fs-6'
              value={duration.minutes}
              onChange={(e) => handleDurationChange('minutes', e.target.value)}
            >
              {[...Array(60).keys()].map(minute => (
                <option key={minute} value={minute}>{minute}</option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div className='text-center remove-button-container'>
        <p onClick={removeAllOptions} className='btn text-danger remove-button border-0 border w-100'>Remove All Options</p>
      </div>
    </div>
        </div>
        </div>
    </div>
  )
}

export default CreatePollModal