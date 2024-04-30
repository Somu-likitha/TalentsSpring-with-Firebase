import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profession = () => {
  const [selectedProfession, setSelectedProfession] = useState('');
  const navigate = useNavigate();

  const handleProfessionSearch = (e) => {
    const selectedProfession = e.target.value;
    setSelectedProfession(selectedProfession);
    navigate(`/user?profession=${selectedProfession}`);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by profession"
        value={selectedProfession}
        onChange={handleProfessionSearch}
        list="professions"
      />
      <datalist id="professions">
        <option value="household">Household</option>
        <option value="banking">Banking</option>
        <option value="government">Government</option>
        <option value="software">Software</option>
        <option value="hardware">Hardware</option>
      </datalist>
    </div>
  );
};

export default Profession;