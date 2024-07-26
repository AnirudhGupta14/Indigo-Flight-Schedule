import { useEffect, useState } from "react";
import "./App.css";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'

function App() {

  const [flights, setFlights] = useState([])
  useEffect(() => {
    const interval = setInterval(() => {
  axios.get('http://localhost:3001/getFlights')
  .then(res => setFlights(res.data))
  .catch(error => console.log(error))
  }, 1000); }, [])


return (
  <>
    <h2 className="text-primary">Indigo Real-time Flight Schedule System</h2>
    <table className="table table-bordered mt-3">
      <thead>
        <tr>
          <th scope="col">Flight Number</th>
          <th scope="col">Departure</th>
          <th scope="col">Destination</th>
          <th scope="col">Flight Timings</th>
          <th scope="col">Status</th>
          <th scope="col">Gate No.</th>
        </tr>
      </thead>
      <tbody>
      {
        flights.map((post) => {
          var color = "bg-success";
          const {_id, flight_num, departure, destination, flight_time, status, gate} = post;
          if(status == "Delayed")
          {
            var color = "bg-warning";
          }
          else if(status == "Cancelled")
          {
            var color = "bg-danger";
          }
          return (
        <tr key={_id}>
          <td className={`p-3 mb-2 text-white ${color}`}>{flight_num}</td>
          <td className={`p-3 mb-2 text-white ${color}`}>{departure}</td>
          <td className={`p-3 mb-2 text-white ${color}`}>{destination}</td>
          <td className={`p-3 mb-2 text-white ${color}`}>{flight_time}</td>
          <td className={`p-3 mb-2 text-white ${color}`}>{status}</td>
          <td className={`p-3 mb-2 text-white ${color}`}>{gate}</td>
        </tr>
          );
        })
      }
      </tbody>
    </table>
  </>
);
}

export default App;