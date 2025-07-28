import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function MemberOnboarding() {
  const { groupId } = useParams();
  const [name, setName] = useState('');
  const [age, setAge] = useState(30);
  const [zip, setZip] = useState('');

  const handleSubmit = async () => {
    if (!name || !zip || !age) return alert('Please fill all fields');

    const [first_name, ...rest] = name.trim().split(' ');
    const last_name = rest.join(' ') || 'Unknown';

    const currentYear = new Date().getFullYear();
    const dobYear = currentYear - age;
    const dob = `${dobYear}-01-01`; 
    const payload = {
      groupId,
      first_name,
      last_name,
      dob,
      age,
      zip,
      tobacco: false
    };

    try {
      await axios.post('http://localhost:5000/api/members', payload);
      alert('Member added');
      setName('');
      setAge(30);
      setZip('');
    } catch (err) {
      console.error('Error adding member:', err.response?.data || err.message);
      alert('Failed to add member');
    }
  };

  return (
    <div>
      <h2>Member Onboarding</h2>
      <input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Age" type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
      <input placeholder="Zip Code" value={zip} onChange={(e) => setZip(e.target.value)} />
      <button onClick={handleSubmit}>Add Member</button>
      <br />
      <Link to={`/quote/${groupId}`}>Next: Get Quote</Link>

    </div>
  );
}

export default MemberOnboarding;
