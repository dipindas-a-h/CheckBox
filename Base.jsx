import React, { useState, useEffect } from 'react';

const CheckboxTable = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [save, setSave] = useState(1);
  const [col, setcol] = useState(1);

  const [checkboxes, setCheckboxes] = useState([
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
  ]);

  useEffect(() => {
    // Check if all individual checkboxes are selected
    const isAllSelected = checkboxes.every(row => row.every(checkbox => checkbox));
    setSelectAll(isAllSelected);
  }, [checkboxes]);

  const handleCheckboxChange = (rowIndex, checkboxIndex) => {
    const updatedCheckboxes = [...checkboxes];
    updatedCheckboxes[rowIndex][checkboxIndex] = !checkboxes[rowIndex][checkboxIndex];
    setCheckboxes(updatedCheckboxes);
  };

  const handleSelectAllChange = () => {
    const updatedCheckboxes = checkboxes.map(row => row.map(() => !selectAll));
    setCheckboxes(updatedCheckboxes);
    setSelectAll(!selectAll);
  };

  const handleRowCheckboxChange = (rowIndex) => {
    
    const updatedCheckboxes = checkboxes.map((row, index) => {
      if (index === rowIndex) {
        // Toggle all checkboxes in the selected row
        console.log(rowIndex);
        // console.log(index);
        
        if(index===4){
            setSave(save-1)
        } else{
            setSave(save+1)
        }
        console.log(save);
        return row.map(() => !row[save]);
      }
      return row;
    });
    setCheckboxes(updatedCheckboxes);
  };

  const handleColumnCheckboxChange = (checkboxIndex) => {
    const updatedCheckboxes = checkboxes.map((row, rowIndex) => {
      const newRow = [...row];
      if(checkboxIndex===4){
        newRow[checkboxIndex] = !checkboxes[checkboxIndex][checkboxIndex];
       
      }else {
        newRow[checkboxIndex] = !checkboxes[checkboxIndex+1][checkboxIndex];
      }
    //   newRow[checkboxIndex] = !checkboxes[save+1][save+1];
      console.log(checkboxIndex)
      return newRow;
    });
    setCheckboxes(updatedCheckboxes);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>
            
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAllChange}
            />
          </th>
          <th>
            <input
              type="checkbox"
              checked={checkboxes.every(row => row[0])}
              onChange={() => handleColumnCheckboxChange(0)}
            />
          </th>
          <th>
            <input
              type="checkbox"
              checked={checkboxes.every(row => row[1])}
              onChange={() => handleColumnCheckboxChange(1)}
            />
          </th>
          <th>
            <input
              type="checkbox"
              checked={checkboxes.every(row => row[2])}
              onChange={() => handleColumnCheckboxChange(2)}
            />
          </th>
          <th>
            <input
              type="checkbox"
              checked={checkboxes.every(row => row[3])}
              onChange={() => handleColumnCheckboxChange(3)}
            />
          </th>
          <th>
            <input
              type="checkbox"
              checked={checkboxes.every(row => row[4])}
              onChange={() => handleColumnCheckboxChange(4)}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {checkboxes.map((rowCheckboxes, rowIndex) => (
          <tr key={rowIndex}>
            <td>
              <input
                type="checkbox"
                checked={rowCheckboxes.every(checkbox => checkbox)}
                onChange={() => handleRowCheckboxChange(rowIndex)}
              />
            </td>
            {rowCheckboxes.map((isChecked, checkboxIndex) => (
              <td key={checkboxIndex}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleCheckboxChange(rowIndex, checkboxIndex)}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CheckboxTable;
