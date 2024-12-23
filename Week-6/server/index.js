require('dotenv').config();
const express = require('express');
const app = express();
const pool = require('./db'); 

app.use(express.json());

//get request to search for employee by name
app.get("/Search", async (req, res) => {
    try{
        const {employeeName} = req.query;
        //check if employee name is undefined
        if(!employeeName){
            return res.status(401).json({message:'employee name is required'})
        }
        //searches db for provided employee name
      const searchEmployee =  await pool.query(
        'SELECT * FROM employee WHERE employee_name ILIKE $1',[`%${employeeName}%`]
      );
      //checks if employee name exists in db
      if(searchEmployee.rowCount === 0){
        return res.status(404).json("Employee not found");
      }
      //resond with all relevant employee names
      res.status(200).json(searchEmployee.rows);
    

    } catch (err) {
    return res.status(500).json({message: 'Internal Server Error'})
  }
    })
// post request to create a new employee
app.post("/Create", async (req, res) =>{
    try{
      const { employeeName, employeePhoneNumber, employeeEmail, jobId } = req.body;
        //check if employee name is undefined
        if(!employeeName){
            return res.status(401).json({message:'employee name is required'})
        }
        // check if employee exists in db
        const searchEmployee =  await pool.query(
            'SELECT * FROM employee WHERE employee_name ILIKE $1',[`%${employeeName}%`]
          );
        //replies to user with 401 in case the book alreasy exists
       if(searchEmployee.rowCount > 0){
        return res.status(401).json('employee already exists in db');
      }
      await pool.query(
        'INSERT INTO employee (employee_name, employee_phone_number, employee_email, job_id) VALUES ($1, $2, $3, $4)',
        [employeeName, employeePhoneNumber, employeeEmail, jobId]
      );

      res.status(200).json({message:'employee created successfully.'})
    }catch(err){
        console.error(err);
    return res.status(500).json({message: 'Internal Server Error'})
    }
});


// post request to add a new job
app.post("/Add", async (req, res) => {
  try {
      const { jobName } = req.body;

      // Check if job name is provided
      if (!jobName) {
          return res.status(400).json({ message: 'Job name is required' });
      }

      // Add new job to the database
      const newJob = await pool.query(
          'INSERT INTO jobs (job_name) VALUES ($1) RETURNING *',
          [jobName]
      );

      // Return the newly created job 
      res.status(201).json(newJob.rows[0]); // 

      } catch (err) {
         console.error(err);
         return res.status(500).json({ message: 'Internal Server Error' });
        }
});

//put request to edit the employee's job_id
app.put("/Edit", async (req, res) => {
  try {
    const { employeeID, jobId } = req.query;  

    if (!employeeID || !jobId) {
      return res.status(400).json({ message: 'Please provide both employee ID and job ID.' });
    }

    // Check if the employee exists
    const searchEmployee = await pool.query(
      'SELECT * FROM employee WHERE employee_id = $1', [employeeID] 
    );

    if (searchEmployee.rowCount === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Update the employee's job
    await pool.query(
      'UPDATE employee SET job_id = $1 WHERE employee_id = $2',
      [jobId, employeeID]
    );

    res.status(200).json({ message: 'Employee job updated successfully.' });
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});



//delete request
app.delete("/Remove", async (req, res) => {
  try {
      const { employeeID } = req.query;

      // Check if employee ID is undefined
      if (!employeeID) {
          return res.status(400).json({ message: 'Employee ID is required' });
      }

      // Check if employee exists in DB
      const searchEmployee = await pool.query(
          'SELECT * FROM employee WHERE employee_id = $1',
          [employeeID] 
      );

      // If employee does not exist, return 404
      if (searchEmployee.rowCount === 0) {
          return res.status(404).json({ message: 'Employee not found' });
      }

      // Deletes employee by ID from DB
      await pool.query(
          'DELETE FROM employee WHERE employee_id = $1',
          [employeeID]
      );

      res.status(200).json({ message: 'Employee deleted successfully.' });
      
  } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
  }
});



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
