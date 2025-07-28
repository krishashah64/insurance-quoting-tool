import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const QuoteSummary = () => {
  const { groupId } = useParams();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState({
    carrier: '',
    metal: '',
    market: '',
  });

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        console.log('Sending groupId to backend:', groupId);
        const { data } = await axios.post('/api/quote', { groupId });
        setPlans(data.plans || data); 
      } catch (err) {
        console.error('Error fetching quote summary:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, [groupId]);

  const filteredPlans = plans.filter(p => {
    const { planDetails } = p;
    return (
      (!filter.carrier || planDetails.carrier_name === filter.carrier) &&
      (!filter.metal || planDetails.metal_level === filter.metal) &&
      (!filter.market || planDetails.market_type === filter.market)
    );
  });

  const carriers = [...new Set(plans.map(p => p.planDetails.carrier_name).filter(Boolean))];
  const metals = [...new Set(plans.map(p => p.planDetails.metal_level).filter(Boolean))];
  const markets = [...new Set(plans.map(p => p.planDetails.market_type).filter(Boolean))];

  return (
    <div className="quote-summary">
      <h2>Quote Summary</h2>

      {loading && <p>Loading...</p>}

      {!loading && (
        <>
          
          <div className="filters">
            <select onChange={e => setFilter({ ...filter, carrier: e.target.value })}>
              <option value="">All Carriers</option>
              {carriers.map(c => <option key={c}>{c}</option>)}
            </select>

            <select onChange={e => setFilter({ ...filter, metal: e.target.value })}>
              <option value="">All Metal Levels</option>
              {metals.map(m => <option key={m}>{m}</option>)}
            </select>

            <select onChange={e => setFilter({ ...filter, market: e.target.value })}>
              <option value="">All Markets</option>
              {markets.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>

          
          <table className="plan-table">
            <thead>
              <tr>
                <th>Plan</th>
                <th>Carrier</th>
                <th>Metal Level</th>
                <th>Market</th>
                <th>Total Group Premium</th>
                <th># of Members</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlans.map(plan => (
                <tr key={plan.plan_id}>
                  <td>{plan.planDetails.plan_name}</td>
                  <td>{plan.planDetails.carrier_name}</td>
                  <td>{plan.planDetails.metal_level}</td>
                  <td>{plan.planDetails.market_type}</td>
                  <td>${plan.totalPremium.toFixed(2)}</td>
                  <td>
                    {plan.members.map(m => (
                      <div key={m.memberId} style={{ marginBottom: '6px' }}>
                        <strong>{m.name}</strong>: ${m.premium.toFixed(2)}<br />
                        {m.affordability ? (
                          <span style={{ color: m.affordability.affordable ? 'green' : 'red' }}>
                            {m.affordability.affordable ? 'Affordable' : 'Not Affordable '}
                          </span>
                        ) : (
                          <span style={{ color: 'gray' }}>No Affordability Info</span>
                        )}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </>
      )}
    </div>
  );
};

export default QuoteSummary;
