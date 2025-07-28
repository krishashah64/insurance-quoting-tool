import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MemberOnboarding() {
  const { groupId } = useParams();
  const [name, setName] = useState('');
  const [age, setAge] = useState(30);
  const [zip, setZip] = useState('');
  const handleSubmit = async () => {
    await axios.post('http://localhost:5000/api/members', {
      groupId, name, age, zip, tobacco: false,
      classId: 'default',
      previousEmployerContribution: 200,
      previousMemberContribution: 100
    });
    alert('Member added');
  };
  return (
    <div>
      <h2>Member Onboarding</h2>
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Age" type="number" onChange={(e) => setAge(Number(e.target.value))} />
      <input placeholder="Zip" onChange={(e) => setZip(e.target.value)} />
      <button onClick={handleSubmit}>Add Member</button>
      <a href={`/quote/${groupId}`}>Next: Get Quote</a>
    </div>
  );
}

export default MemberOnboarding;
