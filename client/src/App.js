import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GroupSetup from './pages/GroupSetup';
import MemberOnboarding from './pages/MemberOnboarding';
import QuoteSummary from './pages/QuoteSummary';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GroupSetup />} />
        <Route path="/members/:groupId" element={<MemberOnboarding />} />
        {/* <Route path="/quote/:groupId" element={<QuoteSummary />} /> */}
         <Route path="/group/:groupId/quote" element={<QuoteSummary />} />
      </Routes>
    </Router>
  );
}

export default App;