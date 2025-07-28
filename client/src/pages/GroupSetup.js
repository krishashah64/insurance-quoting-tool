import React, { useState } from 'react';
import axios from 'axios';

function GroupSetup() {
  const [name, setName] = useState('');
  const handleSubmit = async () => {
    const res = await axios.post('http://localhost:5000/api/groups', { name });
    window.location.href = `/members/${res.data._id}`;
  };

  return (
    <div>
      <h2>Create Group</h2>
      <input placeholder="Group Name" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
}

export default GroupSetup;
