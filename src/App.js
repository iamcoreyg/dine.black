import React, {
  useState, 
  useEffect
} from 'react';
import axios from 'axios'
import './App.css';

const Listing = (props) => {
  const { city, credit, link } = props.listing

  return (
    <li>
      <a className="big" href={link}>{city}</a>
      {
        credit ? 
        <span>Creator ~ <a href={`https://twitter.com/${credit}`}>@{credit}</a></span>
        : ''
      }
    </li>
  )
}

function App() {
  const [listings, setListings] = useState();

  useEffect(async () => {
    const result = await axios(
      'https://egtygzj8v7.execute-api.us-east-1.amazonaws.com/production/api',
    );
 
    setListings(result.data);
  }, []);
 
  return (
    <div className="App">
      <p>A list of Black-owned restaurants in various cities.</p>
      <ul>
        {
          listings ?
           listings.map((listing) => <Listing listing={listing} />)
           : 'Loading...'
        }
      </ul>

      <p>
        Actively adding more (that I find via Twitter) but hit up <a href="https://twitter.com/iamcoreyg">@iamcoreyg</a> to submit.

        Want to add updates yourself? <a href="https://docs.google.com/spreadsheets/d/1EVyWgRbpDgN2CLoe-uMWYYxnF1YODF5bBX-pNuEDGKM/edit#gid=0">Click Here</a>
      </p>
    </div>
  );
}

export default App;
