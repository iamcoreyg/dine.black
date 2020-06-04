import React, {
  useState, 
  useEffect
} from 'react';
import axios from 'axios'
import './App.css';

const Listing = (props) => {
  const { city, credit, link, socialplatform } = props.listing

  return (
    <li>
      <a className="big" href={link} target="_blank">{city}</a>
      {
        credit ? 
        <span>Creator ~ <a href={`https://${socialplatform}.com/${credit}`} target="_blank">@{credit}</a></span>
        : ''
      }
    </li>
  )
}

function App() {
  const [listings, setListings] = useState();
  const [query, setQuery] = useState()
  const [searchResults, setSearch] = useState();

  useEffect(async () => {
    const result = await axios(
      'https://egtygzj8v7.execute-api.us-east-1.amazonaws.com/production/api',
    );
 
    setListings(result.data);
  }, []);

  const lookUp = (e) => {
    setQuery(e.target.value.toLowerCase())

    if (listings) {
      const look = listings.map((directory) => {
        if (directory && directory.city && directory.city.toLowerCase().includes(query)) {
          return directory
        }
      }).filter((x) => x)

      if (look.length > 0) {
        setSearch(look)
      } else {
        setSearch(null)
      }
    }
  }

  let results;

  if (query && searchResults) {
    results = searchResults.map((listing) => <Listing listing={listing} />)
  } else if (listings) {
    results = listings.map((listing) => <Listing listing={listing} />)
  }
  
  return (
    <div className="App">
      <span className="title">DINE.BLACK</span>
      <h1>Lists of Black-owned restaurants in various cities.</h1>
      <h2>Order directly & tip generously.</h2>

      <form>
        <label className="screen-reader-only">Search</label>
        <div>
          <input type="text" onChange={lookUp} placeholder="Enter your city" className="search-input" />
        </div>
      </form>

      <ul class="listings">
        {
          listings ? results : 'Loading...'
        }
      </ul>

      <p>
        Actively adding more but DM <a href="https://twitter.com/iamcoreyg">@iamcoreyg</a> to submit.
        <br />
        Want to add updates yourself? <a href="https://docs.google.com/spreadsheets/d/1EVyWgRbpDgN2CLoe-uMWYYxnF1YODF5bBX-pNuEDGKM/edit#gid=0">Click Here</a>
        <br />
        Want to support the fight for justice? <a href="https://docs.google.com/document/d/1jsCO7zuVvpj4gWyheDZ1jH2i83hVUsYLjEhsLnl9-8c/edit">Click Here</a>
      </p>
    </div>
  );
}

export default App;
