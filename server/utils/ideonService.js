const axios = require('axios');

const ideon = axios.create({
  baseURL: 'https://api.ideonapi.com/v1',
  headers: {
    'Authorization': `Bearer ${process.env.IDEON_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

module.exports = {
  createGroup: (groupData) => ideon.post('/groups', groupData),
  createMember: (groupId, memberData) => ideon.post(`/groups/${groupId}/members`, memberData),
  calculateIchraAffordability: (data) => ideon.post('/ichra/affordability', data)
};
